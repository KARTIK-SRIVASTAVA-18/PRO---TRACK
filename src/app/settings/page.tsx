"use client";

import { Settings as SettingsIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <div>
      <h1 className="dashboard-title">Settings</h1>
      <p className="dashboard-subtitle">Manage your workspace preferences.</p>

      <div className="project-table-wrapper" style={{ padding: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div
            style={{
              width: 44, height: 44, borderRadius: 10,
              background: "linear-gradient(135deg, var(--accent), #a78bfa)",
              display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
            }}
          >
            <SettingsIcon size={22} />
          </div>
          <div>
            <p style={{ fontWeight: 600, fontSize: 16 }}>Workspace Settings</p>
            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
              Configure notifications, integrations, and display preferences.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {[
            { label: "Dark Mode", desc: "Use dark color theme across the app", enabled: true },
            { label: "Email Notifications", desc: "Receive email alerts for task assignments", enabled: true },
            { label: "Desktop Notifications", desc: "Show browser notifications for updates", enabled: false },
          ].map((setting) => (
            <div
              key={setting.label}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "16px 0", borderBottom: "1px solid var(--border-color)",
              }}
            >
              <div>
                <p style={{ fontWeight: 600, fontSize: 14 }}>{setting.label}</p>
                <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{setting.desc}</p>
              </div>
              <div
                style={{
                  width: 44, height: 24, borderRadius: 12, cursor: "pointer",
                  background: setting.enabled ? "var(--accent)" : "rgba(255,255,255,0.1)",
                  position: "relative", transition: "background 0.2s",
                }}
              >
                <div
                  style={{
                    width: 18, height: 18, borderRadius: "50%", background: "#fff",
                    position: "absolute", top: 3,
                    left: setting.enabled ? 23 : 3,
                    transition: "left 0.2s",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
