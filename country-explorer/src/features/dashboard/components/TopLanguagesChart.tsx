import {
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import type { ContinentCount } from "../dashboard-utils";

type Props = {
  data: ContinentCount[];
};

const COLORS = [
  "#10b981",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#14b8a6",
];

export function TopLanguagesChart({ data }: Props) {
  return (
    <div className="h-80 rounded-lg bg-slate-900 border border-slate-800 p-4">
      <h2 className="text-lg font-semibold mb-4">Top Languages</h2>

      <ResponsiveContainer width="100%" height="120%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="45%"
            outerRadius={90}
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
