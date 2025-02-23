import { defineType } from "sanity"

export default defineType({
  name: "coinTransaction",
  title: "Coin Transaction",
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
      name: "amount",
      title: "Amount",
      type: "number",
      validation: (Rule) => Rule.required().integer(),
    },
    {
      name: "transaction_type",
      title: "Transaction Type",
      type: "string",
      options: {
        list: [
          { title: "Credit", value: "credit" },
          { title: "Debit", value: "debit" },
        ],
      },
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
      userId: "user_id",
      amount: "amount",
      transactionType: "transaction_type",
      createdAt: "created_at",
    },
    prepare({ userId, amount, transactionType, createdAt }) {
      return {
        title: `${transactionType.toUpperCase()} - $${amount}`,
        subtitle: `User: ${userId} | Date: ${new Date(createdAt).toLocaleDateString()}`,
      }
    },
  },
})
