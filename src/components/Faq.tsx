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
    q: "Can I install Phend on my phone?",
    a: "No. Phend is desktop only. Chrome and Edge on Android and iOS don't support Manifest V3 extensions at all, so there is no mobile build and no way to sideload one. Phend runs on Chrome or Edge for Windows, macOS, and Linux.",
  },
  {
    q: "Does it work offline?",
    a: "Core scanning runs locally using the rules and model already synced to your device. Fetching new rules, blocklist entries, or model updates requires an internet connection.",
  },
  {
    q: "How do I update?",
    a: "Detection rules, the blocklist, and trusted domains sync automatically from the cloud. The ML model does not. When a newer one is published, Phend asks whether you want to update the model now or leave it for later, and you can always pull it yourself with Sync now in Settings. Only the extension itself requires downloading a newer ZIP from this page and reloading it as unpacked.",
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
    <section id="faq" className="relative border-t border-white/[0.06] py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[820px] px-6">
        <Reveal className="text-center">
          <p className="font-display text-[10px] tracking-wide text-white/40 sm:text-[11px]">FAQ</p>
          <h2 className="mt-3 text-[22px] font-semibold leading-snug tracking-tight sm:text-3xl lg:text-4xl">
            Common questions.
          </h2>
        </Reveal>

        <div className="mt-10 divide-y divide-white/[0.06] rounded-2xl border border-white/[0.08] bg-card sm:mt-12">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q} className="px-4 sm:px-6">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-3 py-3.5 text-left sm:gap-4 sm:py-5"
                >
                  <span className="text-[13.5px] font-medium leading-snug text-white sm:text-[15px]">{faq.q}</span>
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
                      <p className="pb-4 text-[12px] leading-relaxed text-white/50 sm:pb-5 sm:text-[13.5px]">
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
