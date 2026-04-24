"use client";

import { ReactNode } from "react";
import { AppProvider } from "@/context/AppContext";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function ClientShell({ children }: { children: ReactNode }) {
  return (
    <AppProvider>
      <div className="app-layout">
        <Sidebar />
        <div className="main-wrapper">
          <Header />
          <main className="main-content">{children}</main>
        </div>
      </div>
    </AppProvider>
  );
}
