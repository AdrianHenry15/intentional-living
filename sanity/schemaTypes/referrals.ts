import { defineType } from "sanity"

export default defineType({
  name: "referrals",
  title: "Referrals",
  type: "document",
  fields: [
    {
      name: "referrer_id",
      title: "Referrer",
      type: "reference",
      to: [{ type: "user" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "referred_id",
      title: "Referred User",
      type: "reference",
      to: [{ type: "user" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "signup_date",
      title: "Signup Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "reward_claimed",
      title: "Reward Claimed",
      type: "boolean",
      initialValue: false,
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
      referrer: "referrer_id.name", // Assuming 'name' is a field in the user schema
      referred: "referred_id.name",
      signup: "signup_date",
      claimed: "reward_claimed",
    },
    prepare({ referrer, referred, signup, claimed }) {
      return {
        title: `${referrer || "Unknown"} → ${referred || "Unknown"}`,
        subtitle: `Signed up: ${new Date(signup).toLocaleDateString()} | Reward: ${claimed ? "Claimed" : "Pending"}`,
      }
    },
  },
})
