import Hero from "../../components/hero"
import HomePage from "@/components/home-page"
import { getCoinTransactionsByUserId } from "@/sanity/lib/coin-transactions/getById"
import { getUserById } from "@/sanity/lib/user/getById"
import { auth } from "@clerk/nextjs/server"

export default async function Home() {
  const user = await auth()
  const coin_transactions = await getCoinTransactionsByUserId(user.userId!)
  const user_data = await getUserById(user.userId!)
  return (
    <main className="bg-inherit">
      {!user ? (
        <Hero />
      ) : (
        <HomePage user_data={user_data} coin_transactions={coin_transactions} />
      )}
    </main>
  )
}
