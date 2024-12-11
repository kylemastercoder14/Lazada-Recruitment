"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
// import { CellAction } from "./cell-action";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { CellAction } from "./cell-action";

export type ApplicationManagementColumn = {
  id: string;
  email: string;
  name: string;
  imageUrl: string;
  status: string;
  createdAt: string;
};

export const columns: ColumnDef<ApplicationManagementColumn>[] = [
  {
    accessorKey: "name",
    header: "Applicant",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.imageUrl ? (
          <Image
            src={row.original.imageUrl}
            alt="Image"
            width={40}
            height={40}
            className="object-cover rounded-md"
          />
        ) : (
          <Avatar className="w-10 h-10 object-cover rounded-md">
            <AvatarFallback className="rounded-md">
              {row.original.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        )}
        <div className="flex flex-col">
          <p className="font-semibold">{row.original.name}</p>
          <p className="text-muted-foreground text-sm">{row.original.email}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      let variant:
        | "default"
        | "secondary"
        | "outline"
        | "destructive"
        | "success"
        | null
        | undefined = "default";

      if (status === "Failed") {
        variant = "destructive";
      } else if (status === "Pending") {
        variant = "default";
      } else if (status === "Passed") {
        variant = "success";
      }

      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
