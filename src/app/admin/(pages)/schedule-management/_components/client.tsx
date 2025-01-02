"use client";

import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { ScheduleManagementColumn, columns } from "./column";

interface ScheduleManagementClientProps {
  data: ScheduleManagementColumn[];
}

const ScheduleManagementClient: React.FC<ScheduleManagementClientProps> = ({ data }) => {
  return (
    <>
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};

export default ScheduleManagementClient;
