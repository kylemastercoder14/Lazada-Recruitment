import React from "react";
import Heading from "@/components/ui/heading";
import ReportCard from "./_components/report-card";
import { BrainCog, FileText, UsersRound, Video } from "lucide-react";
import db from "@/lib/db";
import LineChartCard from "./_components/line-chart-card";
import SummaryFilterCard from "./_components/summary-filter-card";

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
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Heading
          title="Report Generations"
          description="Manage all the report generations by the system here. You can view the report summary and filter the report."
        />
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
        <div className="col-span-6">
          <LineChartCard />
        </div>
        <div className="col-span-4">
          <SummaryFilterCard />
        </div>
      </div>
    </div>
  );
};

export default ReportGenerations;
