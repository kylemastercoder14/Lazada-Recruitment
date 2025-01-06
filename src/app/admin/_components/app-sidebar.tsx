"use client";

import * as React from "react";
import {
  BrainCog,
  CalendarCheck,
  ChartArea,
  ChartPie,
  ClipboardPlus,
  Megaphone,
  SquareTerminal,
  TableOfContents,
  UserCog,
  Video,
  WashingMachine,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";

// This is sample data.
const data = {
  user: {
    name: "Lazada Administrator",
    email: "LazadaLogisticsPh",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Application Management",
      url: "/admin/application-management",
      icon: SquareTerminal,
    },
    {
      title: "Video Trainings",
      url: "/admin/video-trainings",
      icon: Video,
    },
    {
      title: "Queuing Interview",
      url: "/admin/queuing-interview",
      icon: TableOfContents,
    },
    {
      title: "Schedule Management",
      url: "/admin/schedule-management",
      icon: CalendarCheck,
    },
    {
      title: "Questionnaire Creation",
      url: "/admin/questionnaire-creation",
      icon: ClipboardPlus,
    },
    {
      title: "Onsite Training Creation",
      url: "/admin/on-sight-creation",
      icon: WashingMachine,
    },
  ],
  projects: [
    {
      title: "Job Applicants Management",
      url: "/admin/evaluations",
      icon: BrainCog,
    },
    {
      title: "News & Announcements",
      url: "/admin/news-announcements",
      icon: Megaphone,
    },
    {
      title: "System Administration",
      url: "/admin/system-administration",
      icon: UserCog,
    },
    {
      title: "Report Generations",
      url: "/admin/system-administration",
      icon: ChartPie,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects items={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
