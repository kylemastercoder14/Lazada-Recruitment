"use client";

import { ColumnDef } from "@tanstack/react-table";
// import { CellAction } from "./cell-action";
import { CellAction } from "./cell-action";

export type QuestionnaireCreationColumn = {
  id: string;
  title: string;
  description: string;
  howManyQuestions: number;
  createdAt: string;
};

export const columns: ColumnDef<QuestionnaireCreationColumn>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="w-64 truncate" title={row.original.description}>
        {row.original.description}
      </div>
    ),
  },
  {
    accessorKey: "howManyQuestions",
    header: "Questions",
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
