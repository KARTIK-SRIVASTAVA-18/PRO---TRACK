"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { UserStatus } from "@/data/mockData";

interface Props { onClose: () => void; }

const roles = ["developer", "designer", "qa", "manager"] as const;

export default function AddMemberModal({ onClose }: Props) {
  const { addUser } = useAppContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<typeof roles[number]>("developer");
  const [status, setStatus] = useState<UserStatus>("active");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    const parts = name.trim().split(" ");
    const avatar = (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
    addUser({
      id: `u${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      avatar,
      role,
      status,
    });
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Add Team Member</h2>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="member-name">Full Name *</label>
              <input id="member-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required />
            </div>
            <div className="form-group">
              <label htmlFor="member-email">Email *</label>
              <input id="member-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@protrack.io" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="member-role">Role</label>
              <select id="member-role" value={role} onChange={(e) => setRole(e.target.value as typeof roles[number])}>
                {roles.map((r) => (<option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="member-status">Status</label>
              <select id="member-status" value={status} onChange={(e) => setStatus(e.target.value as UserStatus)}>
                <option value="active">Active</option>
                <option value="out-on-leave">Out on Leave</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Add Member</button>
          </div>
        </form>
      </div>
    </div>
  );
}
