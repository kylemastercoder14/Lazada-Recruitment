"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

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

  //   uses printify
  useEffect(() => {
    window.print();
  }, []);
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-center mb-4">Monthly Report</h1>
      <table className="w-full border border-collapse border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Month</th>
            <th className="border px-4 py-2">Passed</th>
            <th className="border px-4 py-2">Failed</th>
            <th className="border px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {months.map((month, idx) => (
            <tr key={month}>
              <td className="border px-4 py-2">{month}</td>
              <td className="border px-4 py-2">{passed[idx] || 0}</td>
              <td className="border px-4 py-2">{failed[idx] || 0}</td>
              <td className="border px-4 py-2 font-semibold">
                {(passed[idx] || 0) + (failed[idx] || 0)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
