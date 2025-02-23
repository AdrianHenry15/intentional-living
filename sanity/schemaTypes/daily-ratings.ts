import { defineType } from "sanity"

export default defineType({
  name: "dailyRatings",
  title: "Daily Ratings",
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
      name: "question_1_rating",
      title: "Question 1 Rating",
      type: "number",
      validation: (Rule) => Rule.required().integer().min(1).max(10),
    },
    {
      name: "question_2_rating",
      title: "Question 2 Rating",
      type: "number",
      validation: (Rule) => Rule.required().integer().min(1).max(10),
    },
    {
      name: "question_3_rating",
      title: "Question 3 Rating",
      type: "number",
      validation: (Rule) => Rule.required().integer().min(1).max(10),
    },
    {
      name: "question_4_rating",
      title: "Question 4 Rating",
      type: "number",
      validation: (Rule) => Rule.required().integer().min(1).max(10),
    },
    {
      name: "question_5_rating",
      title: "Question 5 Rating",
      type: "number",
      validation: (Rule) => Rule.required().integer().min(1).max(10),
    },
    {
      name: "question_6_rating",
      title: "Question 6 Rating",
      type: "number",
      validation: (Rule) => Rule.required().integer().min(1).max(10),
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
      date: "date",
      avgRating: "question_1_rating", // Using first question rating as a placeholder
    },
    prepare({ user, date, avgRating }) {
      return {
        title: `Daily Rating - ${new Date(date).toLocaleDateString()}`,
        subtitle: `User: ${user || "Unknown"} | Avg Rating: ${avgRating}`,
      }
    },
  },
})
