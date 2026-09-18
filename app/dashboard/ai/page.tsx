import PageHeader from "@/components/PageHeader";

const toggles = [
  { label: "Auto-reply to new messages", on: true },
  { label: "Lead qualification", on: true },
  { label: "Automatic follow-ups", on: true },
  { label: "Appointment booking", on: true },
  { label: "Send product media automatically", on: true },
  { label: "Require approval before sending quotes", on: false },
];

const escalations = ["Complaints", "Payment method discussions", "Price negotiation / bargaining"];

export default function AIControlsPage() {
  return (
    <div>
      <PageHeader title="Lewy AI Controls" subtitle="What Lewy can do automatically, and what always comes to you." />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-5">
          <h2 className="font-display text-base font-semibold">Automation permissions</h2>
          <div className="mt-4 space-y-4">
            {toggles.map((t) => (
              <div key={t.label} className="flex items-center justify-between text-sm">
                <span>{t.label}</span>
                <span
                  className={`h-6 w-11 rounded-full p-0.5 transition-colors ${t.on ? "bg-teal/40" : "bg-surface2"}`}
                >
                  <span
                    className={`block h-5 w-5 rounded-full bg-text transition-transform ${t.on ? "translate-x-5" : ""}`}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5">
          <h2 className="font-display text-base font-semibold">Mandatory escalation — always to a human</h2>
          <p className="mt-1 text-xs text-muted">These can't be turned off. You can add more categories below.</p>
          <ul className="mt-4 space-y-2">
            {escalations.map((e) => (
              <li key={e} className="flex items-center gap-2 rounded-xl border border-danger/30 bg-danger/5 px-4 py-2.5 text-sm text-danger">
                {e}
              </li>
            ))}
          </ul>
          <button className="focus-ring mt-4 text-sm text-teal">+ Add escalation category</button>
        </div>
      </div>
    </div>
  );
}
