import { defineType } from "sanity"

export default defineType({
  name: "ratingQuestions",
  title: "Rating Questions",
  type: "document",
  fields: [
    {
      name: "question_text",
      title: "Question Text",
      type: "string",
      validation: (Rule) => Rule.required().min(5).max(255),
    },
    {
      name: "display_order",
      title: "Display Order",
      type: "number",
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: "active",
      title: "Active",
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
  ],
  preview: {
    select: {
      question: "question_text",
      order: "display_order",
      active: "active",
    },
    prepare({ question, order, active }) {
      return {
        title: `Q${order}: ${question}`,
        subtitle: active ? "Active" : "Inactive",
      }
    },
  },
})
