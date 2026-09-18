import PageHeader from "@/components/PageHeader";

const sections = [
  { title: "Business profile", desc: "Name, description, hours, location" },
  { title: "Team members & roles", desc: "Invite teammates, manage permissions" },
  { title: "Notifications", desc: "Handover alerts, follow-up reminders" },
  { title: "Security & sessions", desc: "Password, active devices" },
  { title: "Connected accounts", desc: "Manage linked channels" },
  { title: "Billing & usage", desc: "Plan, invoices, usage this month" },
];

export default function SettingsPage() {
  return (
    <div>
      <PageHeader title="Settings" />
      <div className="grid gap-3 md:grid-cols-2">
        {sections.map((s) => (
          <button
            key={s.title}
            className="focus-ring rounded-2xl border border-border bg-surface p-5 text-left transition-colors hover:border-teal/40"
          >
            <p className="font-medium">{s.title}</p>
            <p className="mt-1 text-sm text-muted">{s.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
