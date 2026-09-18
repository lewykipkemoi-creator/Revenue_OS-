import PageHeader from "@/components/PageHeader";

const channels = [
  { name: "WhatsApp Business", status: "Connected" },
  { name: "Instagram DMs", status: "Connected" },
  { name: "Gmail", status: "Connected" },
  { name: "Facebook Messenger", status: "Needs attention" },
  { name: "Telegram", status: "Connected" },
  { name: "Website Chat", status: "Connected" },
  { name: "Google Calendar", status: "Connected" },
];

export default function ChannelsPage() {
  return (
    <div>
      <PageHeader title="Channels" subtitle="Where Lewy is listening and replying." />
      <div className="grid gap-3 md:grid-cols-2">
        {channels.map((c) => (
          <div key={c.name} className="flex items-center justify-between rounded-2xl border border-border bg-surface p-5">
            <div>
              <p className="font-medium">{c.name}</p>
              <p className={`mt-1 text-xs ${c.status === "Connected" ? "text-teal" : "text-copper"}`}>{c.status}</p>
            </div>
            <button className="focus-ring rounded-full border border-border px-3 py-1.5 text-xs text-muted hover:text-text">
              {c.status === "Connected" ? "Manage" : "Reconnect"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
