"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { Task, TaskPriority, TaskStatus } from "@/data/mockData";

interface Props { task: Task; onClose: () => void; }

export default function EditTaskModal({ task, onClose }: Props) {
  const { updateTask, users, projects } = useAppContext();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [assigneeId, setAssigneeId] = useState(task.assigneeId);
  const [projectId, setProjectId] = useState(task.projectId);
  const [priority, setPriority] = useState<TaskPriority>(task.priority);
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [dueDate, setDueDate] = useState(task.dueDate);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    updateTask(task.id, { title: title.trim(), description: description.trim(), assigneeId, projectId, priority, status, dueDate });
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Edit Task</h2>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="edit-task-title">Title *</label>
            <input id="edit-task-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="edit-task-desc">Description</label>
            <textarea id="edit-task-desc" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edit-task-project">Project</label>
              <select id="edit-task-project" value={projectId} onChange={(e) => setProjectId(e.target.value)}>
                {projects.map((p) => (<option key={p.id} value={p.id}>{p.name}</option>))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="edit-task-assignee">Assignee</label>
              <select id="edit-task-assignee" value={assigneeId} onChange={(e) => setAssigneeId(e.target.value)}>
                {users.map((u) => (<option key={u.id} value={u.id}>{u.name}</option>))}
              </select>
            </div>
          </div>
          <div className="form-row form-row-3">
            <div className="form-group">
              <label htmlFor="edit-task-priority">Priority</label>
              <select id="edit-task-priority" value={priority} onChange={(e) => setPriority(e.target.value as TaskPriority)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="edit-task-status">Status</label>
              <select id="edit-task-status" value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)}>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="edit-task-due">Due Date</label>
              <input id="edit-task-due" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}
