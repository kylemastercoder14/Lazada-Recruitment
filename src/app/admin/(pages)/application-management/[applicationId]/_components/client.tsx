"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { JobApplicant } from "@prisma/client";
import Image from "next/image";
import React from "react";

const evaluateApplication = (data: JobApplicant) => {
  // Helper function to calculate points based on conditions
  const calculatePoints = (
    value: string,
    criteria: Record<string, number>,
    defaultPoints = 0
  ): number => criteria[value] || defaultPoints;

  // Qualification and Skill Criteria (30%)
  const qualificationPointsFromExperience = calculatePoints(
    data.totalYearExperience,
    {
      "2 years and above": 10,
      "1 and 1/2 years": 8,
      "6 months": 6,
    },
    4
  );

  const qualificationPointsFromRole = calculatePoints(
    data.highestRoleAchieved,
    {
      "Mid-Level Management": 10,
    },
    5
  );

  const qualificationPointsFromExpertise = calculatePoints(
    data.fieldOfExpertise,
    {
      "Supply Chain": 10,
      "Operations Management": 10,
      "Warehouse Manager": 10,
      "Transportation Analyst": 10,
      "Logistics Engineer": 10,
      "Inventory Manager": 10,
      "Procurement Manager": 10,
      "Customer Service Representative": 10,
      Dispatcher: 10,
      Encoder: 10,
      "IT in logistics field": 7,
      "Business Related Field": 7,
    },
    4
  );

  const qualificationPointsFromAwards = calculatePoints(data.awards || "", {
    "International/National Level Award": 5,
    "Company/Industry-Recognized Award": 3,
  });

  const totalQualificationPoints =
    qualificationPointsFromExperience +
    qualificationPointsFromRole +
    qualificationPointsFromExpertise +
    qualificationPointsFromAwards;

  const qualificationScore = (totalQualificationPoints / 35) * 30;

  // Work Experience (25%)
  const workPointsFromCompany = calculatePoints(
    data.companyName,
    {
      DHL: 10,
      Lazada: 10,
      FedEx: 10,
      Shopee: 10,
      Amazon: 10,
      Alibaba: 10,
      "J&T Express": 10,
      "Ninja Van": 10,
      LBC: 10,
      Lalamove: 8,
      Loklok: 5,
    },
    3
  );

  const workPointsFromRole = calculatePoints(
    data.jobPosition,
    {
      "Senior Role": 10,
      "Mid-Level Role": 8,
    },
    5
  );

  const workPointsFromYears = calculatePoints(
    data.yearsWorkedInCompany,
    {
      "5 years and above": 10,
      "3-4 years": 8,
      "1-2 years": 6,
    },
    4
  );

  const workPointsFromCertificate = calculatePoints(data.certificate || "", {
    "Best Employee of the Year": 10,
    PMP: 8,
    ITIL: 8,
    "Six Sigma": 8,
    Others: 8,
  });

  const totalWorkPoints =
    workPointsFromCompany +
    workPointsFromRole +
    workPointsFromYears +
    workPointsFromCertificate;

  const workScore = (totalWorkPoints / 40) * 25;

  // Logistics-Related Experience (25%)
  const logisticsPointsFromCompany = calculatePoints(data.logisticsCompany, {
    DHL: 10,
    Lazada: 10,
    FedEx: 10,
    Shopee: 10,
    Amazon: 10,
    Alibaba: 10,
    "J&T Express": 10,
    "Ninja Van": 10,
    LBC: 10,
    Lalamove: 8,
    Loklok: 8,
  });

  const logisticsPointsFromYears = calculatePoints(
    data.logisticsYearsWorked,
    {
      "5 years and above": 10,
      "3-4 years": 8,
      "1-2 years": 6,
    },
    4
  );

  const totalLogisticsPoints =
    logisticsPointsFromCompany + logisticsPointsFromYears;
  const logisticsScore = (totalLogisticsPoints / 20) * 25;

  // Educational Attainment (20%)
  const educationPointsFromDegree = calculatePoints(
    data.degreeStatus,
    {
      "Bachelor's Degree": 10,
      "College Undergraduate (3rd or 4th year)": 8,
      "College Undergraduate (1st or 2nd year)": 6,
    },
    4
  );

  const educationPointsFromYear = calculatePoints(
    data.yearGraduated,
    {
      "Graduated within the last 5 years": 10,
      "Graduated 6-10 years ago": 8,
    },
    6
  );

  const totalEducationPoints =
    educationPointsFromDegree + educationPointsFromYear;
  const educationScore = (totalEducationPoints / 20) * 20;

  // Total Score
  const totalScore =
    qualificationScore + workScore + logisticsScore + educationScore;

  // Determine Status
  const status =
    totalScore >= 90
      ? "Top Candidates for First Batch of Interviews"
      : totalScore >= 70
      ? "Next Batch Candidates"
      : "To Be Announced Candidates";

  return {
    totalScore: Math.round(totalScore),
    status,
    details: {
      qualificationPoints: {
        experience: qualificationPointsFromExperience,
        role: qualificationPointsFromRole,
        expertise: qualificationPointsFromExpertise,
        awards: qualificationPointsFromAwards,
      },
      workPoints: {
        company: workPointsFromCompany,
        role: workPointsFromRole,
        years: workPointsFromYears,
        certificate: workPointsFromCertificate,
      },
      logisticsPoints: {
        company: logisticsPointsFromCompany,
        years: logisticsPointsFromYears,
      },
      educationPoints: {
        degree: educationPointsFromDegree,
        year: educationPointsFromYear,
      },
      qualificationScore: Math.round(qualificationScore),
      workScore: Math.round(workScore),
      logisticsScore: Math.round(logisticsScore),
      educationScore: Math.round(educationScore),
    },
  };
};

