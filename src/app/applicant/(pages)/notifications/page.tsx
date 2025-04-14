import React from "react";
import db from "@/lib/db";
import { getApplicantAccount } from "@/hooks/use-applicant";
import { format, differenceInDays } from "date-fns";

const Notification = async () => {
  const { applicant } = await getApplicantAccount();
  const data = await db.notification.findMany({
    where: {
      accountNumber: applicant?.accountNumber,
    },
  });

  // Filter out notifications older than 30 days
  const recentNotifications = data.filter((notification) => {
    const createdAtDate = new Date(notification.createdAt);
    return differenceInDays(new Date(), createdAtDate) <= 30;
  });

  return (
    <div className="p-6">
      <div>
        <h1 className="text-2xl font-bold">
          Notifications ({recentNotifications.length})
        </h1>

        <div className="mt-4">
          {recentNotifications.length > 0 ? (
            recentNotifications.map((notification) => (
              <div
                key={notification.id}
                className="p-4 bg-gray-100 rounded-lg mt-2"
              >
                <h2 className="text-lg font-bold">{notification.title}</h2>
                <p className="mt-1">{notification.description}</p>
                <p className="text-sm mt-3 text-muted-foreground">
                  Date Created:{" "}
                  {format(notification.createdAt, "MMMM dd, yyyy")}
                </p>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No recent notifications.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
