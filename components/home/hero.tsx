"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import AIBadge from "../common/AIBadge";
import Link from "next/link";
import { ArrowBigRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className="flex flex-col mt-20 items-center gap-10">
          <AIBadge text="Powered by AI" />

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xl md:text-4xl text-center font-bold text-gray-900 md-text-4xl "
          >
            Transform PDFs into{""}
            <span className="relative inline-block">
              {" "}
              <span className="relative z-10 px-2">concise</span>
              <span className="absolute inset-0 bg-rose-200/50 -rotate-2 rounded-lg transform -skew-y-1 "></span>
            </span>
            summaries
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mt-6 max-w-2xl text-lg sm:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600"
        >
          Get a beautiful reel of the document in minutes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-10 flex justify-center gap-4"
        >
          <Button
            size="lg"
            className="text-white mt-6 text-base sm:text-lg lg:text-xl rounded-full px-8 sm:px-12 lg:px-12 py-6 sm:py-7 lg:py-7 lg:mt-16 bg-linear-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 hover:no-underline font-bold  shadow-lg transition-all  duration-300 "
          >
            <Link href="/#pricing" className=" flex gap-2 items-center ">
              <ArrowBigRight className="animate-pulse" /> Get Started
            </Link>
          </Button>
          {/* <Button variant="aiGradient" size="lg">
          Upload PDF
        </Button>
        <Button variant="aiSoft" size="lg">
          View Demo
        </Button> */}
        </motion.div>

        <motion.div></motion.div>
      </div>
    </section>
  );
}
