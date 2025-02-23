import { defineType } from "sanity"

export default defineType({
  name: "userPreferences",
  title: "User Preferences",
  type: "document",
  fields: [
    {
      name: "user_id",
      title: "User",
      type: "reference",
      to: [{ type: "user" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "theme",
      title: "Theme",
      type: "string",
      options: {
        list: [
          { title: "Light", value: "light" },
          { title: "Dark", value: "dark" },
          { title: "System", value: "system" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "email_notifications",
      title: "Email Notifications",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "push_notifications",
      title: "Push Notifications",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "weekly_summary_enabled",
      title: "Weekly Summary Enabled",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "created_at",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    },
    {
      name: "updated_at",
      title: "Updated At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
  ],
  preview: {
    select: {
      user: "user_id.name", // Assuming 'name' is a field in the user schema
      theme: "theme",
      email: "email_notifications",
      push: "push_notifications",
      weekly: "weekly_summary_enabled",
    },
    prepare({ user, theme, email, push, weekly }) {
      return {
        title: `${user || "Unknown"} - ${theme} Mode`,
        subtitle: `Email: ${email ? "On" : "Off"}, Push: ${push ? "On" : "Off"}, Weekly: ${weekly ? "Enabled" : "Disabled"}`,
      }
    },
  },
})
