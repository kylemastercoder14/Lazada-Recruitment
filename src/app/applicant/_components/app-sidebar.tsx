"use client";

import * as React from "react";
import {
  BellDot,
  BookOpenCheck,
  BrainCog,
  CalendarCheck,
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
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import { ApplicantAccount, JobApplicant } from "@prisma/client";

interface ApplicantInterface extends ApplicantAccount {
  jobApplicant: JobApplicant;
}

const data = {
  navMain: [
    {
      title: "News & Announcements",
      url: "/applican/news-announcements",
      icon: Megaphone,
    },
    {
      title: "Video Training Sessions",
      url: "/applicant/video-training-sessions",
      icon: Video,
    },
    {
      title: "Interview Schedule",
      url: "/applicant/interview-schedule",
      icon: CalendarCheck,
    },
    {
      title: "Evaluation Status",
      url: "/applicant/evaluation-status",
      icon: BookOpenCheck,
    },
    {
      title: "Notifications",
      url: "/applicant/notifications",
      icon: BellDot,
    },
  ],
};

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: ApplicantInterface }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
