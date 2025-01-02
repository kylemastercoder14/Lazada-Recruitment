"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from './cell-action';
// import { CellAction } from "./cell-action";

export type ScheduleManagementColumn = {
  id: string;
  name: string;
  accountNumber: string;
  email: string;
  interviewDate: string;
};

export const columns: ColumnDef<ScheduleManagementColumn>[] = [
  {
    accessorKey: "name",
    header: "Applicant Name",
  },
  {
    accessorKey: "accountNumber",
    header: "Account Number",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "interviewDate",
    header: "Interview Date (suggested by the system)",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
