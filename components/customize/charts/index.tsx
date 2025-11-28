"use client"

import React from "react";
import { cn } from "../../../lib/utils";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { chartSections } from "@/lib/chart-sections";

// Helper function to convert hex to rgb
const hexToRgb = (hex: string): string | undefined => {
  if (!hex) return undefined;
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return hex;
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return `rgb(${r} ${g} ${b})`;
};

const MOCK_DATA = [
  { name: 'Mon', value: 4000, uv: 2400 },
  { name: 'Tue', value: 3000, uv: 1398 },
  { name: 'Wed', value: 2000, uv: 9800 },
  { name: 'Thu', value: 2780, uv: 3908 },
  { name: 'Fri', value: 1890, uv: 4800 },
  { name: 'Sat', value: 2390, uv: 3800 },
  { name: 'Sun', value: 3490, uv: 4300 },
];

const PIE_DATA = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e'];

// Common props interface
export interface ChartProps {
  className?: string;
  backgroundColor?: string;
  borderColor?: string;
  title?: string;
  height?: number;
}

// 1. Simple Bar Chart
export interface SimpleBarChartProps extends ChartProps {
  barColor?: string;
}

export const SimpleBarChart = ({
  className,
  backgroundColor,
  borderColor,
  title = "Weekly Sales",
  height = 256,
  barColor = "#6366f1",
}: SimpleBarChartProps) => {
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : undefined;
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : undefined;
  const barRgb = barColor && barColor.trim() !== "" 
    ? (barColor.startsWith("rgb") ? barColor : (hexToRgb(barColor) || barColor))
    : "#6366f1";

  return (
    <div 
      className={cn("w-full rounded-xl border border-neutral-800 bg-neutral-900 p-4", className)}
      style={{
        ...(bgRgb && { backgroundColor: bgRgb }),
        ...(borderRgb && { borderColor: borderRgb }),
        height: `${height}px`,
      }}
    >
      {title && <h3 className="text-sm font-medium text-neutral-400 mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={title ? "calc(100% - 2rem)" : "100%"}>
        <BarChart data={MOCK_DATA}>
          <Bar dataKey="value" fill={barRgb} radius={[4, 4, 0, 0]} />
          <Tooltip 
            cursor={{fill: 'rgba(255,255,255,0.05)'}}
            contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// 2. Simple Line Chart
export interface SimpleLineChartProps extends ChartProps {
  lineColor?: string;
}

export const SimpleLineChart = ({
  className,
  backgroundColor,
  borderColor,
  title = "User Growth",
  height = 256,
  lineColor = "#8b5cf6",
}: SimpleLineChartProps) => {
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : undefined;
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : undefined;
  const lineRgb = lineColor && lineColor.trim() !== "" 
    ? (lineColor.startsWith("rgb") ? lineColor : (hexToRgb(lineColor) || lineColor))
    : "#8b5cf6";

  return (
    <div 
      className={cn("w-full rounded-xl border border-neutral-800 bg-neutral-900 p-4", className)}
      style={{
        ...(bgRgb && { backgroundColor: bgRgb }),
        ...(borderRgb && { borderColor: borderRgb }),
        height: `${height}px`,
      }}
    >
      {title && <h3 className="text-sm font-medium text-neutral-400 mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={title ? "calc(100% - 2rem)" : "100%"}>
        <LineChart data={MOCK_DATA}>
          <Line type="monotone" dataKey="value" stroke={lineRgb} strokeWidth={2} dot={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// 3. Simple Area Chart
export interface SimpleAreaChartProps extends ChartProps {
  areaColor?: string;
}

export const SimpleAreaChart = ({
  className,
  backgroundColor,
  borderColor,
  title = "Traffic Overview",
  height = 256,
  areaColor = "#ec4899",
}: SimpleAreaChartProps) => {
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : undefined;
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : undefined;
  const areaRgb = areaColor && areaColor.trim() !== "" 
    ? (areaColor.startsWith("rgb") ? areaColor : (hexToRgb(areaColor) || areaColor))
    : "#ec4899";

  return (
    <div 
      className={cn("w-full rounded-xl border border-neutral-800 bg-neutral-900 p-4", className)}
      style={{
        ...(bgRgb && { backgroundColor: bgRgb }),
        ...(borderRgb && { borderColor: borderRgb }),
        height: `${height}px`,
      }}
    >
      {title && <h3 className="text-sm font-medium text-neutral-400 mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={title ? "calc(100% - 2rem)" : "100%"}>
        <AreaChart data={MOCK_DATA}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={areaRgb} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={areaRgb} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="uv" stroke={areaRgb} fillOpacity={1} fill="url(#colorUv)" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// 4. Simple Pie Chart
export const SimplePieChart = ({
  className,
  backgroundColor,
  borderColor,
  title = "Device Usage",
  height = 256,
}: ChartProps) => {
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : undefined;
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : undefined;

  return (
    <div 
      className={cn("w-full rounded-xl border border-neutral-800 bg-neutral-900 p-4", className)}
      style={{
        ...(bgRgb && { backgroundColor: bgRgb }),
        ...(borderRgb && { borderColor: borderRgb }),
        height: `${height}px`,
      }}
    >
      {title && <h3 className="text-sm font-medium text-neutral-400 mb-2">{title}</h3>}
      <ResponsiveContainer width="100%" height={title ? "calc(100% - 2rem)" : "100%"}>
        <PieChart>
          <Pie
            data={PIE_DATA}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {PIE_DATA.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// 5. Donut Chart
export const DonutChart = ({
  className,
  backgroundColor,
  borderColor,
  title = "Revenue Sources",
  height = 256,
}: ChartProps) => {
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : undefined;
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : undefined;

  return (
    <div 
      className={cn("w-full rounded-xl border border-neutral-800 bg-neutral-900 p-4", className)}
      style={{
        ...(bgRgb && { backgroundColor: bgRgb }),
        ...(borderRgb && { borderColor: borderRgb }),
        height: `${height}px`,
      }}
    >
      {title && <h3 className="text-sm font-medium text-neutral-400 mb-2">{title}</h3>}
      <ResponsiveContainer width="100%" height={title ? "calc(100% - 2rem)" : "100%"}>
        <PieChart>
          <Pie
            data={PIE_DATA}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {PIE_DATA.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// 6. Sparkline Stat
export interface SparklineStatProps extends ChartProps {
  value?: string;
  label?: string;
  lineColor?: string;
}

export const SparklineStat = ({
  className,
  backgroundColor,
  borderColor,
  value = "8,420",
  label = "Daily Views",
  lineColor = "#22c55e",
}: SparklineStatProps) => {
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : undefined;
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : undefined;
  const lineRgb = lineColor && lineColor.trim() !== "" 
    ? (lineColor.startsWith("rgb") ? lineColor : (hexToRgb(lineColor) || lineColor))
    : "#22c55e";

  return (
    <div 
      className={cn("w-full rounded-xl border border-neutral-800 bg-neutral-900 p-6", className)}
      style={{
        ...(bgRgb && { backgroundColor: bgRgb }),
        ...(borderRgb && { borderColor: borderRgb }),
      }}
    >
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-500">{label}</p>
          <h3 className="text-3xl font-bold text-white">{value}</h3>
        </div>
        <div className="h-10 w-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MOCK_DATA}>
              <Line type="monotone" dataKey="value" stroke={lineRgb} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// 7. Heatmap Visual
export const HeatmapVisual = ({
  className,
  backgroundColor,
  borderColor,
  title = "Contribution Activity",
}: ChartProps) => {
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : undefined;
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : undefined;

  // Generate random intensity
  const weeks = Array.from({ length: 52 }, () => 
    Array.from({ length: 7 }, () => Math.floor(Math.random() * 4))
  );
  
  const colors = ["bg-neutral-800", "bg-green-900", "bg-green-700", "bg-green-500"];

  return (
    <div 
      className={cn("w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 p-6", className)}
      style={{
        ...(bgRgb && { backgroundColor: bgRgb }),
        ...(borderRgb && { borderColor: borderRgb }),
      }}
    >
      {title && <h3 className="mb-4 text-sm font-medium text-white">{title}</h3>}
      <div className="flex gap-1 overflow-x-auto pb-2">
        {weeks.map((week, i) => (
          <div key={i} className="flex flex-col gap-1">
            {week.map((day, j) => (
              <div key={j} className={cn("h-2.5 w-2.5 rounded-sm", colors[day])} title={`${day} contributions`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// 8. Gantt Visual
export const GanttVisual = ({
  className,
  backgroundColor,
  borderColor,
  title = "Project Timeline",
}: ChartProps) => {
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : undefined;
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : undefined;

  return (
    <div 
      className={cn("w-full rounded-xl border border-neutral-800 bg-neutral-900 p-6", className)}
      style={{
        ...(bgRgb && { backgroundColor: bgRgb }),
        ...(borderRgb && { borderColor: borderRgb }),
      }}
    >
      {title && <h3 className="mb-6 text-sm font-bold text-white">{title}</h3>}
      <div className="space-y-4">
        {[
          { n: "Design Phase", s: 0, w: "40%", c: "bg-indigo-500" },
          { n: "Development", s: 30, w: "50%", c: "bg-purple-500" },
          { n: "Testing", s: 70, w: "20%", c: "bg-pink-500" },
          { n: "Deployment", s: 85, w: "15%", c: "bg-green-500" },
        ].map((task, i) => (
          <div key={i} className="relative">
            <div className="flex justify-between mb-1">
              <span className="text-xs text-neutral-400">{task.n}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-neutral-800">
              <div 
                className={cn("h-full rounded-full", task.c)} 
                style={{ width: task.w, marginLeft: `${task.s}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between text-xs text-neutral-500 border-t border-neutral-800 pt-2">
        <span>Week 1</span>
        <span>Week 4</span>
        <span>Week 8</span>
      </div>
    </div>
  );
};

// Export component map
export const chartComponentsByName: Record<string, React.ComponentType<any>> = {
  SimpleBarChart,
  SimpleLineChart,
  SimpleAreaChart,
  SimplePieChart,
  DonutChart,
  SparklineStat,
  HeatmapVisual,
  GanttVisual,
};

