import db from "@/lib/db";
import React from "react";
import SpecificApplicationClient from "./_components/client";

const SpecificApplication = async ({
  params,
}: {
  params: { applicationId: string };
}) => {
  const data = await db.jobApplicant.findFirst({
    where: {
      id: params.applicationId,
    },
  });
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      {data ? (
        <SpecificApplicationClient data={data} />
      ) : (
        <div>No data found</div>
      )}
    </div>
  );
};

export default SpecificApplication;
