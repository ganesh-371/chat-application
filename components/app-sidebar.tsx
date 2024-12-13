"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Suspense, useEffect, useState } from "react"

const data = {
  
  user: {
    name: typeof window !== 'undefined' && localStorage ? localStorage.getItem('fullname') || 'fullname' : 'fullname',
    email: typeof window !== 'undefined' && localStorage ? localStorage.getItem('username') || 'emailname' : 'emailname',
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/dashboard/Home",
      icon: SquareTerminal,
      isActive: true,
      // items: [
      //   {
      //     title: "History",
      //     url: "#",
      //   },
      //   {
      //     title: "Starred",
      //     url: "#",
      //   },
      //   {
      //     title: "Settings",
      //     url: "#",
      //   },
      // ],
    },
    {
      title: "Chat",
      url: "/dashboard/Chat",
      icon: Bot,
      // items: [
      //   {
      //     title: "Genesis",
      //     url: "#",
      //   },
      //   {
      //     title: "Explorer",
      //     url: "#",
      //   },
      //   {
      //     title: "Quantum",
      //     url: "#",
      //   },
      // ],
    },
    {
      title: "Upload",
      url: "/dashboard/Upload",
      icon: BookOpen,
      // items: [
      //   {
      //     title: "Introduction",
      //     url: "#",
      //   },
      //   {
      //     title: "Get Started",
      //     url: "#",
      //   },
      //   {
      //     title: "Tutorials",
      //     url: "#",
      //   },
      //   {
      //     title: "Changelog",
      //     url: "#",
      //   },
      // ],
    },
    {
      title: "Support",
      url: "/dashboard/Support",
      icon: Settings2,
      // items: [
      //   {
      //     title: "General",
      //     url: "#",
      //   },
      //   {
      //     title: "Team",
      //     url: "#",
      //   },
      //   {
      //     title: "Billing",
      //     url: "#",
      //   },
      //   {
      //     title: "Limits",
      //     url: "#",
      //   },
      // ],
    },
    {
      title:"Script",
      url:"/dashboard/Script",
      icon:Bot,
    }
  ],
  navSecondary: [
    // {
    //   title: "Support",
    //   url: "#",
    //   icon: LifeBuoy,
    // },
    // {
    //   title: "Feedback",
    //   url: "#",
    //   icon: Send,
    // },
  ],
  projects: [
    // {
    //   name: "Design Engineering",
    //   url: "#",
    //   icon: Frame,
    // },
    // {
    //   name: "Sales & Marketing",
    //   url: "#",
    //   icon: PieChart,
    // },
    // {
    //   name: "Travel",
    //   url: "#",
    //   icon: Map,
    // },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  
  const [website, setWebsite] = useState<String | null>("")
  const [profileName , setProfileName]=useState<String | null>("")

  useEffect(() => {
    if(typeof window !== undefined && localStorage) {
      setWebsite(localStorage.getItem('domain') || null)
      setProfileName(localStorage.getItem('fullname')|| null)
      

    }
  }, [website,profileName])
    // Add localStorage safety checks
    // const website = typeof window !== 'undefined' && localStorage ? localStorage.getItem('domain') || '' : '';
    const domainName = website ? website.split('.')[1] : '';
    // const domainName = "App Domain Name";
  
    // const fullname = typeof window !== 'undefined' && localStorage ? localStorage.getItem('fullname') || '' : '';
    const Full_name = profileName ? profileName.charAt(0).toUpperCase() + profileName.slice(1) : '';
    // const Full_name = "App Full Name";


    // // Check if user is logged in - only run in browser
    // if (typeof window !== 'undefined' && !profileName) {
    //   alert("Please log in first."); // Show pop-up message
    //   window.location.href = "/login"; // Redirect to login page
    //   return null; // Prevent rendering the component
    // }


  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />                               
                </div>
                <Suspense>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{domainName !== "" ? domainName : "Domain"}</span>
                  <span className="truncate text-xs">{Full_name}</span>
                </div>
                </Suspense>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
