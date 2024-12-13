"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import { logout } from "@/utils/APICalls"
import { Suspense, useEffect, useState } from "react"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {

  const [fullName, setFullName] = useState<String | null>("")
  const [domain, setDomain] = useState<String | null>("")
  const [displayEmail, setDisplayEmail] = useState<string | null>(null);

  useEffect(() => {
    if(typeof window !== undefined && localStorage) {
      setFullName(localStorage.getItem('fullname') || null)
      setDomain(localStorage.getItem('domain')|| null)
      const storedEmail = localStorage.getItem('username');
      setDisplayEmail(storedEmail || user.email);

    }
  }, [fullName,domain,displayEmail])

  const { isMobile } = useSidebar()
  // const fullname = typeof window !== 'undefined' && localStorage 
  //   ? localStorage.getItem('fullname') || null
  //   : null;
  // const Full_name = fullname !== null ? fullname.charAt(0).toUpperCase() : 'Sample Name';
  // const Full_name = "Nav Full Name";
  // const Full_name = fullname ? fullname.split("").map((n) => String(n[0]).toUpperCase()).join(""): "";

  // const domain = typeof window !== 'undefined' && localStorage 
  //   ? localStorage.getItem('domain') || ''
  //   : '';
  const Full_name = fullName 
  ? fullName.toString().split(" ").map(n => n[0].toUpperCase()).join("")
  : "UN";


  const handleLogout = async () => {
    try {
      // Call the API with the user's email as the domain
      const logoutDomain = domain?.toString() ?? "";
      const response = await logout(logoutDomain);

      if (response.status === 1) {
        // Logout successful
        console.log(response.message);
        if (typeof window !== 'undefined' && localStorage) {
          localStorage.removeItem("auth");
          localStorage.removeItem("fullname"); 
          localStorage.removeItem("domain");
          localStorage.removeItem("username");
          localStorage.removeItem("isAuthenticated")
        }
        window.location.href = "/login"; // Redirect to login
      } else {
        // Handle unexpected statuses
        console.error("Failed to log out:", response.message);
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Suspense>
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="rounded-lg">{Full_name}</AvatarFallback>
              </Avatar>
              </Suspense>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <p className="truncate font-semibold">{fullName !== null ? fullName : ""}</p>
                <span className="truncate text-xs">{displayEmail !==null? displayEmail:""}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="rounded-lg">{Full_name !== null ? Full_name : ""}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{fullName !== null ? fullName : ""}</span>
                  <span className="truncate text-xs">{displayEmail !==null? displayEmail:""}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup> */}
            <DropdownMenuSeparator />
            {/* <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              <Button onClick={ 
                // const email = localStorage.getItem("email");
                // localStorage.removeItem("auth");
                // window.location.href = "/login";
                handleLogout
              }>Log Out</Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
