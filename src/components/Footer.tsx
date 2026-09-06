import Image from "next/image";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { PhendWatermark } from "@/components/ui/PhendWatermark";
import { ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] pt-10">
      <div className="relative z-10 mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-6 px-6 pb-10 sm:flex-row">
        <div className="flex items-center gap-2.5 text-white/50">
          <Image src="/icons/pshld-logo.png" alt="Phend" width={38} height={38} className="h-10 w-10" />
          <span className="text-[13px]">
            &copy; {new Date().getFullYear()} Phend
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.03] text-white/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href="#top"
            aria-label="Back to top"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.03] text-white/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
          >
            <ArrowUp size={15} />
          </a>
        </div>

        <p className="text-[12px] text-white/30">
          Built with <span className="text-danger">&hearts;</span> by the
          Phend team
        </p>
      </div>

      <PhendWatermark />
    </footer>
  );
}
