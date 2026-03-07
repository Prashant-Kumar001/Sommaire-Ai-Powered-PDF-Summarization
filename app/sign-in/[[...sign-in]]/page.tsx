'use client';

import { GradientBackground1 } from "@/components/common/gradient";
import { SignIn } from "@clerk/nextjs";
import { motion } from 'framer-motion';

export default function Page() {
  return (
    <motion.div className="lg:min-h-[40vh] relative flex flex-col items-center justify-center">
      <GradientBackground1 />
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <SignIn />;
      </div>
    </motion.div>
  );
}
