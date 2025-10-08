import  { useState, useMemo } from "react";
import { Card } from "../ui/card";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import {
  AreaChart,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  CartesianGrid,
  YAxis,
  Area,
} from "recharts";

import { useTransactionTrend } from "@/services/dashboard/petugas/queries";

type ChartPeriod = "weekly" | "monthly" | "annual";

const DashboardTxnTrendChart = () => {
  const [chartPeriod, setChartPeriod] = useState<ChartPeriod>("weekly");

  // Fetch data from API
  const { data: trendQuery } = useTransactionTrend({
    period: chartPeriod,
  });

  // Map API response to chart-friendly format
  const chartData = useMemo(() => {
    if (!trendQuery?.data) return [];
    return trendQuery.data.data_points.map((dp) => ({
      date: dp.period,
      total_amount: dp.total_amount / 1000,
      count: dp.count,
    }));
  }, [trendQuery]);

  return (
    <Card className="p-6 animate-in animate-delay-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-medium text-lg">
          Tren Transaksi
        </h3>
        <Tabs
          defaultValue="weekly"
          value={chartPeriod}
          onValueChange={(val) => setChartPeriod(val as ChartPeriod)}
        >
          <TabsList>
            <TabsTrigger value="weekly">Mingguan</TabsTrigger>
            <TabsTrigger value="monthly">Bulanan</TabsTrigger>
            <TabsTrigger value="annual">Tahunan</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorTotalAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                border: "none",
              }}
              formatter={(value: number) => value.toLocaleString("id-ID")}
            />
            <Area
              type="monotone"
              dataKey="total_amount"
              stroke="#3B82F6"
              fillOpacity={1}
              fill="url(#colorTotalAmount)"
              name="Nilai Transaksi (Rp (K))"
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#10B981"
              fillOpacity={1}
              fill="url(#colorCount)"
              name="Jumlah Transaksi"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default DashboardTxnTrendChart;
