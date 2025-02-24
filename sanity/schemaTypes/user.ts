import { defineType } from "sanity"

export default defineType({
  name: "user",
  title: "User",
  type: "document",
  fields: [
    {
      name: "first_name",
      title: "First Name",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(50),
    },
    {
      name: "last_name",
      title: "Last Name",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(50),
    },
    {
      name: "phone",
      title: "Phone Number",
      type: "string",
      validation: (Rule) =>
        Rule.required().regex(/^\+\d{10,15}$/, {
          name: "valid phone number",
          invert: false,
        }),
    },
    {
      name: "phone_verified",
      title: "Phone Verified",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "notification_time",
      title: "Notification Time",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "timezone",
      title: "Timezone",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "profile_image_url",
      title: "Profile Image URL",
      type: "url",
      validation: (Rule) =>
        Rule.uri({ allowRelative: false, scheme: ["http", "https"] }),
    },
    {
      name: "streak_count",
      title: "Streak Count",
      type: "number",
      validation: (Rule) => Rule.min(0),
    },
    {
      name: "last_streak_date",
      title: "Last Streak Date",
      type: "datetime",
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
      firstName: "first_name",
      lastName: "last_name",
      phone: "phone",
      streak: "streak_count",
    },
    prepare({ firstName, lastName, phone, streak }) {
      return {
        title: `${firstName} ${lastName}`,
        subtitle: `Phone: ${phone} | Streak: ${streak || 0} days`,
      }
    },
  },
})
