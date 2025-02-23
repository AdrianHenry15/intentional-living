import { defineType } from "sanity"

export default defineType({
  name: "dailyTracking",
  title: "Daily Tracking",
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
      name: "date",
      title: "Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "diet_check",
      title: "Diet Check",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "exercise_check",
      title: "Exercise Check",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "no_sugar",
      title: "No Sugar",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "mental_strength_check",
      title: "Mental Strength Check",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "wake_time",
      title: "Wake Time",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "sleep_time",
      title: "Sleep Time",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "sleep_notes",
      title: "Sleep Notes",
      type: "text",
      rows: 3,
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
      date: "date",
      dietCheck: "diet_check",
      exerciseCheck: "exercise_check",
    },
    prepare({ user, date, dietCheck, exerciseCheck }) {
      return {
        title: `Daily Tracking - ${new Date(date).toLocaleDateString()}`,
        subtitle: `User: ${user || "Unknown"} | Diet: ${dietCheck ? "✅" : "❌"} | Exercise: ${exerciseCheck ? "✅" : "❌"}`,
      }
    },
  },
})
