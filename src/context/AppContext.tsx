"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { Task, TaskStatus, TaskPriority, Project, User, UserStatus, mockTasks, mockProjects, mockUsers } from "@/data/mockData";

// ── Context shape ────────────────────────────────────────────────────────

interface AppContextType {
  tasks: Task[];
  projects: Project[];
  users: User[];
  // Task operations
  updateTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  addTask: (task: Task) => void;
  getProjectTasks: (projectId: string) => Task[];
  // Project operations
  addProject: (project: Project) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  toggleProjectHoldActive: (projectId: string) => void;
  // User operations
  addUser: (user: User) => void;
  updateUserStatus: (userId: string, status: UserStatus) => void;
  // Lookups
  getUserById: (userId: string) => User | undefined;
  getProjectById: (projectId: string) => Project | undefined;
  // Search
  searchResults: (query: string) => { projects: Project[]; tasks: Task[] };
  // Notifications
  getUpcomingDeadlines: () => Task[];
  // Dashboard helpers
  getCriticalIssues: () => Task[];
  getTasksDueToday: () => Task[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// ── Provider ─────────────────────────────────────────────────────────────

export function AppProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [users, setUsers] = useState<User[]>(mockUsers);

  // ── Auto-update project progress and status when tasks change ──
  useEffect(() => {
    setProjects((prev) =>
      prev.map((p) => {
        const projectTasks = tasks.filter((t) => t.projectId === p.id);
        if (projectTasks.length === 0) return p;
        const doneTasks = projectTasks.filter((t) => t.status === "done");
        const progress = Math.round((doneTasks.length / projectTasks.length) * 100);
        const allDone = doneTasks.length === projectTasks.length;
        return {
          ...p,
          progress,
          status: allDone ? "completed" : p.status === "completed" && !allDone ? "active" : p.status,
        };
      })
    );
  }, [tasks]);

  // ── Task operations ──
  const updateTaskStatus = useCallback((taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));
  }, []);

  const updateTask = useCallback((taskId: string, updates: Partial<Task>) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, ...updates } : t)));
  }, []);

  const addTask = useCallback((task: Task) => {
    setTasks((prev) => [...prev, task]);
  }, []);

  const getProjectTasks = useCallback(
    (projectId: string) => tasks.filter((t) => t.projectId === projectId),
    [tasks]
  );

  // ── Project operations ──
  const addProject = useCallback((project: Project) => {
    setProjects((prev) => [...prev, project]);
  }, []);

  const updateProject = useCallback((projectId: string, updates: Partial<Project>) => {
    setProjects((prev) => prev.map((p) => (p.id === projectId ? { ...p, ...updates } : p)));
  }, []);

  const toggleProjectHoldActive = useCallback((projectId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        if (p.status === "completed") return p;
        return { ...p, status: p.status === "on-hold" ? "active" : "on-hold" };
      })
    );
  }, []);

  // ── User operations ──
  const addUser = useCallback((user: User) => {
    setUsers((prev) => [...prev, user]);
  }, []);

  const updateUserStatus = useCallback((userId: string, status: UserStatus) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, status } : u)));
  }, []);

  // ── Lookups ──
  const getUserById = useCallback((userId: string) => users.find((u) => u.id === userId), [users]);
  const getProjectById = useCallback((projectId: string) => projects.find((p) => p.id === projectId), [projects]);

  // ── Search ──
  const searchResults = useCallback(
    (query: string) => {
      const q = query.toLowerCase().trim();
      if (!q) return { projects: [], tasks: [] };
      return {
        projects: projects.filter((p) => p.name.toLowerCase().includes(q)),
        tasks: tasks.filter((t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)),
      };
    },
    [projects, tasks]
  );

  // ── Notifications: tasks due within 3 days ──
  const getUpcomingDeadlines = useCallback(() => {
    const now = new Date();
    const threeDays = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    return tasks
      .filter((t) => t.status !== "done" && new Date(t.dueDate) <= threeDays)
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }, [tasks]);

  // ── Dashboard helpers ──
  const getCriticalIssues = useCallback(() => {
    const outUserIds = users.filter((u) => u.status === "out-on-leave").map((u) => u.id);
    return tasks.filter((t) => t.status !== "done" && outUserIds.includes(t.assigneeId));
  }, [tasks, users]);

  const getTasksDueToday = useCallback(() => {
    const today = new Date().toISOString().slice(0, 10);
    return tasks.filter((t) => t.dueDate <= today && t.status !== "done");
  }, [tasks]);

  return (
    <AppContext.Provider
      value={{
        tasks, projects, users,
        updateTaskStatus, updateTask, addTask, getProjectTasks,
        addProject, updateProject, toggleProjectHoldActive,
        addUser, updateUserStatus,
        getUserById, getProjectById,
        searchResults, getUpcomingDeadlines, getCriticalIssues, getTasksDueToday,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used inside <AppProvider>");
  return ctx;
}
