import React from "react";
import db from "@/lib/db";
import ProfileClient from "./client";
import { getAdminAccount } from "@/hooks/use-admin";

const Page = async () => {
  const { adminId } = await getAdminAccount();
  const user = await db.admin.findFirst({
    where: {
      id: adminId,
    },
  });
  return (
    <div className="p-8 flex-1 pt-6">
      <h3 className="text-2xl font-semibold">Profile Account</h3>
      <ProfileClient user={user} />
    </div>
  );
};

export default Page;
