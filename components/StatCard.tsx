export default function StatCard({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "default" | "positive" | "warning";
}) {
  const toneColor =
    tone === "positive" ? "text-cyan" : tone === "warning" ? "text-amber" : "text-text";

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <p className="text-xs text-muted">{label}</p>
      <p className={`mt-2 font-display text-2xl font-semibold ${toneColor}`}>{value}</p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}
