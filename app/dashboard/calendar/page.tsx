import PageHeader from "@/components/PageHeader";

const appointments = [
  { customer: "Grace N.", type: "Fitting", time: "Sat, 11:00am" },
  { customer: "Dennis K.", type: "Wholesale call", time: "Mon, 2:30pm" },
];

export default function CalendarPage() {
  return (
    <div>
      <PageHeader
        title="Calendar"
        subtitle="Connected to Google Calendar."
        action={
          <button className="focus-ring rounded-full border border-border px-4 py-2 text-sm text-muted hover:text-text">
            Reconnect Google Calendar
          </button>
        }
      />
      <div className="space-y-3">
        {appointments.map((a) => (
          <div key={a.customer} className="flex items-center justify-between rounded-2xl border border-border bg-surface p-5">
            <div>
              <p className="font-medium">{a.customer}</p>
              <p className="mt-1 text-xs text-muted">{a.type}</p>
            </div>
            <p className="text-sm text-teal">{a.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
