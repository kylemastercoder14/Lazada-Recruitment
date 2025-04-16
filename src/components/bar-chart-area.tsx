
"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type MonthlyUsersBarChartProps = {
  passed: number[];
  failed: number[];
  labels: string[];
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export default function MonthlyUsersBarChart({
  passed,
  failed,
  labels,
}: MonthlyUsersBarChartProps) {
  const data = {
    labels,
    datasets: [
      {
        label: "Passed",
        data: passed,
        backgroundColor: "#10b981",
      },
      {
        label: "Failed",
        data: failed,
        backgroundColor: "#800020",
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Applicants Overview</CardTitle>
        <CardDescription>
          Monthly Passed and Failed Applicants
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full h-[400px]">
        <Bar data={data} options={options} />
      </CardContent>
    </Card>
  );
}
