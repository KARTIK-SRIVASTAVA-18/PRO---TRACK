"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Task, TaskStatus } from "@/data/mockData";
import TaskCard from "./TaskCard";

const columnMeta: Record<TaskStatus, { title: string; dotClass: string; emptyText: string }> = {
  todo: { title: "To Do", dotClass: "dot-todo", emptyText: "No pending tasks" },
  "in-progress": { title: "In Progress", dotClass: "dot-progress", emptyText: "Nothing in progress" },
  done: { title: "Done", dotClass: "dot-done", emptyText: "No completed tasks" },
};

interface Props { status: TaskStatus; tasks: Task[]; highlightTaskId?: string | null; }

export default function KanbanColumn({ status, tasks, highlightTaskId }: Props) {
  const meta = columnMeta[status];
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div ref={setNodeRef} className={`kanban-column ${isOver ? "kanban-column-over" : ""}`} id={`column-${status}`}>
      <div className="kanban-column-header">
        <div className="kanban-column-title-row">
          <span className={`kanban-dot ${meta.dotClass}`} />
          <h3 className="kanban-column-title">{meta.title}</h3>
          <span className="kanban-count">{tasks.length}</span>
        </div>
      </div>
      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div className="kanban-cards">
          {tasks.length === 0 ? (
            <p className="kanban-empty">{meta.emptyText}</p>
          ) : (
            tasks.map((task) => <TaskCard key={task.id} task={task} highlight={highlightTaskId === task.id} />)
          )}
        </div>
      </SortableContext>
    </div>
  );
}
