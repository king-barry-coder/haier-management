import React from "react";
import Navbar from "@/components/Navbar";
import AppSidebar from "@/components/AppSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { ThemeProvider } from "@/providers/ThemeProviders";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const defaultOpen = (await cookieStore).get("sidebar_state")?.value === "true";

  return (
    <ThemeProvider  attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className="w-full">
        <Navbar />
        <div className="px-4">{children}</div>
      </main>
    </SidebarProvider></ThemeProvider>
  );
}
