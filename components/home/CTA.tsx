"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, Sparkles } from "lucide-react";

export default function CTAPage() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-150 w-225 rounded-full bg-linear-to-r from-red-400/30 via-pink-400/30 to-orange-400/30 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
          relative max-w-3xl w-full
          rounded-[32px]
          backdrop-blur-xl
          bg-white/70
          border border-gray-200/50
          shadow-2xl
          p-10 md:p-14
          text-center
        "
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="
            mx-auto mb-6
            flex h-14 w-14 items-center justify-center
            rounded-full
            bg-linear-to-br from-red-500 to-pink-500
            text-white
            shadow-lg
          "
        >
          <Sparkles />
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Ready to turn long PDFs into
          <span className="block bg-linear-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            clear, instant summaries?
          </span>
        </h1>

        <p className="mt-5 text-lg text-gray-600 leading-relaxed">
          Upload your PDF and let Sommaire’s AI extract the key ideas, insights,
          and structure — in seconds.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3 text-sm text-gray-700">
          {[
            "⚡ Instant summaries",
            "🧠 Context-aware AI",
            "📄 Works with any PDF",
          ].map((item) => (
            <div
              key={item}
              className="
                rounded-xl
                bg-white/60
                border border-gray-200/40
                px-4 py-3
                shadow-sm
              "
            >
              {item}
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="
              w-full sm:w-auto
              bg-linear-to-r from-red-500 to-pink-500
              text-white
              shadow-lg
              hover:shadow-xl
              transition-all
            "
          >
            <FileText className="mr-2 h-5 w-5" />
            Upload PDF
          </Button>
        </div>

        {/* trust text */}
        <p className="mt-6 text-xs text-gray-500">
          No credit card required · Free to get started
        </p>
      </motion.div>
    </section>
  );
}
