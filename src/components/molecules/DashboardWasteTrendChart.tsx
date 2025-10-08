import { useState, useMemo } from "react";
import { Card } from "../ui/card";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useWasteTrend } from "@/services/dashboard/petugas/queries";

type ChartPeriod = "weekly" | "monthly" | "annual";

const DashboardWasteTrendChart = () => {
  const [chartPeriod, setChartPeriod] = useState<ChartPeriod>("monthly");

  // Fetch data
  const { data: trendQuery } = useWasteTrend({ period: chartPeriod });

  // Transform data for chart
  const chartData = useMemo(() => {
    if (!trendQuery?.data) return [];
    return trendQuery.data.data_points.map((dp) => ({
      name: dp.period,
      sampahMasuk: dp.incoming_waste,
      sampahTerolah: dp.processed_waste,
      sampahKeluar: dp.outgoing_waste,
    }));
  }, [trendQuery]);

  return (
    <Card className="p-6 animate-in animate-delay-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-medium text-lg">Tren Sampah</h3>
        <Tabs
          defaultValue="monthly"
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
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                border: "none",
              }}
              formatter={(value: number) => value.toLocaleString("id-ID")}
            />
            <Legend />
            <Bar
              dataKey="sampahMasuk"
              name="Sampah Masuk"
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
            <Bar
              dataKey="sampahTerolah"
              name="Sampah Terolah"
              fill="#14B8A6"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
            <Bar
              dataKey="sampahKeluar"
              name="Sampah Keluar"
              fill="#F59E0B"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default DashboardWasteTrendChart;
