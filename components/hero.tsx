"use client"

import { motion } from "framer-motion"
import { Button } from "./button"
import Link from "next/link"

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center h-screen text-center bg-gradient-to-b from-amber-400 to-black text-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}>
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}>
          Intentional Living
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}>
          Getting 0.1% Better Every Day, Together
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}>
          <Link href={"/quiz"}>
            <Button className="px-6 py-3 text-lg bg-black hover:bg-amber-400/50 transition">
              Get Started
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
