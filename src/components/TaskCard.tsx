"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@/data/mockData";
import { useAppContext } from "@/context/AppContext";
import { Calendar, Flag, Pencil } from "lucide-react";
import EditTaskModal from "@/components/modals/EditTaskModal";

const priorityConfig: Record<string, { label: string; className: string }> = {
  critical: { label: "Critical", className: "priority-critical" },
  high: { label: "High", className: "priority-high" },
  medium: { label: "Medium", className: "priority-medium" },
  low: { label: "Low", className: "priority-low" },
};

export default function TaskCard({ task, highlight }: { task: Task; highlight?: boolean }) {
  const { getUserById } = useAppContext();
  const assignee = getUserById(task.assigneeId);
  const pCfg = priorityConfig[task.priority];
  const [showEdit, setShowEdit] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id, data: { task } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`task-card ${highlight ? "task-card-highlight" : ""}`}
        id={`task-${task.id}`}
      >
        {/* Tags row */}
        {task.tags.length > 0 && (
          <div className="task-tags">
            {task.tags.slice(0, 2).map((tag) => (<span key={tag} className="task-tag">{tag}</span>))}
          </div>
        )}

        <div className="task-card-title-row">
          <p className="task-card-title">{task.title}</p>
          <button
            className="task-edit-btn"
            onClick={(e) => { e.stopPropagation(); setShowEdit(true); }}
            title="Edit task"
          >
            <Pencil size={12} />
          </button>
        </div>
        <p className="task-card-desc">{task.description}</p>

        {/* Footer */}
        <div className="task-card-footer">
          <span className={`priority-badge ${pCfg.className}`}>
            <Flag size={10} />
            {pCfg.label}
          </span>
          <div className="task-card-meta">
            <span className="task-card-date">
              <Calendar size={12} />
              {new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
            {assignee && <span className="task-card-avatar" title={assignee.name}>{assignee.avatar}</span>}
          </div>
        </div>
      </div>

      {showEdit && <EditTaskModal task={task} onClose={() => setShowEdit(false)} />}
    </>
  );
}
