import { defineType } from "sanity"

export default defineType({
  name: "userGoals",
  title: "User Goals",
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
      name: "goal_name",
      title: "Goal Name",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(255),
    },
    {
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "count",
      title: "Progress Count",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
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
      goal: "goal_name",
      active: "active",
      count: "count",
    },
    prepare({ user, goal, active, count }) {
      return {
        title: `${goal} (${count})`,
        subtitle: `${user || "Unknown"} | ${active ? "Active" : "Inactive"}`,
      }
    },
  },
})
