"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { InterviewButton } from "./interview-button";
import { TrainingButton } from "./training-button";
import { SendEmailButton } from "./send-email-button";

export type EvaluationsWatchedColumn = {
  id: string;
  name: string;
  email: string;
  accountNumber: string;
  video: string;
  status: string;
  createdAt: string;
};

export type EvaluationsInterviewedColumn = {
  id: string;
  name: string;
  email: string;
  accountNumber: string;
  status: string;
  createdAt: string;
  questionnaireId: string;
};

export type EvaluationsOnsiteColumn = {
  id: string;
  name: string;
  email: string;
  accountNumber: string;
  status: string;
  createdAt: string;
};

export type EvaluationsOverallColumn = {
  id: string;
  name: string;
  email: string;
  role: string;
  accountNumber: string;
  jobRegistrationStatus: string;
  trainingStatus: string;
  trainingScore: string;
  interviewStatus: string;
  overallStatus: string;
  createdAt: string;
};

export const columns1: ColumnDef<EvaluationsWatchedColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "accountNumber",
    header: "Account Number",
  },
  {
    accessorKey: "video",
    header: "Video Title",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={row.original.status === "Watched" ? "success" : "destructive"}
      >
        {row.original.status}
      </Badge>
    ),
  },
];

export const columns2: ColumnDef<EvaluationsInterviewedColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "accountNumber",
    header: "Account Number",
  },
  {
    accessorKey: "status",
    header: " Status",
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.status === "Pending"
            ? "default"
            : row.original.status === "Failed"
              ? "destructive"
              : "success"
        }
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <InterviewButton data={row.original} />,
  },
];

export const columns3: ColumnDef<EvaluationsOnsiteColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "accountNumber",
    header: "Account Number",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.status === "Not Evaluated"
            ? "default"
            : row.original.status === "Failed"
              ? "destructive"
              : "success"
        }
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <TrainingButton data={row.original} />,
  },
];

export const columns4: ColumnDef<EvaluationsOverallColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "jobRegistrationStatus",
    header: "Job Registration Status",
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.jobRegistrationStatus === "Pending"
            ? "default"
            : row.original.jobRegistrationStatus === "Failed"
              ? "destructive"
              : "success"
        }
      >
        {row.original.jobRegistrationStatus}
      </Badge>
    ),
  },
  {
    accessorKey: "trainingStatus",
    header: "Practical Training Status",
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.trainingStatus === "Pending"
            ? "default"
            : row.original.trainingStatus === "Failed"
              ? "destructive"
              : "success"
        }
      >
        {row.original.trainingStatus}
      </Badge>
    ),
  },
  {
    accessorKey: "interviewStatus",
    header: "Digital Interview Status",
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.interviewStatus === "Pending"
            ? "default"
            : row.original.interviewStatus === "Failed"
              ? "destructive"
              : "success"
        }
      >
        {row.original.interviewStatus}
      </Badge>
    ),
  },
  {
    accessorKey: "overallStatus",
    header: "Overall Status",
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.overallStatus === "Pending"
            ? "default"
            : row.original.overallStatus === "Failed"
              ? "destructive"
              : "success"
        }
      >
        {row.original.overallStatus}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <SendEmailButton data={row.original} />,
  },
];
