"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getPriceHistory } from "@/app/actions";
import { Loader2 } from "lucide-react";

export default function PriceChart({ productId }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const history = await getPriceHistory(productId);

      const chartData = history.map((item) => ({
        date: new Date(item.checked_at).toLocaleDateString(),
        price: Number(item.price),
      }));

      setData(chartData);
      setLoading(false);
    }

    loadData();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10 text-slate-500 w-full">
        <Loader2 className="w-4 h-4 animate-spin mr-2" />
        Loading price history…
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-10 text-slate-500 w-full text-sm">
        No price history yet.
        <br />
        We’ll start tracking after the first update.
      </div>
    );
  }

  return (
    <div className="w-full">
      <h4 className="text-sm font-medium mb-3 text-slate-700">
        Price history
      </h4>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <CartesianGrid stroke="#f1f5f9" vertical={false} />

          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            stroke="#94a3b8"
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            tick={{ fontSize: 12 }}
            stroke="#94a3b8"
            tickLine={false}
            axisLine={false}
            width={40}
          />

          <Tooltip
            cursor={{ stroke: "#e2e8f0", strokeWidth: 1 }}
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              fontSize: "12px",
              color: "#0f172a",
            }}
            labelStyle={{ color: "#64748b" }}
          />

          <Line
            type="monotone"
            dataKey="price"
            stroke="#4f46e5" // indigo
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5, fill: "#4f46e5" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
