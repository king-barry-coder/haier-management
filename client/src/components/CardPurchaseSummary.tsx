import { useGetDashboardMetricsQuery } from "@/app/state/api";
import { TrendingDown, TrendingUp } from "lucide-react";
import numeral from "numeral";
import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CardPurchaseSummary = () => {
  const { data, isLoading } = useGetDashboardMetricsQuery();
  const purchaseData = data?.purchaseSummary || [];

  const lastDataPoint = purchaseData[purchaseData.length - 1] || null;

  return (
    <div className="flex flex-col justify-between col-span-1 md:col-span-2 xl:col-span-1 bg-white dark:bg-black border-1 border-gray-900 shadow-md rounded-2xl">
      {isLoading ? (
        <div className="m-5 text-gray-600 dark:text-gray-300">Loading...</div>
      ) : (
        <>
          {/* HEADER */}
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5 text-gray-800 dark:text-gray-100">
              Purchase Summary
            </h2>
            <hr className="border-gray-200 dark:border-gray-700" />
          </div>

          {/* BODY */}
          <div>
            {/* BODY HEADER */}
            <div className="mb-4 mt-7 px-7">
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Purchased
              </p>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {lastDataPoint
                    ? numeral(lastDataPoint.totalPurchased).format("$0.00a")
                    : "0"}
                </p>
                {lastDataPoint && (
                  <p
                    className={`text-sm flex ml-3 ${
                      lastDataPoint.changePercentage! >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {lastDataPoint.changePercentage! >= 0 ? (
                      <TrendingUp className="w-5 h-5 mr-1" />
                    ) : (
                      <TrendingDown className="w-5 h-5 mr-1" />
                    )}
                    {Math.abs(lastDataPoint.changePercentage!)}%
                  </p>
                )}
              </div>
            </div>
            {/* CHART */}
            <ResponsiveContainer width="100%" height={200} className="p-2">
              <AreaChart
                data={purchaseData}
                margin={{ top: 0, right: 0, left: -50, bottom: 45 }}
              >
                <XAxis
                  dataKey="date"
                  tick={false}
                  axisLine={false}
                />
                <YAxis
                  tickLine={false}
                  tick={false}
                  axisLine={false}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const date = new Date(label).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      });
                      return (
                        <div className="rounded p-2 shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700">
                          <p className="text-xs">{date}</p>
                          <p className="font-semibold">
                            {`$${payload[0].value.toLocaleString("en")}`}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="linear"
                  dataKey="totalPurchased"
                  stroke="#6366F1"
                  fill="#6366F1"
                  dot={true}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default CardPurchaseSummary;
