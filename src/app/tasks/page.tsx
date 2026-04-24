"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { Calendar, Flag, ArrowLeft, Pencil } from "lucide-react";
import { useState, Suspense } from "react";
import EditTaskModal from "@/components/modals/EditTaskModal";
import { Task } from "@/data/mockData";

const priorityConfig: Record<string, { label: string; className: string }> = {
  critical: { label: "Critical", className: "priority-critical" },
  high: { label: "High", className: "priority-high" },
  medium: { label: "Medium", className: "priority-medium" },
  low: { label: "Low", className: "priority-low" },
};

const statusLabels: Record<string, string> = { todo: "To Do", "in-progress": "In Progress", done: "Done" };

function TasksContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const filter = searchParams.get("filter");
  const { tasks, getCriticalIssues, getTasksDueToday, getUserById, getProjectById } = useAppContext();
  const [editTask, setEditTask] = useState<Task | null>(null);

  let displayTasks: Task[];
  let title: string;
  let subtitle: string;

  if (filter === "due-today") {
    displayTasks = getTasksDueToday().sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    title = "Tasks Due Today";
    subtitle = "Tasks that are due today or overdue, sorted by due date.";
  } else if (filter === "critical") {
    displayTasks = getCriticalIssues();
    title = "Critical Issues";
    subtitle = "Tasks assigned to members who are out on leave.";
  } else {
    displayTasks = [...tasks].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    title = "All Tasks";
    subtitle = "Every task across all projects.";
  }

  return (
    <div>
      <button onClick={() => router.back()} style={{ fontSize: 13, color: "var(--text-muted)", display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 8, background: "none", border: "none" }}>
        <ArrowLeft size={14} /> Back
      </button>
      <h1 className="dashboard-title">{title}</h1>
      <p className="dashboard-subtitle">{subtitle}</p>

      <div className="project-table-wrapper">
        <table className="project-table">
          <thead>
            <tr><th>Task</th><th>Project</th><th>Assignee</th><th>Priority</th><th>Status</th><th>Due Date</th><th></th></tr>
          </thead>
          <tbody>
            {displayTasks.length === 0 && (
              <tr><td colSpan={7} style={{ textAlign: "center", color: "var(--text-muted)", padding: 40 }}>No tasks found.</td></tr>
            )}
            {displayTasks.map((t) => {
              const project = getProjectById(t.projectId);
              const assignee = getUserById(t.assigneeId);
              const pCfg = priorityConfig[t.priority];
              const isOverdue = new Date(t.dueDate) < new Date() && t.status !== "done";
              return (
                <tr key={t.id} className="task-row-clickable" onClick={() => router.push(`/projects/${t.projectId}?task=${t.id}`)}>
                  <td><span style={{ fontWeight: 600 }}>{t.title}</span></td>
                  <td>
                    <span className="project-name-cell">
                      {project && <span className="project-dot" style={{ background: project.color }} />}
                      <span>{project?.name ?? "—"}</span>
                    </span>
                  </td>
                  <td>
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {assignee && <span className="task-card-avatar">{assignee.avatar}</span>}
                      <span>{assignee?.name ?? "—"}</span>
                      {assignee?.status === "out-on-leave" && <span className="user-status-dot user-status-out" title="Out on Leave" />}
                    </span>
                  </td>
                  <td><span className={`priority-badge ${pCfg.className}`}><Flag size={10} />{pCfg.label}</span></td>
                  <td><span className={`status-badge status-${t.status === "in-progress" ? "active" : t.status === "done" ? "completed" : "on-hold"}`}>{statusLabels[t.status]}</span></td>
                  <td><span className={isOverdue ? "notif-overdue" : ""} style={{ fontSize: 14 }}>{new Date(t.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span></td>
                  <td>
                    <button className="task-edit-btn" onClick={(e) => { e.stopPropagation(); setEditTask(t); }} title="Edit"><Pencil size={14} /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {editTask && <EditTaskModal task={editTask} onClose={() => setEditTask(null)} />}
    </div>
  );
}

export default function TasksPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, color: "var(--text-muted)" }}>Loading tasks…</div>}>
      <TasksContent />
    </Suspense>
  );
}
