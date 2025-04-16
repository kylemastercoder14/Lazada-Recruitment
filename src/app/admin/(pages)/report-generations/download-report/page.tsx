"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { saveAs } from "file-saver";

const Page = () => {
  const searchParams = useSearchParams();

  const passed = JSON.parse(searchParams.get("passed") || "[]");
  const failed = JSON.parse(searchParams.get("failed") || "[]");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    let csv = "Month,Passed,Failed,Total\n";

    months.forEach((month, idx) => {
      const pass = passed[idx] || 0;
      const fail = failed[idx] || 0;
      const total = pass + fail;
      csv += `${month},${pass},${fail},${total}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "monthly_report.csv");

    // Give time for the download to initiate before closing
    setTimeout(() => {
      window.close();
    }, 1000);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-center">
        Downloading Monthly Report...
      </h1>
      <p className="text-center text-gray-500 mt-2">
        If download doesn't start automatically, please refresh the page.
      </p>
    </div>
  );
};

export default Page;
