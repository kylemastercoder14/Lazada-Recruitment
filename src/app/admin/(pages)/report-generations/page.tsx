import React from "react";
import Heading from "@/components/ui/heading";
import ReportCard from "./_components/report-card";
import {
  BrainCog,
  Download,
  FileText,
  Printer,
  UsersRound,
  Video,
} from "lucide-react";
import db from "@/lib/db";
// import LineChartCard from "./_components/line-chart-card";
import SummaryFilterCard from "./_components/summary-filter-card";
import MonthlyUsersChart from "@/components/chart-area";
import { endOfYear, startOfYear } from "date-fns";
import MonthlyUsersBarChart from "@/components/bar-chart-area";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

const ReportGenerations = async () => {
  const applicants = await db.jobApplication.findMany({
    where: {
      status: "Passed",
    },
  });

  const watched = await db.watchedVideo.findMany({
    where: {
      status: "Watched",
    },
  });

  const interviewed = await db.applicantAnswer.findMany();

  const uniqueInterviewed = Array.from(
    new Set(interviewed.map((item) => item.jobApplicantId))
  );

  const trained = await db.applicantTrainingScore.findMany();

  const successfulMonthly = await getMonthlyCounts("Passed");
  const failedMonthly = await getMonthlyCounts("Failed");

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Heading
          title="Report Generations"
          description="Manage all the report generations by the system here. You can view the report summary and filter the report."
        />
        <div className="flex gap-2 items-center">
          <Button>
            <Link
              className="flex items-center gap-2"
              target="_blank"
              href={{
                pathname: "/admin/report-generations/generate-report",
                query: {
                  passed: JSON.stringify(successfulMonthly),
                  failed: JSON.stringify(failedMonthly),
                },
              }}
            >
              <Printer />
              Print Report
            </Link>
          </Button>
          <Button variant="outline">
            <Link
              className="flex items-center gap-2"
              target="_blank"
              href={{
                pathname: "/admin/report-generations/download-report",
                query: {
                  passed: JSON.stringify(successfulMonthly),
                  failed: JSON.stringify(failedMonthly),
                },
              }}
            >
              <Download />
              Download
            </Link>
          </Button>
        </div>
      </div>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-4 mt-3">
        <ReportCard
          title="Total Applicants"
          description="This is the total number of applicants that have passed the application process."
          icon={UsersRound}
          count={applicants.length}
        />
        <ReportCard
          title="Total Watched Videos"
          description="This is the total number of videos that have been watched by the applicants."
          icon={Video}
          count={watched.length}
        />
        <ReportCard
          title="Total Interviewed"
          description="This is the total number of applicants that have been interviewed."
          icon={FileText}
          count={uniqueInterviewed.length}
        />
        <ReportCard
          title="Total Training Evaluated"
          description="This is the total number of applicants that have been evaluated for onsite training."
          icon={BrainCog}
          count={trained.length}
        />
      </div>
      <div className="grid md:grid-cols-10 grid-cols-1 gap-4 mt-5">
        <div className="col-span-5">
          {/* <LineChartCard /> */}
          <MonthlyUsersBarChart
            passed={successfulMonthly}
            failed={failedMonthly}
            labels={[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ]}
          />
        </div>
        <div className="col-span-5">
          <MonthlyUsersChart
            passed={successfulMonthly}
            failed={failedMonthly}
            labels={[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ]}
          />
        </div>
      </div>
      <div className="mt-5">
        <SummaryFilterCard />
      </div>
    </div>
  );
};

export default ReportGenerations;
