"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Does Phend require an account?",
    a: "No. Phend runs entirely on-device with no sign-up, login, or account of any kind required to use it.",
  },
  {
    q: "Does it work offline?",
    a: "Core scanning runs locally using the rules and model already synced to your device. Fetching new rules, blocklist entries, or model updates requires an internet connection.",
  },
  {
    q: "How do I update?",
    a: "Detection rules, the blocklist, trusted domains, and the ML model sync automatically from the cloud — no action needed. Only the extension itself requires downloading a newer ZIP from this page and reloading it as unpacked.",
  },
  {
    q: "How do I uninstall?",
    a: "Open chrome://extensions or edge://extensions, find Phend, and click Remove. This deletes the extension and its locally cached data.",
  },
  {
    q: "Does Phend upload my browsing history?",
    a: "No. Scanning and verdicts are computed on-device. Only sync data required to keep your blocklist, allowlist, and detection rules current is exchanged with the server.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative border-t border-white/[0.06] py-24 sm:py-32">
      <div className="mx-auto max-w-[820px] px-6">
        <Reveal className="text-center">
          <p className="text-sm font-medium text-white/40">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Common questions.
          </h2>
        </Reveal>

        <div className="mt-12 divide-y divide-white/[0.06] rounded-2xl border border-white/[0.08] bg-card">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q} className="px-6">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-[15px] font-medium text-white">{faq.q}</span>
                  <Plus
                    size={16}
                    className={cn(
                      "shrink-0 text-white/40 transition-transform duration-300",
                      isOpen && "rotate-45 text-white"
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-[13.5px] leading-relaxed text-white/50">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
