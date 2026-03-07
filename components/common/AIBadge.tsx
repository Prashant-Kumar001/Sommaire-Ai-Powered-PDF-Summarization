import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AIBadge({ text }: { text: string }) {
  return (
    <motion.div
      // whileHover={{ y: -2, scale: 1.03 }}
      // transition={{ type: "spring", stiffness: 200, damping: 15 }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative inline-flex"
    >
      <div className="absolute -inset-0.5 rounded-full bg-linear-to-r from-rose-300 via-pink-500 to-red-500 blur-md opacity-60" />

      <div className="relative p-0.5 rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x">
        <Badge
          variant="secondary"
          className="
            relative flex items-center gap-2
            rounded-full
            bg-white/90 backdrop-blur
            px-6 py-2
            text-sm font-semibold
            text-gray-900
            transition-all duration-300
            hover:bg-white
          "
        >
          <motion.span
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center"
          >
            <Sparkles className="h-4 w-4 text-rose-600" />
          </motion.span>

          <span className="bg-linear-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">
            {text}
          </span>
        </Badge>
      </div>
    </motion.div>
  );
}
