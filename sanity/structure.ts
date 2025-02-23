import type { StructureResolver } from "sanity/structure"

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Blog Section
      S.listItem()
        .title("Blog")
        .child(
          S.list()
            .title("Blog Management")
            .items([
              S.documentTypeListItem("post").title("Posts"),
              S.documentTypeListItem("category").title("Categories"),
              S.documentTypeListItem("author").title("Authors"),
            ])
        ),

      S.divider(),

      // App Data Section
      S.listItem()
        .title("App Data")
        .child(
          S.list()
            .title("App Data Management")
            .items([
              S.documentTypeListItem("user").title("Users"),
              S.documentTypeListItem("coinTransactions").title(
                "Coin Transactions"
              ),
              S.documentTypeListItem("goalTracking").title("Goal Tracking"),
              S.documentTypeListItem("dailyRatings").title("Daily Ratings"),
              S.documentTypeListItem("dailyTracking").title("Daily Tracking"),
              S.documentTypeListItem("feedback").title("Feedback"),
              S.documentTypeListItem("motivationalQuotes").title(
                "Motivational Quotes"
              ),
              S.documentTypeListItem("userNotes").title("User Notes"),
              S.documentTypeListItem("ratingQuestions").title(
                "Rating Questions"
              ),
              S.documentTypeListItem("referrals").title("Referrals"),
              S.documentTypeListItem("userGoals").title("User Goals"),
              S.documentTypeListItem("userPreferences").title(
                "User Preferences"
              ),
            ])
        ),

      S.divider(),

      // Any other document types not explicitly listed
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            "post",
            "category",
            "author",
            "user",
            "coinTransactions",
            "goalTracking",
            "dailyRatings",
            "dailyTracking",
            "feedback",
            "motivationalQuotes",
            "userNotes",
            "ratingQuestions",
            "referrals",
            "userGoals",
            "userPreferences",
            "verificationCodes",
          ].includes(item.getId()!)
      ),
    ])
