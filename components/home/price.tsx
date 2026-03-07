"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowBigRight, Check, CheckIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "../../lib/utils";

const plans = [
  {
    name: "Free",
    price: "$0",
    desc: "Try Sommaire without limits",
    features: ["3 PDFs / day", "Fast summaries", "Basic export"],
    paymentLink: "/pricing",
  },
  {
    name: "Pro",
    price: "$9 / mo",
    desc: "For serious reading & research",
    popular: true,
    features: [
      "Unlimited PDFs",
      "High-quality summaries",
      "Priority AI",
      "Export & share",
    ],
    paymentLink: "/pricing",
  },
  {
    name: "Team",
    price: "$19 / mo",
    desc: "Collaborate with your team",
    features: [
      "Team workspace",
      "Shared summaries",
      "Admin controls",
      "Priority support",
    ],
    paymentLink: "/pricing",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="min-h-screen relative pb-40">
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="h-125 w-225 bg-linear-to-r from-red-400/20 via-pink-400/20 to-orange-400/20 blur-3xl rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold text-rose-500">
          Pricing that scales with you
        </h2>
        <p className="mt-4 text-gray-600 text-lg">
          Modern AI tools deserve modern pricing
        </p>
      </motion.div>

      <div className="mt-20 grid gap-10 md:grid-cols-3 max-w-7xl mx-auto px-6 perspective-distant">
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{
              y: -16,
              rotateX: 6,
              rotateY: plan.popular ? -6 : 6,
            }}
            transition={{ type: "spring", stiffness: 160, damping: 14 }}
            viewport={{ once: true }}
            className={`
              relative rounded-[28px] p-8
              backdrop-blur-xl
              border
              shadow-xl
              transform-gpu
              ${
                plan.popular
                  ? "bg-linear-to-br from-red-500 via-pink-500 to-orange-500 text-white border-transparent"
                  : "bg-white/70 border-gray-200/50"
              }
            `}
          >
            {/* glow */}
            <div
              className={`
                pointer-events-none absolute inset-0 rounded-[28px] blur-2xl
                ${
                  plan.popular
                    ? "bg-linear-to-br from-red-500/50 via-pink-500/50 to-orange-500/50"
                    : "bg-linear-to-br from-red-300/30 to-pink-300/30 opacity-0 group-hover:opacity-100"
                }
              `}
            />

            {/* badge */}
            {plan.popular && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-white px-5 py-1 text-sm font-semibold text-red-600 shadow">
                Most Popular
              </div>
            )}

            {/* content */}
            <h3 className="text-xl font-semibold">{plan.name}</h3>
            <p className="mt-2 text-sm opacity-80">{plan.desc}</p>

            <div className="mt-6 text-4xl font-bold">{plan.price}</div>

            {/* features */}
            <ul className="mt-8 space-y-4">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-white/90" />
                  <span className="text-sm opacity-90">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Button
              size="lg"
              className={`
                mt-10 w-full rounded-xl
                ${
                  plan.popular
                    ? "bg-white text-red-600 hover:bg-gray-100"
                    : "bg-linear-to-r from-red-500 to-pink-500 text-white"
                }
              `}
            >
              Get Started
            </Button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export const PricingPage = () => {
  return (
    <section
      className="relative min-h-screen overflow-hidden "
      id="pricing"
    >
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className="flex items-center justify-center w-full">
          <h2 className="uppercase font-bold text-xl mb-8 text-rose-500">
            Pricing
          </h2>
        </div>
        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {plans.map((plan, index) => (
            <PriceCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

type PPlan = {
  name: string;
  price: string;
  desc: string;
  features: string[];
};

function PriceCard({ plan }: { plan: PPlan }) {
  return (
    <div className="relative w-full max-w-lg hover:scale-105 hover:transition-all duration-300">
      <div
        className={cn(
          "relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 border border-gray-500/20 rounded-2xl",
          plan.name == "Pro" && "border-rose-500 gap-5 border-2",
        )}
      >
        <div className="flex justify-between items-center gap-4">
          <div>
            <p className="text-lg lg:text-xl font-bold capitalize">
              {plan.name}
            </p>
            <p className="text-base-content/80 mt-2">{plan.desc}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <p
            className="text-5 tracking-tight font-extrabold
          "
          >
            {plan.price}{" "}
          </p>
          <div className="flex flex-col justify-end mb-1">
            <p className="text-xs uppercase font-extrabold">USD</p>
            <p className="text-xs">moth</p>
          </div>
        </div>
        <div className="space-y-2.5 leading-relaxed text-base flex-1">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center gap-3">
              <CheckIcon size={18} />
              <span className="text-sm opacity-90">{feature}</span>
            </li>
          ))}
        </div>
        <div className="space-y-2 flex justify-center w-full">
          <Link
            href="/pricing"
            className={cn(
              "w-full rounded-full flex items-center justify-center gap-2 bg-linear-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:rose-800 text-white border-2 py-2",
              plan.name === "Pro"
                ? "border-rose-900"
                : "border-rose-100 from-rose-400 to-rose-500",
            )}
          >
            Get Started <ArrowBigRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
