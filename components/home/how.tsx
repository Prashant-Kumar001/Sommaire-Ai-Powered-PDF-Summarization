"use client";

import { motion } from "framer-motion";
import { Upload, Brain, FileText, Sparkles, MoveRight } from "lucide-react";
import React from "react";

const steps = [
  {
    icon: <Upload />,
    title: "Upload your PDF",
    desc: "Upload research papers, notes, reports, or books in seconds.",
  },
  {
    icon: <Brain />,
    title: "AI understands content",
    desc: "Our AI reads structure, context, and key ideas intelligently.",
  },
  {
    icon: <FileText />,
    title: "Get a clean summary",
    desc: "Receive concise, accurate summaries you can actually trust.",
  },
];

export default function HowItWorksPage() {
  return (
    <section className="min-h-screen relative pb-40 pt-32 px-6">
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="h-125 w-225 rounded-full bg-linear-to-r from-red-400/20 via-pink-400/20 to-orange-400/20 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          How{" "}
          <span className="bg-linear-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            Sommaire
          </span>{" "}
          works
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Turn long PDFs into clear summaries in just a few simple steps.
        </p>
      </motion.div>

      <div className="mt-20 max-w-6xl mx-auto grid gap-10 md:grid-cols-3">
        {steps.map((step, i) => {
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="
                relative rounded-[28px] p-8
                bg-white/70 backdrop-blur-xl
                border border-gray-200/50
                shadow-xl
                text-center
              "
            >
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-red-500 to-pink-500 text-white shadow-lg">
                {step.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="mt-3 text-gray-600">{step.desc}</p>

              {/* step number */}
              <div className="absolute top-4 right-4 text-sm font-bold text-red-500/30">
                0{i + 1}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* bottom CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="
          mt-24 mx-auto max-w-4xl
          rounded-3xl
          bg-linear-to-r from-red-500 to-pink-500
          p-12 text-center text-white shadow-2xl
        "
      >
        <div className="flex justify-center mb-4">
          <Sparkles />
        </div>
        <h2 className="text-3xl font-bold">Ready to try it yourself?</h2>
        <p className="mt-3 text-white/90">
          Upload your first PDF and see how fast Sommaire works.
        </p>
      </motion.div>
    </section>
  );
}

export const HowItWorksSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden ">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className="text-center mb-16">
          <h2 className="font-bold text-xl uppercase mb-4 text-rose-500">
            How it works
          </h2>
          <h3 className="font-bold text-3xl max-w-2xl mx-auto">
            Transform any PDF into an easy-to-digest summary in three simple
            steps
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
          {steps.map((step, i) => (
            <div key={i} className="relative flex items-stretch">
              <StepItem
                key={i}
                icon={step.icon}
                label={step.title}
                desc={step.desc}
              />
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <MoveRight
                    size={32}
                    className="text-rose-400"
                    strokeWidth={1}
                  ></MoveRight>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

function StepItem({
  icon,
  label,
  desc,
}: {
  icon: React.ReactNode;
  label: string;
  desc: string;
}) {
  return (
    <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 hover:border-rose-500/20 transition-colors group w-full ">
      <div className="flex flex-col gap-4 h-full">
        <div className="flex items-center justify-center h-24 w-24 mx-auto rounded-2xl bg-liner-to-br from-rose-500/10 to-transparent group-hover:from-rose-500/20 transition-colors:">
          <div className="text-rose-500">{icon}</div>
        </div>
        <div className="flex flex-col flex-1 gap-1 justify-between">
          <h4 className="text-center text-gray-600 text-sm">{label}</h4>
          <p className="text-center text-gray-600 text-sm">{desc}</p>
        </div>
      </div>
    </div>
  );
}
