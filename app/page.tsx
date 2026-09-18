import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import PipelineVisual from "@/components/PipelineVisual";

const proof = [
  { value: "24/7", label: "Every message answered, day one" },
  { value: "<60s", label: "Typical first response time" },
  { value: "3", label: "Rules that always reach a human" },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/3 h-[520px] w-[520px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, #7C5CFF, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 -right-40 h-[480px] w-[480px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, #FFB86B, transparent 70%)" }}
      />

      <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12">
        <span className="font-display text-lg font-semibold tracking-tight">Lewy</span>
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

      <section className="relative z-10 grid gap-16 px-6 pb-24 pt-12 md:grid-cols-2 md:items-center md:px-12 md:pt-20">
        <div>
          <p className="mb-5 text-sm text-muted">For businesses that sell over chat</p>
          <h1 className="font-display text-[2.75rem] font-semibold leading-[1.05] tracking-tight md:text-[3.5rem]">
            The customer who messages at 11pm
            <br />
            shouldn&apos;t wait until 9am.
          </h1>
          <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-muted">
            Lewy answers customers on WhatsApp, Instagram, email and your website the moment
            they write in — qualifies the lead, sends the right catalogue or price list, books
            the appointment, and puts sensitive conversations straight in front of your team.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/auth?mode=signup"
              className="focus-ring rounded-full bg-gradient-to-r from-violet via-cyan to-amber px-6 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-90"
            >
              Train your Lewy
            </Link>
            <span className="text-sm text-muted">No card needed to try it</span>
          </div>

          <dl className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-8">
            {proof.map((item) => (
              <div key={item.label}>
                <dt className="font-display text-2xl font-semibold">{item.value}</dt>
                <dd className="mt-1 text-xs leading-snug text-muted">{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <PipelineVisual />
      </section>
    </main>
  );
}
