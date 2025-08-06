
import React from 'react'
import { ArrowLeftRight,   LayoutDashboard,  Logs,   PackageSearch } from "lucide-react"
import { Sidebar, SidebarContent, SidebarGroup,  SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem,  SidebarSeparator } from './ui/sidebar'
import Link from 'next/link'
import Image from 'next/image'
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'

// Menu items.
const items = [
  {
    title: "Dashborad",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Inventory",
    url: "/inventory",
    icon: Logs,
  },
  {
    title: "Products",
    url: "/products",
    icon: PackageSearch,
  },
  // {
  //   title: "Site",
  //   url: "/order",
  //   icon: Users,
  // },
  {
    title: "Orders",
    url: "/sales",
    icon: ArrowLeftRight,
  },
]

const AppSidebar = () => {
  return (
    <div>
      <Sidebar collapsible='icon'>

          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href='/'>
                  <Image src="/Abby.png" alt="logo" width={80} height={60} />
                  </Link>
                  
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          <SidebarSeparator />

          <SidebarContent>
            <SidebarGroup>
            {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                    {item.title==="Inbox" &&(
                      <SidebarMenuBadge>12</SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          </SidebarContent>
      </Sidebar>
    </div>
  )
}

export default AppSidebar