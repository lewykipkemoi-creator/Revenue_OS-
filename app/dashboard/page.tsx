import Link from "next/link";
import { AlertCircle } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";

const activity = [
  { text: "Replied to Achieng M. about size availability", time: "2m ago" },
  { text: "Sent price list PDF to a new Instagram lead", time: "14m ago" },
  { text: "Escalated a refund complaint to human takeover", time: "31m ago" },
  { text: "Booked a fitting appointment for Sat 11am", time: "1h ago" },
];

export default function OverviewPage() {
  return (
    <div>
      <PageHeader
        title="Overview"
        subtitle="What Lewy handled, what needs you, and what it's worth."
      />

      <Link
        href="/dashboard/handover"
        className="focus-ring mb-6 flex items-center gap-3 rounded-2xl border border-danger/30 bg-danger/10 px-5 py-4 text-sm text-danger transition-colors hover:bg-danger/15"
      >
        <AlertCircle size={18} />
        <span className="font-medium">ACTION REQUIRED: 2 customers need you</span>
      </Link>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Revenue recovered" value="KES 148,200" tone="positive" hint="Last 30 days" />
        <StatCard label="Revenue at risk" value="KES 22,000" tone="warning" hint="3 stalled leads" />
        <StatCard label="Lewy-assisted sales" value="34" hint="This month" />
        <StatCard label="New leads" value="19" hint="This week" />
        <StatCard label="Unanswered conversations" value="0" tone="positive" />
        <StatCard label="Appointments upcoming" value="5" hint="Next 7 days" />
        <StatCard label="Follow-ups due" value="7" />
        <StatCard label="Channel health" value="6/6" tone="positive" hint="All connected" />
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-surface p-5">
        <h2 className="font-display text-base font-semibold">Recent AI activity</h2>
        <ul className="mt-4 space-y-3">
          {activity.map((a, i) => (
            <li key={i} className="flex items-center justify-between border-b border-border pb-3 text-sm last:border-0 last:pb-0">
              <span>{a.text}</span>
              <span className="shrink-0 pl-4 text-xs text-muted">{a.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
