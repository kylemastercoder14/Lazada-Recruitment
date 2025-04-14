"use client";

import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingDownIcon, TrendingUpIcon, MinusIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const StatsCard = ({
  title,
  data,
  description,
  trendUp,
  percentage,
  recommendation
}: {
  title: string;
  data: string;
  description: string;
  trendUp: boolean | null;
  percentage: string;
  recommendation: string;
}) => {
  const TrendIcon =
    trendUp === null ? MinusIcon : trendUp ? TrendingUpIcon : TrendingDownIcon;

  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          {data}
        </CardTitle>
        <div className="absolute right-4 top-4">
          <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
            <TrendIcon className="h-4 w-4" />
            {percentage}
          </Badge>
        </div>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {description} <TrendIcon className="h-4 w-4" />
        </div>
		<div className="text-muted-foreground">
            {recommendation}
          </div>
      </CardFooter>
    </Card>
  );
};

export default StatsCard;
