"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/button";
import { FileText, Menu, Upload, X } from "lucide-react";
import { useState } from "react";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Pricing", href: "/pricing" },
  { name: "Your Summaries", href: "/dashboard" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathName = usePathname();

  const isActive = (href: string) => {
    return pathName === href;
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="sticky top-4 z-50 mx-auto w-[95%] max-w-7xl"
      >
        <div className="backdrop-blur-xl border border-gray-200/50 shadow-lg rounded-2xl px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1 text-xl font-bold text-gray-900"
            >
              <FileText className="transition-transform duration-200 hover:rotate-12 text-rose-500" />
              Sommaire
            </motion.div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-semibold text-gray-600 hover:text-gray-900 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <SignedOut>
              <SignInButton>
                <Button variant="aiSoft">Sign in</Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Link href="/upload">
                <Button
                  className={`${isActive("/upload") ? "text-rose-700 animate-gradient-x" : "text-black animate-gradient-x  "}`}
                  variant={"ghost"}
                >
                  <Upload size={25}  />
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          <button
            onClick={() => setOpen((p) => !p)}
            className="md:hidden text-gray-700"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            />

            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 left-0 right-0 z-50 bg-white rounded-b-3xl shadow-xl p-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">Sommaire</span>
                <button onClick={() => setOpen(false)} aria-label="Close menu">
                  <X size={22} />
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-base font-semibold text-gray-700 hover:text-gray-900"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="mt-6 flex  gap-3">
                <SignedOut>
                  <SignInButton>
                    <Button variant="aiSoft">Sign in</Button>
                  </SignInButton>
                </SignedOut>

                <SignedIn>
                  <Link href="/upload" onClick={() => setOpen(false)}>
                    <Upload />
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
