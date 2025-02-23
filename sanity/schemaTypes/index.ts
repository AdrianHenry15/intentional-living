import { type SchemaTypeDefinition } from "sanity"

import { blockContentType } from "./blog/blockContentType"
import { categoryType } from "./blog/categoryType"
import { postType } from "./blog/postType"
import { authorType } from "./blog/authorType"
import coinTransactions from "./coin-transactions"
import dailyRatings from "./daily-ratings"
import dailyTracking from "./daily-tracking"
import feedback from "./feedback"
import goalTracking from "./goal-tracking"
import motivationalQuotes from "./motivational-quotes"
import ratingQuestions from "./rating-questions"
import referrals from "./referrals"
import userGoals from "./user-goals"
import userNotes from "./user-notes"
import userPreferences from "./user-preferences"
import user from "./user"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    coinTransactions,
    dailyRatings,
    dailyTracking,
    feedback,
    goalTracking,
    motivationalQuotes,
    ratingQuestions,
    referrals,
    userGoals,
    userNotes,
    userPreferences,
    user,
  ],
}
