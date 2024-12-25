import { ChartSpline, MonitorCheck, Inbox, BookOpen, Cable } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Monitors",
    url: "app/[slug]/monitors",
    icon: MonitorCheck,
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: Inbox,
  },
  {
    title: "Status Page",
    url: "/status",
    icon: ChartSpline,
  },
  {
    title: "Docs",
    url: "/docs",
    icon: BookOpen,
  },
  {
    title: "API keys",
    url: "/apiKeys",
    icon: Cable,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>GlobalMS</SidebarGroupLabel>
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
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
