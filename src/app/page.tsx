"use client";

import { useAppContext } from "@/context/AppContext";
import { FolderKanban, CalendarClock, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { projects, tasks, getCriticalIssues, getTasksDueToday, users } = useAppContext();

  const activeProjects = projects.filter((p) => p.status === "active");
  const tasksDueToday = getTasksDueToday();
  const criticalIssues = getCriticalIssues();

  const stats = [
    { label: "Active Projects", value: activeProjects.length, icon: FolderKanban, href: "/projects?filter=active", gradient: "linear-gradient(135deg, #6366f1, #818cf8)", glow: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)" },
    { label: "Tasks Due Today", value: tasksDueToday.length, icon: CalendarClock, href: "/tasks?filter=due-today", gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)", glow: "radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%)" },
    { label: "Critical Issues", value: criticalIssues.length, icon: AlertTriangle, href: "/tasks?filter=critical", gradient: "linear-gradient(135deg, #ef4444, #f87171)", glow: "radial-gradient(circle, rgba(239,68,68,0.3) 0%, transparent 70%)" },
  ];

  const statusClass: Record<string, string> = { active: "status-active", completed: "status-completed", "on-hold": "status-on-hold" };

  return (
    <div>
      <h1 className="dashboard-title">Dashboard</h1>
      <p className="dashboard-subtitle">Welcome back, Alex. Here&apos;s your project overview.</p>

      {/* Clickable stat cards */}
      <div className="stats-grid">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="stat-card">
            <div className="stat-card-glow" style={{ background: s.glow }} />
            <div className="stat-card-icon" style={{ background: s.gradient, color: "#fff", borderRadius: 10 }}>
              <s.icon size={22} />
            </div>
            <p className="stat-card-label">{s.label}</p>
            <p className="stat-card-value">{s.value}</p>
          </Link>
        ))}
      </div>

      {/* Projects table */}
      <h2 className="section-title">All Projects</h2>
      <div className="project-table-wrapper">
        <table className="project-table">
          <thead>
            <tr><th>Project</th><th>Progress</th><th>Status</th><th>End Date</th></tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id}>
                <td>
                  <Link href={`/projects/${p.id}`} className="project-name-cell">
                    <span className="project-dot" style={{ background: p.color }} />
                    <span className="project-name">{p.name}</span>
                  </Link>
                </td>
                <td style={{ minWidth: 160 }}>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${p.progress}%`, background: p.color }} />
                  </div>
                  <span className="progress-text">{p.progress}%</span>
                </td>
                <td><span className={`status-badge ${statusClass[p.status] ?? ""}`}>{p.status.replace("-", " ")}</span></td>
                <td style={{ color: "var(--text-muted)", fontSize: 14 }}>
                  {new Date(p.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
