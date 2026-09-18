import PageHeader from "@/components/PageHeader";

const followups = [
  { customer: "Nadia K.", due: "Today, 4:00pm", owner: "Lewy", status: "Scheduled" },
  { customer: "Peter W.", due: "Yesterday", owner: "Human", status: "Overdue" },
  { customer: "Achieng M.", due: "Tomorrow, 9:00am", owner: "Lewy", status: "Scheduled" },
];

export default function FollowupsPage() {
  return (
    <div>
      <PageHeader title="Follow-ups" subtitle="Keeps qualified opportunities from going cold." />
      <div className="space-y-3">
        {followups.map((f) => (
          <div
            key={f.customer}
            className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium">{f.customer}</p>
              <p className={`mt-1 text-xs ${f.status === "Overdue" ? "text-danger" : "text-muted"}`}>
                {f.due} · {f.owner === "Lewy" ? "Lewy will handle" : "Assigned to you"}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="focus-ring rounded-full border border-border px-3 py-1.5 text-xs text-muted hover:text-text">
                Reschedule
              </button>
              <button className="focus-ring rounded-full bg-text px-3 py-1.5 text-xs font-medium text-ink">
                Send now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
