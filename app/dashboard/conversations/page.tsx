import PageHeader from "@/components/PageHeader";

const conversations = [
  { customer: "Achieng M.", channel: "WhatsApp", preview: "Do you have the blue one in size M?", status: "AI handling", value: "KES 2,400", flagged: false },
  { customer: "James O.", channel: "WhatsApp", preview: "Can I pay half now, half on delivery?", status: "Human takeover required", value: "KES 6,500", flagged: true },
  { customer: "Nadia K.", channel: "Instagram", preview: "Can you do it for 2,500 instead?", status: "Human takeover required", value: "KES 3,200", flagged: true },
  { customer: "Peter W.", channel: "Website Chat", preview: "What time do you close on Saturday?", status: "AI handling", value: "—", flagged: false },
  { customer: "Grace N.", channel: "Telegram", preview: "Sending the fitting confirmation now, thanks!", status: "Follow-up scheduled", value: "KES 4,000", flagged: false },
];

export default function ConversationsPage() {
  return (
    <div>
      <PageHeader title="Conversations" subtitle="Every channel, one inbox." />

      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted">
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Channel</th>
              <th className="px-4 py-3 font-medium">Last message</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Opportunity</th>
            </tr>
          </thead>
          <tbody>
            {conversations.map((c) => (
              <tr
                key={c.customer}
                className={`border-b border-border last:border-0 ${c.flagged ? "bg-danger/5" : ""}`}
              >
                <td className="px-4 py-3 font-medium">{c.customer}</td>
                <td className="px-4 py-3 text-muted">{c.channel}</td>
                <td className="max-w-[260px] truncate px-4 py-3 text-muted">{c.preview}</td>
                <td className="px-4 py-3">
                  <span className={c.flagged ? "font-medium text-danger" : "text-cyan"}>{c.status}</span>
                </td>
                <td className="px-4 py-3 text-amber">{c.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
