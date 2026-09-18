import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";

const byChannel = [
  { channel: "WhatsApp Business", revenue: "KES 84,200" },
  { channel: "Instagram DMs", revenue: "KES 31,000" },
  { channel: "Telegram", revenue: "KES 22,000" },
  { channel: "Website Chat", revenue: "KES 11,000" },
];

const transactions = [
  { customer: "Grace N.", product: "Fitting + tailoring", amount: "KES 4,000", status: "Paid" },
  { customer: "Dennis K.", product: "Wholesale order", amount: "KES 41,000", status: "Paid" },
  { customer: "Nadia K.", product: "Custom order", amount: "KES 3,200", status: "No payment made" },
];

export default function RevenuePage() {
  return (
    <div>
      <PageHeader title="Revenue" subtitle="Confirmed, estimated, and at risk — kept clearly separate." />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Confirmed revenue" value="KES 148,200" tone="positive" />
        <StatCard label="Revenue recovered" value="KES 26,400" tone="positive" hint="From stalled chats" />
        <StatCard label="Pipeline (estimated)" value="KES 61,900" />
        <StatCard label="Revenue at risk" value="KES 22,000" tone="warning" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-5">
          <h2 className="font-display text-base font-semibold">Revenue by channel</h2>
          <div className="mt-4 space-y-3">
            {byChannel.map((c) => (
              <div key={c.channel} className="flex items-center justify-between text-sm">
                <span className="text-muted">{c.channel}</span>
                <span className="font-medium">{c.revenue}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5">
          <h2 className="font-display text-base font-semibold">Recent transactions</h2>
          <div className="mt-4 space-y-3">
            {transactions.map((t) => (
              <div key={t.customer} className="flex items-center justify-between border-b border-border pb-3 text-sm last:border-0 last:pb-0">
                <div>
                  <p className="font-medium">{t.customer}</p>
                  <p className="text-xs text-muted">{t.product}</p>
                </div>
                <div className="text-right">
                  <p className="text-amber">{t.amount}</p>
                  <p className={`text-xs ${t.status === "Paid" ? "text-cyan" : "text-danger"}`}>{t.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
