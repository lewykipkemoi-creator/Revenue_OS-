"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlertCircle, Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function DashboardTopBar({
  pendingHandovers = 2,
  onMenuClick,
}: {
  pendingHandovers?: number;
  onMenuClick?: () => void;
}) {
  const pathname = usePathname();
  const [active, setActive] = useState(true);
  const onConversations = pathname.startsWith("/dashboard/conversations");

  return (
    <div className="sticky top-0 z-20 bg-ink/80 backdrop-blur">
      <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 md:px-8">
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="focus-ring rounded-lg p-1.5 text-muted md:hidden">
            <Menu size={20} />
          </button>
          <button
            onClick={() => setActive((a) => !a)}
            className="focus-ring flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium"
            aria-pressed={active}
          >
            <span
              className={`h-2 w-2 rounded-full ${active ? "bg-cyan" : "bg-muted"}`}
              aria-hidden
            />
            Lewy is {active ? "active" : "deactivated"}
          </button>
        </div>
        <ThemeToggle />
      </div>

      {pendingHandovers > 0 && !onConversations && (
        <Link
          href="/dashboard/handover"
          className="focus-ring flex items-center justify-center gap-2 bg-danger/15 px-4 py-2.5 text-center text-sm font-medium text-danger transition-colors hover:bg-danger/20"
        >
          <AlertCircle size={16} />
          ACTION REQUIRED: {pendingHandovers} customer{pendingHandovers > 1 ? "s need" : " needs"} you
        </Link>
      )}
    </div>
  );
}
