import Hero from "../../components/hero"
import HomePage from "@/components/home-page"
import { getAllCoinTransactions } from "@/sanity/lib/coin-transactions/getAll"
import { auth } from "@clerk/nextjs/server"

export default async function Home() {
  const user = await auth()
  const coin_transactions = await getAllCoinTransactions()
  return (
    <main className="bg-inherit">
      {!user ? <Hero /> : <HomePage coin_transactions={coin_transactions} />}
    </main>
  )
}
