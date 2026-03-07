"use client";

import { motion } from "framer-motion";
import UploadForm from "@/components/upload/Upload.form";
import AIBadge from "@/components/common/AIBadge";
import { GradientBackground1 } from "@/components/common/gradient";
import { __experimental_useSubscription } from "@clerk/shared/react/index";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const FREE_LIMIT = 5;

export default function UploadSection() {
  const subscription = __experimental_useSubscription();

  const planType = subscription.data?.subscriptionItems?.[0]?.plan?.name;
  const isPro = planType === "Pro";

  const [pdfCount, setPdfCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch("/api/pdf/count");
        const data = await res.json();
        setPdfCount(data.count);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, []);

  const isLimitReached = !isPro && pdfCount >= FREE_LIMIT;

  return (
    <section className="relative mx-auto max-w-5xl px-4 sm:px-6">
      <GradientBackground1 />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container py-12 lg:py-24 text-center"
      >
        <AIBadge text="AI-Powered Content Creation" />

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-4 text-2xl md:text-4xl font-bold text-gray-900"
        >
          Start Uploading{" "}
          <span className="relative inline-block">
            <span className="relative z-10 px-2">Your PDF</span>
            <span className="absolute inset-0 bg-rose-200/50 -rotate-2 rounded-lg -skew-y-1"></span>
          </span>
        </motion.h1>

        <p className="mt-4 max-w-2xl mx-auto text-gray-600">
          AI-powered summaries that help you{" "}
          <span className="font-semibold text-gray-900">
            read less and understand more
          </span>
          .
        </p>

        {!isPro && (
          <p className="mt-4 text-sm text-gray-500">
            {loading
              ? "Checking usage..."
              : `${pdfCount}/${FREE_LIMIT} PDFs used`}
          </p>
        )}

        <div className="mt-8">
          {loading && (
            <Button disabled className="opacity-70 cursor-not-allowed">
              Checking limits...
            </Button>
          )}

          {!loading && isLimitReached && (
            <div className="p-6 border rounded-xl bg-amber-50 border-amber-200">
              <p className="text-amber-700 mb-4">
                You reached the free plan limit of {FREE_LIMIT} PDFs.
              </p>

              <Link href="/pricing">
                <Button>Upgrade to Pro</Button>
              </Link>
            </div>
          )}

          {!loading && !isLimitReached && <UploadForm />}
        </div>
      </motion.div>
    </section>
  );
}
