import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import PipelineVisual from "@/components/PipelineVisual";
import LewyMark from "@/components/LewyMark";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/3 h-[520px] w-[520px] rounded-full opacity-[0.15] blur-[130px]"
        style={{ background: "radial-gradient(circle, #E8A63D, transparent 70%)" }}
      />

      <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12">
        <div className="flex items-center gap-2">
          <LewyMark size={30} />
          <span className="font-display text-lg font-semibold tracking-tight">Lewy</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/auth"
            className="focus-ring hidden rounded-full px-4 py-2 text-sm text-muted transition-colors hover:text-text md:inline-block"
          >
            Log in
          </Link>
          <Link
            href="/auth?mode=signup"
            className="focus-ring rounded-full bg-text px-4 py-2 text-sm font-medium text-ink transition-opacity hover:opacity-90"
          >
            Get started
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <section className="relative z-10 grid gap-16 px-6 pb-24 pt-8 md:grid-cols-[1.1fr_0.9fr] md:items-center md:px-12 md:pt-16">
        <div>
          <h1 className="font-display text-[2.6rem] font-medium leading-[1.08] tracking-tight md:text-[3.3rem]">
            The customer who messages at 11pm shouldn&apos;t wait until{" "}
            <span className="italic">9am.</span>
          </h1>
          <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-muted">
            Lewy answers customers on WhatsApp, Instagram, email and your website the moment
            they write in — qualifies the lead, sends the right price list, books the
            appointment, and puts anything sensitive straight in front of you.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/auth?mode=signup"
              className="focus-ring rounded-full bg-gold px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-goldDeep"
            >
              Train your Lewy
            </Link>
            <span className="text-sm text-muted">No card needed to try it</span>
          </div>

          <div className="mt-16 max-w-md border-t border-border pt-6">
            <p className="text-sm leading-relaxed text-muted">
              A payment discussion, a complaint, or someone trying to haggle the price —
              Lewy hands those straight to you. It never guesses on money.
            </p>
          </div>
        </div>

        <PipelineVisual />
      </section>
    </main>
  );
}
