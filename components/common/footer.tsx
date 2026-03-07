"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const sections = {
  Product: ["Features", "Pricing", "Changelog"],
  Company: ["About", "Blog", "Careers"],
  Resources: ["Docs", "Support", "Status"],
};

export default function Footer() {
  return (
    <footer className="relative mt-24 px-4 sm:px-6">
      {/* background glow (safe for mobile) */}
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="h-75 w-150 rounded-full bg-linear-to-r from-red-400/20 via-pink-400/20 to-orange-400/20 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="
          mx-auto max-w-7xl
          rounded-3xl
          bg-white/70 backdrop-blur-xl
          border border-gray-200/50
          shadow-xl
          px-6 py-10 sm:px-10 sm:py-14
        "
      >
        {/* TOP */}
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-gray-900">Sommaire</h2>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              AI-powered summaries that help you read less and understand more.
            </p>
          </div>

          {/* Links */}
          {Object.entries(sections).map(([title, links]) => (
            <div key={title} className="text-center sm:text-left">
              <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {links.map((item) => (
                  <motion.li
                    key={item}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      href="#"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* DIVIDER */}
        <div className="my-10 h-px bg-gray-200/60" />

        {/* BOTTOM */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Sommaire. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-gray-900">
              Privacy
            </Link>
            <Link href="#" className="hover:text-gray-900">
              Terms
            </Link>
            <Link href="#" className="hover:text-gray-900">
              Security
            </Link>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
