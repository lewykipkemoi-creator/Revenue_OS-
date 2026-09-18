import PageHeader from "@/components/PageHeader";

const customers = [
  { name: "Achieng M.", channels: "WhatsApp, Instagram", revenue: "KES 18,400", last: "2m ago" },
  { name: "James O.", channels: "WhatsApp", revenue: "KES 6,500", last: "31m ago" },
  { name: "Grace N.", channels: "Telegram", revenue: "KES 41,000", last: "1h ago" },
  { name: "Peter W.", channels: "Website Chat", revenue: "KES 0", last: "2h ago" },
];

export default function CustomersPage() {
  return (
    <div>
      <PageHeader title="Customers" subtitle="Unified records across every channel." />
      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[600px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Channels</th>
              <th className="px-4 py-3 font-medium">Lifetime revenue</th>
              <th className="px-4 py-3 font-medium">Last interaction</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.name} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium">{c.name}</td>
                <td className="px-4 py-3 text-muted">{c.channels}</td>
                <td className="px-4 py-3 text-amber">{c.revenue}</td>
                <td className="px-4 py-3 text-muted">{c.last}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
