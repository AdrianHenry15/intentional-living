import { defineType } from "sanity"

export default defineType({
  name: "feedback",
  title: "Feedback",
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
      name: "content",
      title: "Feedback Content",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().min(5).max(1000),
    },
    {
      name: "date",
      title: "Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
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
      content: "content",
      date: "date",
    },
    prepare({ user, content, date }) {
      return {
        title: `Feedback from ${user || "Unknown"}`,
        subtitle: `${new Date(date).toLocaleDateString()} - ${content?.slice(0, 50)}...`,
      }
    },
  },
})
