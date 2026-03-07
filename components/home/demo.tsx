"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";

export default function DemoPage() {
  const [loading, setLoading] = useState(false);

  return (
    <section className="relative min-h-screen px-6 pt-32 pb-40 flex justify-center">
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="h-150 w-225 rounded-full bg-linear-to-r from-red-400/25 via-pink-400/25 to-orange-400/25 blur-3xl" />
      </div>

      <div className="w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Live{" "}
            <span className="bg-linear-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              AI Demo
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            See how Sommaire turns a PDF into a clean summary — instantly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="
            mt-16
            rounded-[32px]
            bg-white/70 backdrop-blur-xl
            border border-gray-200/50
            shadow-2xl
            p-8 md:p-12
          "
        >
          <div className="flex flex-col items-center text-center">
            <div
              className="
              flex h-20 w-20 items-center justify-center
              rounded-full
              bg-linear-to-br from-red-500 to-pink-500
              text-white shadow-lg
            "
            >
              <FileText size={32} />
            </div>

            <h2 className="mt-6 text-2xl font-semibold text-gray-900">
              Upload a sample PDF
            </h2>
            <p className="mt-2 text-gray-600">
              (This is a demo — no real file needed)
            </p>

            <Button
              size="lg"
              className="mt-6 bg-linear-to-r from-red-500 to-pink-500 text-white"
              onClick={() => {
                setLoading(true);
                setTimeout(() => setLoading(false), 2500);
              }}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 animate-spin" />
                  AI is reading...
                </>
              ) : (
                <>
                  <FileText className="mr-2" />
                  Use Sample PDF
                </>
              )}
            </Button>
          </div>

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-10 flex justify-center"
            >
              <div className="flex items-center gap-3 text-red-500 font-semibold">
                <Sparkles className="animate-pulse" />
                Analyzing content & structure...
              </div>
            </motion.div>
          )}

          {!loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12 grid gap-6 md:grid-cols-2"
            >
              <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900">Original PDF</h3>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  Artificial Intelligence (AI) has rapidly evolved, impacting
                  industries such as healthcare, finance, and education. Modern
                  AI models can analyze large volumes of data and extract
                  meaningful insights...
                </p>
              </div>

              <div className="rounded-2xl bg-linear-to-br from-red-500 to-pink-500 p-6 text-white shadow-lg">
                <h3 className="font-semibold">AI Summary</h3>
                <ul className="mt-3 space-y-2 text-sm text-white/90">
                  <li>• AI is transforming multiple industries</li>
                  <li>• Models extract insights from large datasets</li>
                  <li>• Automation improves speed and accuracy</li>
                </ul>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
