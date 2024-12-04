'use client'
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
          <SidebarTrigger className="-ml-1" />
            {children}
          </SidebarInset>
        </SidebarProvider>
      )
}