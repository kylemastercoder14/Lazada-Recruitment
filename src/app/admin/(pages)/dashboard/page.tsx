import React from "react";
import StatsCard from "@/components/globals/stats-card";
import db from "@/lib/db";
import { startOfYear, endOfYear, subYears } from "date-fns";
import MonthlyUsersChart from "@/components/chart-area";

const getCountForYear = async (status?: "Passed" | "Failed") => {
  const now = new Date();
  const thisYearStart = startOfYear(now);
  const thisYearEnd = endOfYear(now);
  const lastYearStart = startOfYear(subYears(now, 1));
  const lastYearEnd = endOfYear(subYears(now, 1));

  const whereCondition = status
    ? {
        jobApplication: {
          some: {
            status,
            createdAt: {
              gte: thisYearStart,
              lte: thisYearEnd,
            },
          },
        },
      }
    : {
        createdAt: {
          gte: thisYearStart,
          lte: thisYearEnd,
        },
      };

  const lastWhereCondition = status
    ? {
        jobApplication: {
          some: {
            status,
            createdAt: {
              gte: lastYearStart,
              lte: lastYearEnd,
            },
          },
        },
      }
    : {
        createdAt: {
          gte: lastYearStart,
          lte: lastYearEnd,
        },
      };

  const current = await db.jobApplicant.count({ where: whereCondition });
  const previous = await db.jobApplicant.count({ where: lastWhereCondition });

  return { current, previous };
};

const getPercentageDiff = (
  current: number,
  previous: number
): {
  percentage: string;
  trend: "up" | "down" | "same";
  actualChange: number;
} => {
  if (previous === 0 && current === 0) {
    return { percentage: "0%", trend: "same", actualChange: 0 };
  }

  if (previous === 0) {
    return { percentage: "+100%+", trend: "up", actualChange: Infinity };
  }

  const rawChange = ((current - previous) / previous) * 100;
  const trend = rawChange > 0 ? "up" : rawChange < 0 ? "down" : "same";

  const displayChange =
    Math.abs(rawChange) > 100
      ? `${rawChange > 0 ? "+" : "-"}100%+`
      : `${rawChange > 0 ? "+" : ""}${rawChange.toFixed(1)}%`;

  return { percentage: displayChange, trend, actualChange: rawChange };
};

const getRecommendation = (
  title: string,
  trend: "up" | "down" | "same",
  current: number,
  previous: number
): string => {
  if (previous === 0 && current === 0)
    return "No data available from last year.";

  switch (trend) {
    case "up":
      return current - previous > 10
        ? `${title} increased significantly. Keep up the good work!`
        : `${title} saw some improvement. Consider analyzing what worked.`;
    case "down":
      return `${title} dropped compared to last year. Evaluate your strategies.`;
    case "same":
      return `${title} remained consistent. Explore ways to improve further.`;
    default:
      return "";
  }
};

const getMonthlyCounts = async (status: "Passed" | "Failed") => {
  const now = new Date();
  const yearStart = startOfYear(now);
  const yearEnd = endOfYear(now);

  const applicants = await db.jobApplicant.findMany({
    where: {
      jobApplication: {
        some: {
          status,
          createdAt: {
            gte: yearStart,
            lte: yearEnd,
          },
        },
      },
    },
    select: {
      jobApplication: {
        where: { status },
        select: {
          createdAt: true,
        },
      },
    },
  });

  const monthlyCounts = Array(12).fill(0);

  for (const applicant of applicants) {
    for (const app of applicant.jobApplication) {
      const month = new Date(app.createdAt).getMonth();
      monthlyCounts[month]++;
    }
  }

  return monthlyCounts.slice(0, 5); // Show only Jan-May for now
};

const Page = async () => {
  const applicant = await getCountForYear();
  const successful = await getCountForYear("Passed");
  const failed = await getCountForYear("Failed");

  const successfulMonthly = await getMonthlyCounts("Passed");
  const failedMonthly = await getMonthlyCounts("Failed");

  const applicantDiff = getPercentageDiff(
    applicant.current,
    applicant.previous
  );
  const successfulDiff = getPercentageDiff(
    successful.current,
    successful.previous
  );
  const failedDiff = getPercentageDiff(failed.current, failed.previous);

  return (
    <div className="p-8 flex-1 pt-6">
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-5">
        <StatsCard
          title="Number of Applicants"
          data={applicant.current.toString()}
          description="Compared to last year"
          trendUp={
            applicantDiff.trend === "up"
              ? true
              : applicantDiff.trend === "down"
                ? false
                : null
          }
          percentage={applicantDiff.percentage}
          recommendation={getRecommendation(
            "Applicants",
            applicantDiff.trend,
            applicant.current,
            applicant.previous
          )}
        />
        <StatsCard
          title="Successful Candidates"
          data={successful.current.toString()}
          description="Compared to last year"
          trendUp={
            successfulDiff.trend === "up"
              ? true
              : successfulDiff.trend === "down"
                ? false
                : null
          }
          percentage={successfulDiff.percentage}
          recommendation={getRecommendation(
            "Successful candidates",
            successfulDiff.trend,
            successful.current,
            successful.previous
          )}
        />
        <StatsCard
          title="Failed Applicants"
          data={failed.current.toString()}
          description="Compared to last year"
          trendUp={
            failedDiff.trend === "up"
              ? true
              : failedDiff.trend === "down"
                ? false
                : null
          }
          percentage={failedDiff.percentage}
          recommendation={getRecommendation(
            "Failed applicants",
            failedDiff.trend,
            failed.current,
            failed.previous
          )}
        />
      </div>
      <div className="mt-5">
        <MonthlyUsersChart
          passed={successfulMonthly}
          failed={failedMonthly}
          labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
        />
      </div>
    </div>
  );
};

export default Page;
