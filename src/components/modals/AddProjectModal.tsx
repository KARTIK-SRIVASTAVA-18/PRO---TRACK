"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const projectColors = ["#6366f1", "#06b6d4", "#f59e0b", "#ec4899", "#22c55e", "#ef4444", "#a78bfa", "#14b8a6"];

interface Props { onClose: () => void; }

export default function AddProjectModal({ onClose }: Props) {
  const { addProject, users } = useAppContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [color, setColor] = useState(projectColors[0]);

  function toggleMember(id: string) {
    setSelectedMembers((prev) => prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    addProject({
      id: `p${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      status: "active",
      progress: 0,
      startDate: new Date().toISOString().slice(0, 10),
      endDate: endDate || new Date().toISOString().slice(0, 10),
      teamMemberIds: selectedMembers,
      color,
    });
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Create New Project</h2>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="project-name">Project Name *</label>
            <input id="project-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Landing Page Revamp" required />
          </div>
          <div className="form-group">
            <label htmlFor="project-desc">Description</label>
            <textarea id="project-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What is this project about?" rows={3} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="project-end">Target End Date</label>
              <input id="project-end" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Project Color</label>
              <div className="color-picker-row">
                {projectColors.map((c) => (
                  <button key={c} type="button" className={`color-swatch ${color === c ? "selected" : ""}`} style={{ background: c }} onClick={() => setColor(c)} />
                ))}
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Team Members</label>
            <div className="member-picker">
              {users.filter((u) => u.status !== "inactive").map((u) => (
                <button key={u.id} type="button" className={`member-chip ${selectedMembers.includes(u.id) ? "selected" : ""}`} onClick={() => toggleMember(u.id)}>
                  <span className="member-chip-avatar">{u.avatar}</span>
                  <span>{u.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary" id="save-project-btn">Create Project</button>
          </div>
        </form>
      </div>
    </div>
  );
}
