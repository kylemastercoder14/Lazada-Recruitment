// app/dashboard/components/MonthlyUsersChart.tsx
"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
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
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type MonthlyUsersChartProps = {
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
};

export default function MonthlyUsersChart({
  passed,
  failed,
  labels,
}: MonthlyUsersChartProps) {
  const data = {
    labels,
    datasets: [
      {
        label: "Passed",
        data: passed,
        borderColor: "#10b981",
        backgroundColor: "#10b981",
        tension: 0.3,
      },
      {
        label: "Failed",
        data: failed,
        borderColor: "#800020",
        backgroundColor: "#800020",
        tension: 0.3,
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Applicants Overview</CardTitle>
        <CardDescription>
          Number of Successful and Failed Applicants
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full h-[400px]">
        <Line data={data} options={options} />
      </CardContent>
    </Card>
  );
}
