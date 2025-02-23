import { defineType } from "sanity"

export default defineType({
  name: "motivationalQuotes",
  title: "Motivational Quotes",
  type: "document",
  fields: [
    {
      name: "quote_text",
      title: "Quote Text",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().min(5).max(500),
    },
    {
      name: "author_name",
      title: "Author Name",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(100),
    },
  ],
  preview: {
    select: {
      quote: "quote_text",
      author: "author_name",
    },
    prepare({ quote, author }) {
      return {
        title: `"${quote?.slice(0, 50)}..."`,
        subtitle: `- ${author || "Unknown"}`,
      }
    },
  },
})
