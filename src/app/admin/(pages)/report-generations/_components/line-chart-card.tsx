"use client";

import React, { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getMonthlyApplicantCounts } from "@/actions/reports";

const chartConfig = {
  applicant: {
    label: "Applicants",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const LineChartCard = () => {
  const [chartData, setChartData] = useState<
    { month: string; applicant: number }[]
  >([]);
  const [trend, setTrend] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMonthlyApplicantCounts();

        // Create an array for all months from Jan to Dec with default value 0
        const months = [
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
        ];

        const monthData = months.map((month) => {
          // Find data for the current month or set it to 0 if not found
          const found = Array.isArray(data) ? data.find((item) => item.month === month) : null;
          return { month, applicant: found ? found.applicant : 0 };
        });

        setChartData(monthData);

        // Calculate trend percentage
        if (monthData.length > 1) {
          const lastMonth = monthData[monthData.length - 2].applicant || 0;
          const thisMonth = monthData[monthData.length - 1].applicant || 0;
          const change = ((thisMonth - lastMonth) / lastMonth) * 100;
          setTrend(change);
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Applicants Summary</CardTitle>
      </CardHeader>
      <CardContent className='p-5'>
        <ChartContainer className='w-full h-[40vh] p-5' config={chartConfig}>
          <LineChart
		  height={300}
		  width={980}
            accessibilityLayer
            data={chartData}
            margin={{
              top: 40,
              left: 30,
              right: 30,
            }}
          >
            <XAxis
              dataKey="month"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="applicant"
              type="natural"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={{
                fill: "hsl(var(--chart-1))",
              }}
              activeDot={{
                r: 4,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {trend !== null
            ? `Trending ${trend > 0 ? "up" : "down"} by ${Math.abs(
                parseFloat(trend.toFixed(2))
              )}% this month`
            : "No data available"}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total applicants for the current year
        </div>
      </CardFooter>
    </Card>
  );
};

export default LineChartCard;
