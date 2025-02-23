import { defineType } from "sanity"

export default defineType({
  name: "goalTracking",
  title: "Goal Tracking",
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
      name: "goal_id",
      title: "Goal ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "completed",
      title: "Completed",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "days",
      title: "Days",
      type: "number",
      validation: (Rule) => Rule.required().integer().min(0),
    },
    {
      name: "created_at",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      user: "user_id.name", // Assuming 'name' is a field in the user schema
      goalId: "goal_id",
      completed: "completed",
      days: "days",
      createdAt: "created_at",
    },
    prepare({ user, goalId, completed, days, createdAt }) {
      return {
        title: `Goal: ${goalId} (${completed ? "✅ Completed" : "⏳ In Progress"})`,
        subtitle: `User: ${user || "Unknown"} | Days: ${days} | Date: ${new Date(createdAt).toLocaleDateString()}`,
      }
    },
  },
})
