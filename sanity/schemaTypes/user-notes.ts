import { defineType } from "sanity"

export default defineType({
  name: "userNotes",
  title: "User Notes",
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
      name: "content",
      title: "Note Content",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required().min(5).max(2000),
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
      content: "content",
    },
    prepare({ user, date, content }) {
      return {
        title: `Note from ${user || "Unknown"} on ${new Date(date).toLocaleDateString()}`,
        subtitle: `${content?.slice(0, 50)}...`,
      }
    },
  },
})
