"use client";

import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ParsedItem {
  header: string;
  content: string;
}

interface ParsedSection {
  title: string;
  content: ParsedItem[];
}

const parseSection = (section: string): ParsedSection | null => {
  const [rawTitle, ...lines] = section.split("\n").filter(Boolean);

  const title = rawTitle?.replace(/[*#]/g, "").trim();

  const content = lines
    .map((line) => {
      const cleaned = line.replace(/[*]/g, "").trim();
      const [header, ...rest] = cleaned.split(":");

      return {
        header: header?.trim(),
        content: rest.join(":").trim(),
      };
    })
    .filter((i) => i.header && i.content);

  if (!title || content.length === 0) return null;

  return { title, content };
};

export default function SummaryViewer({
  summaryText,
}: {
  summaryText: string;
  title: string;
}) {
  const [index, setIndex] = useState(0);

  if (!summaryText) return null;

  const sections = summaryText
    .split("\n\n")
    .map((s) => s.trim())
    .filter(Boolean)
    .map(parseSection)
    .filter((s): s is ParsedSection => s !== null);

  if (!sections.length) return null;

  const current = sections[index];
  const total = sections.length;

  const next = () => setIndex((i) => Math.min(i + 1, total - 1));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="rounded-2xl border bg-white/80 backdrop-blur shadow-xl overflow-hidden">
        <div className="flex justify-center gap-2 py-2 border-b bg-muted/20 flex-wrap">
          {sections.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition
              ${
                i === index
                  ? "bg-indigo-600 text-white shadow"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <div className="mb-1">
                <h2 className="text-lg font-semibold text-gray-900">
                  {current.title}
                </h2>

                <p className="text-sm text-gray-500">
                  {current.content.length} key insights
                </p>
              </div>

              <div className="space-y-4">
                {current.content.map((item, i) => (
                  <div
                    key={i}
                    className="
                    group
                    relative
                    rounded-xl
                    border
                    bg-white
                    p-5
                    shadow-sm
                    transition
                    hover:shadow-lg
                    hover:-translate-y-0.5
                    "
                  >
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {item.header}
                    </h3>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>

        {/* FOOTER */}
        <div className="border-t bg-muted/20 px-4 py-3 flex items-center justify-between">
          <button
            onClick={prev}
            disabled={index === 0}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg border bg-white hover:bg-gray-50 transition disabled:opacity-40"
          >
            <ChevronLeft size={18} />
            Previous
          </button>

          <span className="text-sm text-gray-500 font-medium">
            {index + 1} / {total}
          </span>

          <button
            onClick={next}
            disabled={index === total - 1}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-40"
          >
            Next
            <ChevronRight size={18} />
          </button>
        </div>
      </Card>
    </div>
  );
}