const SpecificApplicationClient = ({ data }: { data: JobApplicant }) => {
  const { totalScore, status, details } = evaluateApplication(data);
  return (
    <>
      <h3 className="text-xl font-semibold text-blue-700">
        {data.name} Application Evaluation
      </h3>
      <Card className="mt-3">
        <CardContent className="p-5">
          <p className="text-blue-700 font-semibold">Personal Information</p>
          <Image
            className="mt-2 rounded-full"
            src={data.profileImage || ""}
            alt={data.name}
            width={100}
            height={100}
          />
          <p className="mt-3">
            <span className="font-semibold">Name:</span> {data.name}
          </p>
          <p className="mt-1">
            <span className="font-semibold">Email:</span> {data.email}
          </p>
          <p className="mt-1">
            <span className="font-semibold">Age:</span> {data.age}
          </p>
          <p className="mt-1">
            <span className="font-semibold">Sex:</span> {data.sex}
          </p>
          <p className="mt-1">
            <span className="font-semibold">Address:</span> {data.address}
          </p>
          <p className="mt-1">
            <span className="font-semibold">Contact Number:</span>{" "}
            {data.contactNumber}
          </p>
          <Separator className="my-5" />
          <p className="text-blue-700 font-semibold mt-5">
            Qualification & Skill Criteria (30%)
          </p>
          <div className="mt-3 flex flex-col gap-1">
            <span className="font-semibold">Experience (Years):</span>
            <Input readOnly value={data.totalYearExperience} />
            <span className="text-blue-700 font-semibold text-xs">
              Points: {details.qualificationPoints.experience}
            </span>
          </div>
          <div className="mt-3 flex flex-col gap-1">
            <span className="font-semibold">Highest Role Achieved:</span>
            <Input readOnly value={data.highestRoleAchieved} />
            <span className="text-blue-700 font-semibold text-xs">
              Points: {details.qualificationPoints.role}
            </span>
          </div>
          <div className="mt-3 flex flex-col gap-1">
            <span className="font-semibold">Field of Expertise:</span>
            <Input readOnly value={data.fieldOfExpertise} />
            <span className="text-blue-700 font-semibold text-xs">
              Points: {details.qualificationPoints.expertise}
            </span>
          </div>
          <div className="mt-3 flex flex-col gap-1">
            <span className="font-semibold">Awards (if any):</span>
            <Input readOnly value={data.awards ?? "N/A"} />
            <span className="text-blue-700 font-semibold text-xs">
              Points: {details.qualificationPoints.awards}
            </span>
          </div>
          <Separator className="my-5" />
          <p className="text-blue-700 font-semibold mt-5">
            Work Experience (25%)
          </p>
          <div className="mt-3 flex flex-col gap-1">
            <span className="font-semibold">Company Name:</span>
            <Input readOnly value={data.companyName} />
            <span className="text-blue-700 font-semibold text-xs">
              Points: {details.workPoints.company}
            </span>
          </div>
          <div className="mt-3 flex flex-col gap-1">
            <span className="font-semibold">Job Role/Position:</span>
            <Input readOnly value={data.jobPosition} />
            <span className="text-blue-700 font-semibold text-xs">
              Points: {details.workPoints.role}
            </span>
          </div>
          <div className="mt-3 flex flex-col gap-1">
            <span className="font-semibold">Years of Experience:</span>
            <Input readOnly value={data.yearsWorkedInCompany} />
            <span className="text-blue-700 font-semibold text-xs">
              Points: {details.workPoints.years}
            </span>
          </div>
          <div className="mt-3 flex flex-col gap-1">
            <span className="font-semibold">Certification Received:</span>
            <Input readOnly value={data.certificate ?? "N/A"} />
            <span className="text-blue-700 font-semibold text-xs">
              Points: {details.workPoints.certificate}
            </span>
          </div>
          <Separator className="my-5" />
          <p className="text-blue-700 font-semibold mt-5">
            Logistics-Related Experience (25%)
          </p>
          <div className="mt-3 flex flex-col gap-1">
            <span className="font-semibold">Company Name:</span>
            <Input readOnly value={data.logisticsCompany} />
            <span className="text-blue-700 font-semibold text-xs">
              Points: {details.logisticsPoints.company}
            </span>
          </div>
          <div className="mt-3 flex flex-col gap-1">
            <span className="font-semibold">Years of Experience:</span>
            <Input readOnly value={data.logisticsYearsWorked} />
            <span className="text-blue-700 font-semibold text-xs">
              Points: {details.logisticsPoints.years}
            </span>
          </div>
          <Separator className="my-5" />
          <p className="text-blue-700 font-semibold mt-5">
            Educational Attainment (20%)
          </p>
          <div className="mt-3 flex flex-col gap-1">
            <span className="font-semibold">Degree/Undergraduate Status:</span>
            <Input readOnly value={data.degreeStatus} />
            <span className="text-blue-700 font-semibold text-xs">
              Points: {details.educationPoints.degree}
            </span>
          </div>
          <div className="mt-3 flex flex-col gap-1">
            <span className="font-semibold">Year Graduated:</span>
            <Input readOnly value={data.yearGraduated} />
            <span className="text-blue-700 font-semibold text-xs">
              Points: {details.educationPoints.year}
            </span>
          </div>
          <Separator className="my-5" />
          <div className="px-3 py-2 border rounded-md bg-accent">
            <p className="text-blue-700 text-lg font-semibold">Score Summary</p>
            <div className="mt-3">
              <span className="font-semibold">Total Points: </span>
              <span className="font-normal">{totalScore}</span>
            </div>
            <div className="mt-1">
              <span className="font-semibold">Status: </span>
              <span className="font-normal">{status}</span>
            </div>
            <div className="mt-1 flex flex-col">
              <span className="font-semibold">Score Ranges: </span>
              <ul className="mt-1">
                <li>
                  •{" "}
                  <span className="font-semibold">
                    90-100 points (Top Candidates for First Batch of Interviews)
                  </span>
                  : These candidates are prioritized for the first batch. If
                  they cannot attend their scheduled interview, they will go to
                  the queue. They can aslo remain top priority for the next
                  available interview day.
                </li>
                <li>
                  •{" "}
                  <span className="font-semibold">
                    70-89 points (Next Batch Candidates)
                  </span>
                  : They are placed in the queue for the next available slots.
                  These candidates will be interviewed also if the top
                  candidates are unavailable within the day.
                </li>
                <li>
                  •{" "}
                  <span className="font-semibold">
                    Below 70 points (To Be Announced Candidates)
                  </span>
                  : Candidates in this range will be placed on the waiting list,
                  and their interview schedule will be determined at a later
                  date.
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-end gap-2">
            <Button size="sm">Mark as Passed</Button>
            <Button size="sm" variant="destructive">
              Mark as Failed
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-black text-white hover:bg-black/80 hover:text-white"
            >
              Back &rarr;
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default SpecificApplicationClient;