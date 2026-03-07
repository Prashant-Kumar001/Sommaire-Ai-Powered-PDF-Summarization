"use client";

import { motion } from "framer-motion";

export const GradientBackground1 = function () {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#f8fafc]">
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, 10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -left-40 h-128 w-lg rounded-full bg-indigo-300/40 blur-3xl"
      />

      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -right-40 h-128 w-lg rounded-full bg-purple-300/40 blur-3xl"
      />

      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-10 h-104 w-36 rounded-full bg-pink-300/40 blur-3xl"
      />

      <motion.div
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-10 h-104 w-36 rounded-full bg-indigo-300/40 blur-3xl"
      />

      <motion.div
        animate={{ x: [0, 25, 0], y: [0, -15, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-40 left-1/3 h-128 w-lg rounded-full bg-blue-300/40 blur-3xl"
      />
    </div>
  );
};
