// ── Types ────────────────────────────────────────────────────────────────

export type UserStatus = "active" | "out-on-leave" | "inactive";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "manager" | "developer" | "designer" | "qa";
  status: UserStatus;
}

export type TaskStatus = "todo" | "in-progress" | "done";
export type TaskPriority = "low" | "medium" | "high" | "critical";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: string;
  projectId: string;
  dueDate: string;
  createdAt: string;
  tags: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "on-hold";
  progress: number;
  startDate: string;
  endDate: string;
  teamMemberIds: string[];
  color: string;
}

// ── Mock Users ───────────────────────────────────────────────────────────

export const mockUsers: User[] = [
  { id: "u1", name: "Alex Morgan", email: "alex@protrack.io", avatar: "AM", role: "manager", status: "active" },
  { id: "u2", name: "Jamie Chen", email: "jamie@protrack.io", avatar: "JC", role: "developer", status: "active" },
  { id: "u3", name: "Priya Patel", email: "priya@protrack.io", avatar: "PP", role: "designer", status: "active" },
  { id: "u4", name: "Sam Rivera", email: "sam@protrack.io", avatar: "SR", role: "developer", status: "out-on-leave" },
  { id: "u5", name: "Taylor Kim", email: "taylor@protrack.io", avatar: "TK", role: "qa", status: "active" },
  { id: "u6", name: "Jordan Lee", email: "jordan@protrack.io", avatar: "JL", role: "developer", status: "active" },
];

// ── Mock Projects ────────────────────────────────────────────────────────

export const mockProjects: Project[] = [
  { id: "p1", name: "Website Redesign", description: "Complete overhaul of the company marketing website with modern design patterns.", status: "active", progress: 65, startDate: "2026-03-01", endDate: "2026-05-15", teamMemberIds: ["u1", "u2", "u3"], color: "#6366f1" },
  { id: "p2", name: "Mobile App v2", description: "Build the next major version of our flagship mobile application.", status: "active", progress: 40, startDate: "2026-03-15", endDate: "2026-06-30", teamMemberIds: ["u1", "u4", "u5"], color: "#06b6d4" },
  { id: "p3", name: "API Gateway", description: "Implement a centralized API gateway for microservices communication.", status: "active", progress: 82, startDate: "2026-02-10", endDate: "2026-04-30", teamMemberIds: ["u2", "u4", "u6"], color: "#f59e0b" },
  { id: "p4", name: "Analytics Dashboard", description: "Real-time analytics dashboard for business intelligence and reporting.", status: "on-hold", progress: 20, startDate: "2026-04-01", endDate: "2026-07-31", teamMemberIds: ["u3", "u5", "u6"], color: "#ec4899" },
];

// ── Mock Tasks ───────────────────────────────────────────────────────────

export const mockTasks: Task[] = [
  { id: "t1", title: "Design new landing page", description: "Create a high-fidelity mockup of the new landing page.", status: "done", priority: "high", assigneeId: "u3", projectId: "p1", dueDate: "2026-04-20", createdAt: "2026-03-05", tags: ["design", "ui"] },
  { id: "t2", title: "Implement responsive navigation", description: "Build the responsive navigation bar with hamburger menu.", status: "in-progress", priority: "high", assigneeId: "u2", projectId: "p1", dueDate: "2026-04-25", createdAt: "2026-03-10", tags: ["frontend", "responsive"] },
  { id: "t3", title: "Set up CI/CD pipeline", description: "Configure GitHub Actions for automated testing and deployment.", status: "todo", priority: "medium", assigneeId: "u2", projectId: "p1", dueDate: "2026-04-28", createdAt: "2026-03-12", tags: ["devops"] },
  { id: "t4", title: "Write unit tests for header", description: "Add Jest + React Testing Library tests for the header.", status: "todo", priority: "low", assigneeId: "u5", projectId: "p1", dueDate: "2026-04-30", createdAt: "2026-03-14", tags: ["testing"] },
  { id: "t5", title: "Auth flow with biometrics", description: "Implement fingerprint / FaceID authentication.", status: "in-progress", priority: "critical", assigneeId: "u4", projectId: "p2", dueDate: "2026-04-24", createdAt: "2026-03-16", tags: ["mobile", "security"] },
  { id: "t6", title: "Push notification service", description: "Integrate Firebase Cloud Messaging for push notifications.", status: "todo", priority: "high", assigneeId: "u4", projectId: "p2", dueDate: "2026-05-01", createdAt: "2026-03-18", tags: ["mobile", "backend"] },
  { id: "t7", title: "App store screenshots", description: "Prepare marketing screenshots for App Store and Play Store.", status: "todo", priority: "low", assigneeId: "u3", projectId: "p2", dueDate: "2026-06-15", createdAt: "2026-03-20", tags: ["design", "marketing"] },
  { id: "t8", title: "Rate limiting middleware", description: "Add token-bucket rate limiting to the gateway.", status: "done", priority: "critical", assigneeId: "u6", projectId: "p3", dueDate: "2026-04-10", createdAt: "2026-02-15", tags: ["backend", "security"] },
  { id: "t9", title: "Service discovery integration", description: "Integrate Consul for automatic service discovery.", status: "in-progress", priority: "high", assigneeId: "u2", projectId: "p3", dueDate: "2026-04-26", createdAt: "2026-02-20", tags: ["backend", "infrastructure"] },
  { id: "t10", title: "Load testing", description: "Run k6 load tests and document performance benchmarks.", status: "todo", priority: "medium", assigneeId: "u5", projectId: "p3", dueDate: "2026-04-28", createdAt: "2026-02-22", tags: ["testing", "devops"] },
  { id: "t11", title: "Design data viz components", description: "Create reusable chart components (line, bar, pie) for the dashboard.", status: "in-progress", priority: "high", assigneeId: "u3", projectId: "p4", dueDate: "2026-05-05", createdAt: "2026-04-02", tags: ["design", "frontend"] },
  { id: "t12", title: "Connect real-time data feed", description: "Set up WebSocket connection for live data streaming.", status: "todo", priority: "critical", assigneeId: "u6", projectId: "p4", dueDate: "2026-05-10", createdAt: "2026-04-05", tags: ["backend", "realtime"] },
];
