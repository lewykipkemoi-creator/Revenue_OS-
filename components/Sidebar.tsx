"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  AlertCircle,
  MessagesSquare,
  Users,
  Target,
  Package,
  Wallet,
  Clock,
  CalendarDays,
  Plug,
  Bot,
  Settings,
} from "lucide-react";
import LewyMark from "./LewyMark";

const NAV = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/handover", label: "Human Takeover", icon: AlertCircle },
  { href: "/dashboard/conversations", label: "Conversations", icon: MessagesSquare },
  { href: "/dashboard/customers", label: "Customers", icon: Users },
  { href: "/dashboard/leads", label: "Leads", icon: Target },
  { href: "/dashboard/products", label: "Products & Media", icon: Package },
  { href: "/dashboard/revenue", label: "Revenue", icon: Wallet },
  { href: "/dashboard/followups", label: "Follow-ups", icon: Clock },
  { href: "/dashboard/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/dashboard/channels", label: "Channels", icon: Plug },
  { href: "/dashboard/ai", label: "Lewy AI Controls", icon: Bot },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex h-full flex-col gap-1 overflow-y-auto p-4">
      <div className="mb-4 flex items-center gap-2 px-2">
        <LewyMark size={28} />
        <span className="font-display text-base font-semibold">Lewy</span>
      </div>
      {NAV.map(({ href, label, icon: Icon }) => {
        const active = href === "/dashboard" ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={`focus-ring flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
              active ? "bg-surface2 text-text" : "text-muted hover:bg-surface2/60 hover:text-text"
            }`}
          >
            <Icon size={17} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
