import Heading from "@/components/ui/heading";
import db from "@/lib/db";
import { format } from "date-fns";
import React from "react";
import { ApplicationManagementColumn } from "./_components/column";
import ApplicationManagementClient from "./_components/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ApplicationManagement = async () => {
  const datas = await db.jobApplication.findMany({
    where: {
      isArchived: false,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      jobApplicant: true,
    },
  });

  const datas2 = await db.jobApplication.findMany({
    where: {
      isArchived: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      jobApplicant: true,
    },
  });

  const formattedData: ApplicationManagementColumn[] = datas.map((item) => {
    return {
      id: item.id,
      name: item.jobApplicant.name,
      email: item.jobApplicant.email,
      imageUrl: item.jobApplicant.profileImage ?? "",
      status: item.status,
      isArchived: item.isArchived,
      createdAt: format(item.createdAt, "MMMM dd, yyyy"),
    };
  });

  const formattedDat2: ApplicationManagementColumn[] = datas2.map((item) => {
    return {
      id: item.id,
      name: item.jobApplicant.name,
      email: item.jobApplicant.email,
      imageUrl: item.jobApplicant.profileImage ?? "",
      status: item.status,
      isArchived: item.isArchived,
      createdAt: format(item.createdAt, "MMMM dd, yyyy"),
    };
  });

  console.log("all data", datas.length);
  console.log("archived data", datas2.length);
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Heading
          title="Application Management"
          description="Manage and track job applications seamlessly. Review, filter, and process applications from candidates applying to various roles in our recruitment system."
        />
      </div>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <ApplicationManagementClient data={formattedData} />
        </TabsContent>
        <TabsContent value="archived">
          <ApplicationManagementClient data={formattedDat2} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApplicationManagement;
