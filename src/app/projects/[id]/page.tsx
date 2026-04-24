"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors, closestCenter } from "@dnd-kit/core";
import { useAppContext } from "@/context/AppContext";
import { TaskStatus } from "@/data/mockData";
import KanbanColumn from "@/components/KanbanColumn";
import AddTaskModal from "@/components/modals/AddTaskModal";
import { Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";

const columns: TaskStatus[] = ["todo", "in-progress", "done"];

function KanbanContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const projectId = params.id as string;
  const highlightTaskId = searchParams.get("task");
  const { getProjectById, getProjectTasks, updateTaskStatus } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [highlightId, setHighlightId] = useState<string | null>(highlightTaskId);

  const project = getProjectById(projectId);
  const allTasks = getProjectTasks(projectId);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  // Scroll to highlighted task and clear after 3s
  useEffect(() => {
    if (highlightId) {
      const el = document.getElementById(`task-${highlightId}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      const timer = setTimeout(() => setHighlightId(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [highlightId]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    const taskId = active.id as string;
    const newStatus = over.id as TaskStatus;
    if (columns.includes(newStatus)) updateTaskStatus(taskId, newStatus);
  }

  if (!project) {
    return (
      <div>
        <p style={{ color: "var(--text-muted)" }}>Project not found.</p>
        <Link href="/projects" className="btn-secondary" style={{ marginTop: 16, display: "inline-flex" }}>
          <ArrowLeft size={16} /> Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="kanban-header">
        <div>
          <Link href="/projects" style={{ fontSize: 13, color: "var(--text-muted)", display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 8 }}>
            <ArrowLeft size={14} /> Projects
          </Link>
          <h1 className="kanban-project-title">{project.name}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
            <div className="progress-bar-bg" style={{ width: 160 }}>
              <div className="progress-bar-fill" style={{ width: `${project.progress}%`, background: project.color }} />
            </div>
            <span className="progress-text">{project.progress}% complete</span>
          </div>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)} id="kanban-add-task-btn">
          <Plus size={16} /> Add Task
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="kanban-board">
          {columns.map((status) => (
            <KanbanColumn key={status} status={status} tasks={allTasks.filter((t) => t.status === status)} highlightTaskId={highlightId} />
          ))}
        </div>
      </DndContext>

      {showModal && <AddTaskModal onClose={() => setShowModal(false)} defaultProjectId={projectId} />}
    </div>
  );
}

export default function ProjectKanbanPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, color: "var(--text-muted)" }}>Loading board…</div>}>
      <KanbanContent />
    </Suspense>
  );
}
