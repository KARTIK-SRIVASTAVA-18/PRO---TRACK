"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Settings,
  Zap,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/team", label: "Team", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      {/* Brand */}
      <Link href="/" className="sidebar-brand">
        <span className="sidebar-brand-icon">
          <Zap size={20} />
        </span>
        <span className="sidebar-brand-text">ProTrack</span>
      </Link>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <span className="sidebar-section-label">Main Menu</span>
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link ${isActive ? "active" : ""}`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom card */}
      <div className="sidebar-bottom-card">
        <div className="sidebar-bottom-card-glow" />
        <p className="sidebar-bottom-card-title">Upgrade to Pro</p>
        <p className="sidebar-bottom-card-desc">
          Unlock analytics, timelines &amp; unlimited projects.
        </p>
        <button className="sidebar-upgrade-btn">Upgrade</button>
      </div>
    </aside>
  );
}
