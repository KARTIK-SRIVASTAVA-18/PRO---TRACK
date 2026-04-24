# ⚡ ProTrack — Project Management Dashboard

A modern, full-featured project management tool built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**. ProTrack provides Kanban boards with drag-and-drop, real-time task tracking, team management, and an intuitive dark-mode interface.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🚀 Features

### Dashboard
- **Summary Cards** — Active Projects, Tasks Due Today, Critical Issues (auto-updating counts)
- **Clickable Navigation** — Each card links to its filtered view
- **Projects Table** — Progress bars, status badges, and end dates at a glance

### Kanban Board
- **Drag & Drop** — Move tasks between To Do, In Progress, and Done columns using `@dnd-kit`
- **Real-time Progress** — Project progress bar auto-updates as tasks are completed
- **Task Highlighting** — Navigate to a specific task via URL and it pulses with a highlight animation

### Task Management
- **Full CRUD** — Create, read, update all task fields (title, description, status, priority, assignee, due date)
- **Inline Edit** — Hover over any task card to reveal the edit button
- **Filtered Views** — Tasks Due Today and Critical Issues pages with sortable tables

### Projects
- **Create Projects** — Name, description, color, end date, and team member assignment
- **Hold / Active Toggle** — Switch projects between active and on-hold status
- **Auto-Complete** — Projects automatically marked "Complete" when all tasks are done
- **Progress Tracking** — Visual progress bar calculated from task completion

### Team Management
- **Member Profiles** — Total, Ongoing, and Completed task counts per member
- **Expandable Task Lists** — Click a count to expand and see the tasks, click a task to navigate to it
- **Status Management** — Set members as Active, Out on Leave, or Inactive
- **Add Members** — Add new team members with role and status assignment
- **Critical Issues Detection** — Tasks assigned to "Out on Leave" members are flagged as critical

### Search & Notifications
- **Global Search** — Find projects by name and tasks by title across the entire app
- **Notification Bell** — Shows upcoming deadlines (within 3 days), click to navigate directly to the task
- **Overdue Indicators** — Visual flags for overdue tasks throughout the app

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 4 + Custom CSS Variables |
| **Drag & Drop** | @dnd-kit/core, @dnd-kit/sortable |
| **Icons** | Lucide React |
| **Animation** | Framer Motion (available), CSS Keyframes |
| **Charts** | Recharts (available) |
| **State** | React Context API |

---

## 📁 Project Structure

```
protrack/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── page.tsx                  # Dashboard (home)
│   │   ├── layout.tsx                # Root layout with metadata
│   │   ├── globals.css               # Complete design system
│   │   ├── projects/
│   │   │   ├── page.tsx              # Projects listing with toggles
│   │   │   └── [id]/page.tsx         # Kanban board per project
│   │   ├── tasks/page.tsx            # Filtered task list view
│   │   ├── team/page.tsx             # Team members & assignments
│   │   └── settings/page.tsx         # Workspace settings
│   ├── components/
│   │   ├── ClientShell.tsx           # Client layout (sidebar + header + provider)
│   │   ├── Sidebar.tsx               # Navigation sidebar
│   │   ├── Header.tsx                # Header with search & notifications
│   │   ├── TaskCard.tsx              # Draggable task card
│   │   ├── KanbanColumn.tsx          # Droppable kanban column
│   │   └── modals/
│   │       ├── AddTaskModal.tsx      # Create task form
│   │       ├── EditTaskModal.tsx     # Edit task form
│   │       ├── AddProjectModal.tsx   # Create project form
│   │       └── AddMemberModal.tsx    # Add team member form
│   ├── context/
│   │   └── AppContext.tsx            # Global state management
│   └── data/
│       └── mockData.ts              # TypeScript interfaces & mock data
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later

### Installation

```bash
# Clone the repository
git clone https://github.com/KARTIK-SRIVASTAVA-18/PRO---TRACK.git
cd PRO---TRACK

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 🧪 Testing Checklist

| # | Test Case | Steps |
|---|-----------|-------|
| 1 | Dashboard loads | Open `/` → verify 3 stat cards + projects table |
| 2 | Stat card navigation | Click "Active Projects" → redirects to filtered projects |
| 3 | Kanban drag & drop | Go to a project → drag a task from "To Do" to "In Progress" |
| 4 | Progress auto-update | Move all tasks to "Done" → project shows 100% and "Complete" |
| 5 | Create task | Click "Add Task" on Kanban → fill form → task appears in column |
| 6 | Edit task | Hover task card → click pencil → change fields → save |
| 7 | Create project | Click "New Project" in header → fill form → appears on projects page |
| 8 | Hold/Active toggle | On projects page → click "Hold" → status changes to "On Hold" |
| 9 | Search | Type in search bar → projects and tasks appear → click to navigate |
| 10 | Notifications | Click bell → see upcoming deadlines → click to navigate to task |
| 11 | Team member status | Go to Team → change a member to "Out on Leave" → Critical Issues count updates |
| 12 | Add member | Click "Add Member" → fill form → new member appears |
| 13 | Team task drill-down | Click a task count → tasks expand → click a task → navigates to Kanban |

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Click **Deploy** — Vercel auto-detects Next.js and builds it
4. Get your live URL to share with stakeholders

### Other Platforms

ProTrack is a standard Next.js app and can be deployed on any platform that supports Node.js:
- **Netlify** — via `@netlify/plugin-nextjs`
- **Railway** / **Render** — via `npm run build && npm start`
- **Docker** — use the official Next.js Dockerfile

---

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">
  Built with ❤️ using Next.js, TypeScript & Tailwind CSS
</p>
