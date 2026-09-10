"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { cn } from "@/lib/utils";

// Root-relative so they still resolve from /about, not just the home page.
const links = [
  { label: "Features", href: "/#how-it-works" },
  { label: "Download", href: "/#download" },
  { label: "Installation", href: "/#installation" },
  { label: "Guide", href: "/#guide" },
  { label: "FAQ", href: "/#faq" },
];

export function Navbar({ downloadUrl }: { downloadUrl?: string }) {
  // Falls back to the in-page section if no release URL was passed in.
  const dl = downloadUrl ?? "/#download";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/[0.05] backdrop-blur-2xl backdrop-saturate-0"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6">
        <Link href="/#top" className="flex items-center gap-2">
          <Image src="/icons/pshld-logo.png" alt="Phend" width={38} height={38} className="h-10 w-10" />
          <span className="text-[15px] font-semibold tracking-tight">Phend</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3.5 py-2 text-[13.5px] text-white/60 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-md text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white"
            aria-label="GitHub"
          >
            <GithubIcon className="h-[20px] w-[20px]" />
          </a>
          <Button href={dl} size="sm">
            Download
          </Button>
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-md text-white/70 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="bg-white/[0.05] px-6 py-4 backdrop-blur-2xl backdrop-saturate-0 md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm text-white/70 hover:bg-white/[0.06] hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <Button
              href={dl}
              size="sm"
              className="mt-2 w-full"
              onClick={() => setOpen(false)}
            >
              Download
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
