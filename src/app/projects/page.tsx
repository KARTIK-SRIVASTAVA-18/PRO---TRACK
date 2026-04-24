"use client";

import { useSearchParams } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import { ArrowRight, Pause, Play, CheckCircle2 } from "lucide-react";
import { Suspense } from "react";

const avatarColors = [
  "linear-gradient(135deg,#6366f1,#a78bfa)",
  "linear-gradient(135deg,#06b6d4,#22d3ee)",
  "linear-gradient(135deg,#f59e0b,#fbbf24)",
  "linear-gradient(135deg,#ec4899,#f472b6)",
  "linear-gradient(135deg,#22c55e,#4ade80)",
];

function ProjectsContent() {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const { projects, users, tasks, toggleProjectHoldActive } = useAppContext();

  const filtered = filter === "active" ? projects.filter((p) => p.status === "active") : projects;

  return (
    <div>
      <h1 className="dashboard-title">Projects</h1>
      <p className="dashboard-subtitle">
        {filter === "active" ? "Active projects only." : "All your projects."}
        {filter && <Link href="/projects" style={{ marginLeft: 8, color: "var(--accent-hover)", fontSize: 13 }}>Show all →</Link>}
      </p>

      <div className="projects-grid">
        {filtered.map((p) => {
          const projectTasks = tasks.filter((t) => t.projectId === p.id);
          const doneTasks = projectTasks.filter((t) => t.status === "done");
          const teamMembers = p.teamMemberIds.map((id) => users.find((u) => u.id === id)).filter(Boolean);

          return (
            <div key={p.id} className="project-card">
              <div className="project-card-accent" style={{ background: p.color }} />
              <Link href={`/projects/${p.id}`}>
                <h3>{p.name}</h3>
              </Link>
              <p>{p.description}</p>

              {/* Progress */}
              <div style={{ marginBottom: 16 }}>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${p.progress}%`, background: p.color }} />
                </div>
                <span className="progress-text">
                  {p.progress}% complete · {doneTasks.length}/{projectTasks.length} tasks done
                </span>
              </div>

              <div className="project-card-meta">
                <div className="project-card-team">
                  {teamMembers.slice(0, 4).map((u, i) => (
                    <span key={u!.id} className="project-card-team-avatar" style={{ background: avatarColors[i % avatarColors.length] }} title={u!.name}>
                      {u!.avatar}
                    </span>
                  ))}
                </div>

                <div className="project-card-actions">
                  {/* Status badge */}
                  {p.status === "completed" ? (
                    <span className="status-badge status-completed"><CheckCircle2 size={12} /> Complete</span>
                  ) : (
                    <button
                      className={`toggle-btn ${p.status === "on-hold" ? "toggle-hold" : "toggle-active"}`}
                      onClick={(e) => { e.preventDefault(); toggleProjectHoldActive(p.id); }}
                      title={p.status === "on-hold" ? "Set Active" : "Put on Hold"}
                    >
                      {p.status === "on-hold" ? <><Play size={12} /> Activate</> : <><Pause size={12} /> Hold</>}
                    </button>
                  )}
                  <Link href={`/projects/${p.id}`} className="project-card-arrow">
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && <p style={{ color: "var(--text-muted)", gridColumn: "1/-1", textAlign: "center", padding: 40 }}>No projects match this filter.</p>}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, color: "var(--text-muted)" }}>Loading projects…</div>}>
      <ProjectsContent />
    </Suspense>
  );
}
