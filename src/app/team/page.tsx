"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { UserStatus, Task } from "@/data/mockData";
import { Plus, ChevronDown } from "lucide-react";
import AddMemberModal from "@/components/modals/AddMemberModal";
import EditTaskModal from "@/components/modals/EditTaskModal";

const avatarColors = [
  "linear-gradient(135deg,#6366f1,#a78bfa)", "linear-gradient(135deg,#06b6d4,#22d3ee)",
  "linear-gradient(135deg,#f59e0b,#fbbf24)", "linear-gradient(135deg,#ec4899,#f472b6)",
  "linear-gradient(135deg,#22c55e,#4ade80)", "linear-gradient(135deg,#ef4444,#f87171)",
];

const statusOptions: { value: UserStatus; label: string; cls: string }[] = [
  { value: "active", label: "Active", cls: "user-status-active" },
  { value: "out-on-leave", label: "Out on Leave", cls: "user-status-out" },
  { value: "inactive", label: "Inactive", cls: "user-status-inactive" },
];

export default function TeamPage() {
  const router = useRouter();
  const { users, tasks, updateUserStatus, getProjectById } = useAppContext();
  const [showAddMember, setShowAddMember] = useState(false);
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [taskFilter, setTaskFilter] = useState<"all" | "ongoing" | "completed">("all");
  const [editTask, setEditTask] = useState<Task | null>(null);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
        <h1 className="dashboard-title">Team</h1>
        <button className="btn-primary" onClick={() => setShowAddMember(true)} id="add-member-btn">
          <Plus size={16} /> Add Member
        </button>
      </div>
      <p className="dashboard-subtitle">Your team members and their assignments.</p>

      <div className="team-grid">
        {users.map((u, i) => {
          const assignedTasks = tasks.filter((t) => t.assigneeId === u.id);
          const ongoingTasks = assignedTasks.filter((t) => t.status !== "done");
          const completedTasks = assignedTasks.filter((t) => t.status === "done");
          const isExpanded = expandedUser === u.id;

          const filteredTasks =
            taskFilter === "ongoing" ? ongoingTasks :
            taskFilter === "completed" ? completedTasks : assignedTasks;

          const currentStatus = statusOptions.find((s) => s.value === u.status)!;

          return (
            <div key={u.id} className={`team-card ${isExpanded ? "team-card-expanded" : ""}`}>
              <div className="team-avatar" style={{ background: avatarColors[i % avatarColors.length] }}>
                {u.avatar}
              </div>
              <p className="team-card-name">{u.name}</p>
              <p className="team-card-role">{u.role}</p>
              <p className="team-card-email">{u.email}</p>

              {/* Status selector */}
              <div className="team-status-select">
                <span className={`user-status-dot ${currentStatus.cls}`} />
                <select
                  value={u.status}
                  onChange={(e) => updateUserStatus(u.id, e.target.value as UserStatus)}
                  className="team-status-dropdown"
                >
                  {statusOptions.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              {/* Task count buttons */}
              <div className="team-counts">
                <button className="team-count-btn" onClick={() => { setExpandedUser(isExpanded && taskFilter === "all" ? null : u.id); setTaskFilter("all"); }}>
                  <span className="team-count-value">{assignedTasks.length}</span>
                  <span className="team-count-label">Total</span>
                </button>
                <button className="team-count-btn" onClick={() => { setExpandedUser(isExpanded && taskFilter === "ongoing" ? null : u.id); setTaskFilter("ongoing"); }}>
                  <span className="team-count-value" style={{ color: "var(--warning)" }}>{ongoingTasks.length}</span>
                  <span className="team-count-label">Ongoing</span>
                </button>
                <button className="team-count-btn" onClick={() => { setExpandedUser(isExpanded && taskFilter === "completed" ? null : u.id); setTaskFilter("completed"); }}>
                  <span className="team-count-value" style={{ color: "var(--success)" }}>{completedTasks.length}</span>
                  <span className="team-count-label">Done</span>
                </button>
              </div>

              {/* Expanded task list */}
              {isExpanded && (
                <div className="team-task-list">
                  {filteredTasks.length === 0 && <p className="kanban-empty">No tasks</p>}
                  {filteredTasks.map((t) => {
                    const proj = getProjectById(t.projectId);
                    return (
                      <button key={t.id} className="team-task-item" onClick={() => router.push(`/projects/${t.projectId}?task=${t.id}`)}>
                        <div>
                          <span className="team-task-title">{t.title}</span>
                          <span className="team-task-meta">{proj?.name} · Due {new Date(t.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                        </div>
                        <ChevronDown size={14} style={{ transform: "rotate(-90deg)", color: "var(--text-muted)" }} />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showAddMember && <AddMemberModal onClose={() => setShowAddMember(false)} />}
      {editTask && <EditTaskModal task={editTask} onClose={() => setEditTask(null)} />}
    </div>
  );
}
