import PageHeader from "@/components/PageHeader";
import { FileText, Image as ImageIcon, Video } from "lucide-react";

const products = [
  { name: "Ceramic vase set", price: "KES 2,400", sku: "AMN-VS-01" },
  { name: "Woven throw blanket", price: "KES 3,800", sku: "AMN-TB-04" },
];

const media = [
  { name: "Price list — Sept 2026.pdf", type: "pdf" },
  { name: "Catalogue — Home Collection.pdf", type: "pdf" },
  { name: "Vase set — front.jpg", type: "image" },
  { name: "Studio tour.mp4", type: "video" },
];

export default function ProductsPage() {
  return (
    <div>
      <PageHeader
        title="Products & Media"
        subtitle="What Lewy knows, and what it can send automatically."
        action={
          <button className="focus-ring rounded-full bg-text px-4 py-2 text-sm font-medium text-ink">
            Add item
          </button>
        }
      />

      <h2 className="mb-3 font-display text-base font-semibold">Products & services</h2>
      <div className="mb-8 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[480px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">SKU</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.sku} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3 text-amber">{p.price}</td>
                <td className="px-4 py-3 text-muted">{p.sku}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mb-3 font-display text-base font-semibold">Media library</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {media.map((m) => {
          const Icon = m.type === "pdf" ? FileText : m.type === "video" ? Video : ImageIcon;
          return (
            <div key={m.name} className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4">
              <Icon size={18} className="shrink-0 text-cyan" />
              <span className="truncate text-sm">{m.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
