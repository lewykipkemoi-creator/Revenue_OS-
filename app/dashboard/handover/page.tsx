import Link from "next/link";
import PageHeader from "@/components/PageHeader";

const cases = [
  { customer: "James O.", channel: "WhatsApp", reason: "Payment method discussion", value: "KES 6,500", since: "31m ago" },
  { customer: "Nadia K.", channel: "Instagram", reason: "Price negotiation", value: "KES 3,200", since: "1h ago" },
];

export default function HandoverPage() {
  return (
    <div>
      <PageHeader
        title="Human Takeover"
        subtitle="Complaints, payment discussions and price negotiation always come here first."
      />

      <div className="space-y-3">
        {cases.map((c) => (
          <Link
            key={c.customer}
            href="/dashboard/conversations"
            className="focus-ring flex flex-col gap-2 rounded-2xl border border-danger/30 bg-danger/5 p-5 transition-colors hover:bg-danger/10 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium">{c.customer}</p>
              <p className="mt-1 text-sm text-danger">{c.reason}</p>
              <p className="mt-1 text-xs text-muted">{c.channel} · flagged {c.since}</p>
            </div>
            <div className="text-sm font-medium text-amber">{c.value} opportunity</div>
          </Link>
        ))}

        {cases.length === 0 && (
          <p className="rounded-2xl border border-border bg-surface p-8 text-center text-sm text-muted">
            No conversations need you right now.
          </p>
        )}
      </div>
    </div>
  );
}
