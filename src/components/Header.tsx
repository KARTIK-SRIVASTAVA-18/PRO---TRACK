"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Bell, Plus, X, Calendar, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import AddProjectModal from "@/components/modals/AddProjectModal";

export default function Header() {
  const router = useRouter();
  const { searchResults, getUpcomingDeadlines, getProjectById, getUserById } = useAppContext();
  const [showProjectModal, setShowProjectModal] = useState(false);

  // Search
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const results = searchResults(query);
  const hasResults = results.projects.length > 0 || results.tasks.length > 0;

  // Notifications
  const [showNotifs, setShowNotifs] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const deadlines = getUpcomingDeadlines();

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowSearch(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifs(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      <header className="app-header">
        {/* Search */}
        <div className="header-search" ref={searchRef}>
          <Search size={16} className="header-search-icon" />
          <input
            id="global-search"
            type="text"
            placeholder="Search projects & tasks…"
            className="header-search-input"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setShowSearch(true); }}
            onFocus={() => setShowSearch(true)}
          />
          {query && (
            <button className="header-search-clear" onClick={() => { setQuery(""); setShowSearch(false); }}>
              <X size={14} />
            </button>
          )}

          {showSearch && query.trim() && (
            <div className="search-dropdown">
              {!hasResults && <p className="search-empty">No results found</p>}
              {results.projects.length > 0 && (
                <div className="search-section">
                  <p className="search-section-label">Projects</p>
                  {results.projects.map((p) => (
                    <button key={p.id} className="search-item" onClick={() => { router.push(`/projects/${p.id}`); setShowSearch(false); setQuery(""); }}>
                      <span className="project-dot" style={{ background: p.color }} />
                      <span>{p.name}</span>
                      <ArrowRight size={14} className="search-item-arrow" />
                    </button>
                  ))}
                </div>
              )}
              {results.tasks.length > 0 && (
                <div className="search-section">
                  <p className="search-section-label">Tasks</p>
                  {results.tasks.map((t) => {
                    const proj = getProjectById(t.projectId);
                    return (
                      <button key={t.id} className="search-item" onClick={() => { router.push(`/projects/${t.projectId}?task=${t.id}`); setShowSearch(false); setQuery(""); }}>
                        <span className="search-item-text">
                          <span>{t.title}</span>
                          {proj && <span className="search-item-sub">{proj.name}</span>}
                        </span>
                        <ArrowRight size={14} className="search-item-arrow" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right actions */}
        <div className="header-actions">
          <button className="btn-primary" onClick={() => setShowProjectModal(true)} id="add-project-btn">
            <Plus size={16} />
            <span>New Project</span>
          </button>

          {/* Notifications */}
          <div ref={notifRef} style={{ position: "relative" }}>
            <button className="header-icon-btn" id="notifications-btn" onClick={() => setShowNotifs(!showNotifs)}>
              <Bell size={18} />
              {deadlines.length > 0 && <span className="header-notification-dot" />}
            </button>

            {showNotifs && (
              <div className="notif-dropdown">
                <p className="notif-header">Upcoming Deadlines</p>
                {deadlines.length === 0 && <p className="notif-empty">No upcoming deadlines 🎉</p>}
                {deadlines.map((t) => {
                  const assignee = getUserById(t.assigneeId);
                  const proj = getProjectById(t.projectId);
                  const isOverdue = new Date(t.dueDate) < new Date();
                  return (
                    <button
                      key={t.id}
                      className="notif-item"
                      onClick={() => { router.push(`/projects/${t.projectId}?task=${t.id}`); setShowNotifs(false); }}
                    >
                      <div className="notif-item-left">
                        <Calendar size={14} className={isOverdue ? "notif-overdue" : "notif-upcoming"} />
                      </div>
                      <div className="notif-item-body">
                        <span className="notif-item-title">{t.title}</span>
                        <span className="notif-item-meta">
                          {proj?.name} · {assignee?.name} ·{" "}
                          <span className={isOverdue ? "notif-overdue" : ""}>
                            {isOverdue ? "Overdue" : `Due ${new Date(t.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
                          </span>
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="header-avatar" id="user-avatar">AM</div>
        </div>
      </header>

      {showProjectModal && <AddProjectModal onClose={() => setShowProjectModal(false)} />}
    </>
  );
}
