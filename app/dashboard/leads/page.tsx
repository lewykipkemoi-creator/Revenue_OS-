import PageHeader from "@/components/PageHeader";

const stages = ["New", "Qualified", "Interested", "Negotiating", "Won"] as const;

const leads = [
  { customer: "Achieng M.", product: "Ceramic vase set", value: "KES 2,400", stage: "Interested" },
  { customer: "Peter W.", product: "Consultation", value: "KES 0", stage: "New" },
  { customer: "Grace N.", product: "Fitting + tailoring", value: "KES 4,000", stage: "Negotiating" },
  { customer: "Nadia K.", product: "Custom order", value: "KES 3,200", stage: "Negotiating" },
  { customer: "Dennis K.", product: "Wholesale inquiry", value: "KES 41,000", stage: "Won" },
];

export default function LeadsPage() {
  return (
    <div>
      <PageHeader title="Leads" subtitle="Every opportunity Lewy spotted in a conversation." />
      <div className="grid gap-4 md:grid-cols-5">
        {stages.map((stage) => (
          <div key={stage} className="rounded-2xl border border-border bg-surface p-3">
            <p className="mb-3 px-1 text-xs font-medium text-muted">{stage}</p>
            <div className="space-y-2">
              {leads
                .filter((l) => l.stage === stage)
                .map((l) => (
                  <div key={l.customer} className="rounded-xl border border-border bg-surface2 p-3 text-sm">
                    <p className="font-medium">{l.customer}</p>
                    <p className="mt-1 text-xs text-muted">{l.product}</p>
                    <p className="mt-2 text-xs text-amber">{l.value}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
