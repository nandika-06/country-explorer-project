import {
  ResponsiveContainer,
  Tooltip,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
} from "recharts";
import type { ContinentCount } from "../dashboard-utils";

type Props = {
  data: ContinentCount[];
};

export function CountriesByContinentChart({ data }: Props) {
  return (
    <div className="h-80 rounded-lg dark:bg-slate-900 border dark:border-slate-800 border-slate-200 shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">Countries by Continent</h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="name"
            stroke="#94a3b8"
            tick={{ fill: "var(--chart-text)", fontSize: 12 }}
          />
          <YAxis
            stroke="#94a3b8"
            tick={{ fill: "var(--chart-text)", fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid #1e293b",
              color: "#e2e8f0",
            }}
          />
          <Bar dataKey="value" fill="#10b981" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
