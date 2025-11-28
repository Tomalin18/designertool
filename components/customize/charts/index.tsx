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
  Legend,
  LabelList
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

// Resize handle component for charts
const ResizeHandle = ({ 
  onResize 
}: { 
  onResize: (width: number, height: number) => void 
}) => {
  const [isResizing, setIsResizing] = React.useState(false);
  const [startPos, setStartPos] = React.useState({ x: 0, y: 0 });
  const [startSize, setStartSize] = React.useState({ width: 0, height: 0 });
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!containerRef.current) return;
    
    const container = containerRef.current.parentElement;
    if (!container) return;
    
    setIsResizing(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    setStartSize({ 
      width: container.offsetWidth, 
      height: container.offsetHeight 
    });
  };

  React.useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const container = containerRef.current.parentElement;
      if (!container) return;

      const deltaX = e.clientX - startPos.x;
      const deltaY = e.clientY - startPos.y;

      const newWidth = Math.max(200, startSize.width + deltaX);
      const newHeight = Math.max(150, startSize.height + deltaY);

      onResize(newWidth, newHeight);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, startPos, startSize, onResize]);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500/50 hover:bg-blue-500 border-2 border-white rounded cursor-se-resize z-10"
      style={{
        cursor: isResizing ? 'se-resize' : 'se-resize',
      }}
    />
  );
};

// Editable cell component for charts
const EditableText = ({ 
  value, 
  onChange, 
  editable = false,
  className = "",
  style = {}
}: { 
  value: string, 
  onChange?: (text: string) => void,
  editable?: boolean,
  className?: string,
  style?: React.CSSProperties
}) => {
  const [isEditing, setIsEditing] = React.useState(false)
  const [editText, setEditText] = React.useState(value)
  const textRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setEditText(value)
  }, [value])

  React.useEffect(() => {
    if (isEditing && textRef.current) {
      textRef.current.focus()
      const range = document.createRange()
      range.selectNodeContents(textRef.current)
      range.collapse(false)
      const selection = window.getSelection()
      selection?.removeAllRanges()
      selection?.addRange(range)
    }
  }, [isEditing])

  const handleClick = () => {
    if (editable) {
      setIsEditing(true)
    }
  }

  const handleBlur = () => {
    setIsEditing(false)
    if (onChange && editText !== value) {
      onChange(editText)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleBlur()
    }
    if (e.key === 'Escape') {
      setEditText(value)
      setIsEditing(false)
    }
  }

  return (
    <div
      className={cn(className, editable && "cursor-text hover:ring-2 hover:ring-blue-500/50 transition-all rounded px-1")}
      style={style}
      onClick={handleClick}
      onBlur={handleBlur}
    >
      {isEditing ? (
        <div
          ref={textRef}
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => {
            const newText = e.currentTarget.textContent || ''
            setEditText(newText)
            setTimeout(() => {
              if (textRef.current) {
                const range = document.createRange()
                range.selectNodeContents(textRef.current)
                range.collapse(false)
                const selection = window.getSelection()
                selection?.removeAllRanges()
                selection?.addRange(range)
              }
            }, 0)
          }}
          onKeyDown={handleKeyDown}
          className="outline-none focus:outline-none"
          style={{ minHeight: '1.5rem' }}
        >
          {editText}
        </div>
      ) : (
        <span>{value}</span>
      )}
    </div>
  )
}

// Common props interface
export interface ChartProps {
  className?: string;
  backgroundColor?: string;
  borderColor?: string;
  title?: string;
  titleColor?: string;
  height?: number;
  borderRadius?: number;
  borderWidth?: number;
  padding?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
  editable?: boolean;
  onTitleChange?: (text: string) => void;
}

// 1. Simple Bar Chart
export interface SimpleBarChartProps extends ChartProps {
  data?: string;
  barColor?: string;
  barRadius?: number;
  showXAxis?: boolean;
  showYAxis?: boolean;
}

export const SimpleBarChart = ({
  className,
  backgroundColor,
  borderColor,
  title = "Weekly Sales",
  titleColor,
  height = 256,
  borderRadius = 12,
  borderWidth = 1,
  padding = 16,
  showGrid = false,
  showTooltip = true,
  data,
  barColor = "#6366f1",
  barRadius = 4,
  showXAxis = false,
  showYAxis = false,
  editable = false,
  onTitleChange,
}: SimpleBarChartProps) => {
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : undefined;
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : undefined;
  const titleRgb = titleColor && titleColor.trim() !== "" 
    ? (titleColor.startsWith("rgb") ? titleColor : (hexToRgb(titleColor) || titleColor))
    : undefined;
  const barRgb = barColor && barColor.trim() !== "" 
    ? (barColor.startsWith("rgb") ? barColor : (hexToRgb(barColor) || barColor))
    : "#6366f1";

  return (
    <div 
      className={cn("w-full border bg-neutral-900", className)}
      style={{
        ...(bgRgb && { backgroundColor: bgRgb }),
        ...(borderRgb && { borderColor: borderRgb }),
        ...(borderRadius !== 12 && { borderRadius: `${borderRadius}px` }),
        ...(borderWidth !== 1 && { borderWidth: `${borderWidth}px`, borderStyle: "solid" }),
        height: `${height}px`,
        padding: `${padding}px`,
      }}
    >
      {title && (
        <EditableText
          value={title}
          onChange={onTitleChange}
          editable={editable}
          className="text-sm font-medium mb-4 block"
          style={{
            ...(titleRgb && { color: titleRgb }),
            ...(!titleRgb && { color: "rgb(163 163 163)" }),
          }}
        />
      )}
      <ResponsiveContainer width="100%" height={title ? "calc(100% - 2rem)" : "100%"}>
        <BarChart data={(() => {
          if (data && data.trim() !== "") {
            return data.split("\n").filter(line => line.trim() !== "").map(line => {
              const [name, value] = line.split(",").map(s => s.trim())
              return { name: name || "", value: parseFloat(value) || 0 }
            })
          }
          return MOCK_DATA
        })()}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />}
          {showXAxis && <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" />}
          {showYAxis && <YAxis stroke="rgba(255,255,255,0.3)" />}
          <Bar dataKey="value" fill={barRgb} radius={[barRadius, barRadius, 0, 0]} />
          {showTooltip && (
            <Tooltip 
              cursor={{fill: 'rgba(255,255,255,0.05)'}}
              contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// 2. Simple Line Chart
export interface SimpleLineChartProps extends ChartProps {
  data?: string;
  lineColor?: string;
  lineWidth?: number;
  showDots?: boolean;
  dotColor?: string;
  showXAxis?: boolean;
  showYAxis?: boolean;
}

export const SimpleLineChart = ({
  className,
  backgroundColor,
  borderColor,
  title = "User Growth",
  titleColor,
  height = 256,
  borderRadius = 12,
  borderWidth = 1,
  padding = 16,
  showGrid = false,
  showTooltip = true,
  data,
  lineColor = "#8b5cf6",
  lineWidth = 2,
  showDots = false,
  dotColor,
  showXAxis = false,
  showYAxis = false,
  editable = false,
  onTitleChange,
}: SimpleLineChartProps & ChartProps) => {
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : undefined;
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : undefined;
  const titleRgb = titleColor && titleColor.trim() !== "" 
    ? (titleColor.startsWith("rgb") ? titleColor : (hexToRgb(titleColor) || titleColor))
    : undefined;
  const lineRgb = lineColor && lineColor.trim() !== "" 
    ? (lineColor.startsWith("rgb") ? lineColor : (hexToRgb(lineColor) || lineColor))
    : "#8b5cf6";
  const dotRgb = dotColor && dotColor.trim() !== "" 
    ? (dotColor.startsWith("rgb") ? dotColor : (hexToRgb(dotColor) || lineRgb))
    : lineRgb;

  return (
    <div 
      className={cn("w-full border bg-neutral-900", className)}
      style={{
        ...(bgRgb && { backgroundColor: bgRgb }),
        ...(borderRgb && { borderColor: borderRgb }),
        ...(borderRadius !== 12 && { borderRadius: `${borderRadius}px` }),
        ...(borderWidth !== 1 && { borderWidth: `${borderWidth}px`, borderStyle: "solid" }),
        height: `${height}px`,
        padding: `${padding}px`,
      }}
    >
      {title && (
        <EditableText
          value={title}
          onChange={onTitleChange}
          editable={editable}
          className="text-sm font-medium mb-4 block"
          style={{
            ...(titleRgb && { color: titleRgb }),
            ...(!titleRgb && { color: "rgb(163 163 163)" }),
          }}
        />
      )}
      <ResponsiveContainer width="100%" height={title ? "calc(100% - 2rem)" : "100%"}>
        <LineChart data={(() => {
          if (data && data.trim() !== "") {
            return data.split("\n").filter(line => line.trim() !== "").map(line => {
              const [name, value] = line.split(",").map(s => s.trim())
              return { name: name || "", value: parseFloat(value) || 0 }
            })
          }
          return MOCK_DATA
        })()}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />}
          {showXAxis && <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" />}
          {showYAxis && <YAxis stroke="rgba(255,255,255,0.3)" />}
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={lineRgb} 
            strokeWidth={lineWidth} 
            dot={showDots ? { fill: dotRgb, r: 4 } : false}
          />
          {showTooltip && (
            <Tooltip 
              contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// 3. Simple Area Chart
export interface SimpleAreaChartProps extends ChartProps {
  data?: string;
  areaColor?: string;
  lineColor?: string;
  gradientOpacity?: number;
  showXAxis?: boolean;
  showYAxis?: boolean;
}

export const SimpleAreaChart = ({
  className,
  backgroundColor,
  borderColor,
  title = "Traffic Overview",
  titleColor,
  height = 256,
  borderRadius = 12,
  borderWidth = 1,
  padding = 16,
  showGrid = false,
  showTooltip = true,
  data,
  areaColor = "#ec4899",
  lineColor,
  gradientOpacity = 30,
  showXAxis = false,
  showYAxis = false,
  editable = false,
  onTitleChange,
}: SimpleAreaChartProps & ChartProps) => {
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : undefined;
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : undefined;
  const titleRgb = titleColor && titleColor.trim() !== "" 
    ? (titleColor.startsWith("rgb") ? titleColor : (hexToRgb(titleColor) || titleColor))
    : undefined;
  const areaRgb = areaColor && areaColor.trim() !== "" 
    ? (areaColor.startsWith("rgb") ? areaColor : (hexToRgb(areaColor) || areaColor))
    : "#ec4899";
  const lineRgb = lineColor && lineColor.trim() !== "" 
    ? (lineColor.startsWith("rgb") ? lineColor : (hexToRgb(lineColor) || areaRgb))
    : areaRgb;

  return (
    <div 
      className={cn("w-full border bg-neutral-900", className)}
      style={{
        ...(bgRgb && { backgroundColor: bgRgb }),
        ...(borderRgb && { borderColor: borderRgb }),
        ...(borderRadius !== 12 && { borderRadius: `${borderRadius}px` }),
        ...(borderWidth !== 1 && { borderWidth: `${borderWidth}px`, borderStyle: "solid" }),
        height: `${height}px`,
        padding: `${padding}px`,
      }}
    >
      {title && (
        <EditableText
          value={title}
          onChange={onTitleChange}
          editable={editable}
          className="text-sm font-medium mb-4 block"
          style={{
            ...(titleRgb && { color: titleRgb }),
            ...(!titleRgb && { color: "rgb(163 163 163)" }),
          }}
        />
      )}
      <ResponsiveContainer width="100%" height={title ? "calc(100% - 2rem)" : "100%"}>
        <AreaChart data={(() => {
          if (data && data.trim() !== "") {
            return data.split("\n").filter(line => line.trim() !== "").map(line => {
              const [name, value] = line.split(",").map(s => s.trim())
              return { name: name || "", uv: parseFloat(value) || 0 }
            })
          }
          return MOCK_DATA
        })()}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />}
          {showXAxis && <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" />}
          {showYAxis && <YAxis stroke="rgba(255,255,255,0.3)" />}
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={areaRgb} stopOpacity={gradientOpacity / 100}/>
              <stop offset="95%" stopColor={areaRgb} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="uv" stroke={lineRgb} fillOpacity={1} fill="url(#colorUv)" />
          {showTooltip && (
            <Tooltip 
              contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// Extended props for SimplePieChart
export interface SimplePieChartProps extends ChartProps {
  data?: string;
  outerRadius?: number;
  showLegend?: boolean;
  legendPosition?: "top" | "bottom" | "left" | "right";
  colors?: string;
  showLabels?: boolean;
}

// 4. Simple Pie Chart
export const SimplePieChart = ({
  className,
  backgroundColor,
  borderColor,
  title = "Device Usage",
  titleColor,
  height = 256,
  borderRadius = 12,
  borderWidth = 1,
  padding = 16,
  showTooltip = true,
  data,
  outerRadius = 80,
  showLegend = false,
  legendPosition = "right",
  colors = "#6366f1\n#8b5cf6\n#ec4899\n#f43f5e",
  showLabels = false,
  editable = false,
  onTitleChange,
}: SimplePieChartProps & ChartProps) => {
  const [containerSize, setContainerSize] = React.useState({ width: 0, height: height });
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      setContainerSize({ width, height });
    }
  }, [height]);

  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : undefined;
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : undefined;
  const titleRgb = titleColor && titleColor.trim() !== "" 
    ? (titleColor.startsWith("rgb") ? titleColor : (hexToRgb(titleColor) || titleColor))
    : undefined;
  
  const colorList = colors.split("\n").filter(c => c.trim() !== "").map(c => c.trim());
  const chartColors = colorList.length > 0 ? colorList : COLORS;

  const handleResize = (newWidth: number, newHeight: number) => {
    setContainerSize({ width: newWidth, height: newHeight });
  };

  return (
    <div 
      ref={containerRef}
      className={cn("w-full border bg-neutral-900 flex flex-col relative", className)}
      style={{
        ...(bgRgb && { backgroundColor: bgRgb }),
        ...(borderRgb && { borderColor: borderRgb }),
        ...(borderRadius !== 12 && { borderRadius: `${borderRadius}px` }),
        ...(borderWidth !== 1 && { borderWidth: `${borderWidth}px`, borderStyle: "solid" }),
        height: `${containerSize.height}px`,
        width: containerSize.width > 0 ? `${containerSize.width}px` : '100%',
        padding: `${padding}px`,
      }}
    >
      {title && (
        <div className="flex justify-center mb-0.5 shrink-0">
          <EditableText
            value={title}
            onChange={onTitleChange}
            editable={editable}
            className="text-sm font-medium text-center"
            style={{
              ...(titleRgb && { color: titleRgb }),
              ...(!titleRgb && { color: "rgb(163 163 163)" }),
            }}
          />
        </div>
      )}
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={(() => {
                if (data && data.trim() !== "") {
                  return data.split("\n").filter(line => line.trim() !== "").map(line => {
                    const [name, value] = line.split(",").map(s => s.trim())
                    return { name: name || "", value: parseFloat(value) || 0 }
                  })
                }
                return PIE_DATA
              })()}
              cx="50%"
              cy="50%"
              outerRadius={outerRadius}
              fill="#8884d8"
              dataKey="value"
              label={showLabels ? ({ name, value, percent }: any) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)` : false}
              labelLine={showLabels}
            >
              {(() => {
                const pieData = data && data.trim() !== "" 
                  ? data.split("\n").filter(line => line.trim() !== "").map(line => {
                      const [name, value] = line.split(",").map(s => s.trim())
                      return { name: name || "", value: parseFloat(value) || 0 }
                    })
                  : PIE_DATA
                return pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                ))
              })()}
            </Pie>
            {showTooltip && (
              <Tooltip contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }} />
            )}
            {showLegend && <Legend />}
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Extended props for DonutChart
export interface DonutChartProps extends ChartProps {
  data?: string;
  innerRadius?: number;
  outerRadius?: number;
  paddingAngle?: number;
  showLegend?: boolean;
  legendPosition?: "top" | "bottom" | "left" | "right";
  colors?: string;
  showLabels?: boolean;
}

// 5. Donut Chart
export const DonutChart = ({
  className,
  backgroundColor,
  borderColor,
  title = "Revenue Sources",
  titleColor,
  height = 256,
  borderRadius = 12,
  borderWidth = 1,
  padding = 16,
  showTooltip = true,
  data,
  innerRadius = 60,
  outerRadius = 80,
  paddingAngle = 5,
  showLegend = false,
  legendPosition = "right",
  colors = "#6366f1\n#8b5cf6\n#ec4899\n#f43f5e",
  showLabels = false,
  editable = false,
  onTitleChange,
}: DonutChartProps & ChartProps) => {
  const [containerSize, setContainerSize] = React.useState({ width: 0, height: height });
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      setContainerSize({ width, height });
    }
  }, [height]);

  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : undefined;
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : undefined;
  const titleRgb = titleColor && titleColor.trim() !== "" 
    ? (titleColor.startsWith("rgb") ? titleColor : (hexToRgb(titleColor) || titleColor))
    : undefined;
  
  const colorList = colors.split("\n").filter(c => c.trim() !== "").map(c => c.trim());
  const chartColors = colorList.length > 0 ? colorList : COLORS;

  const handleResize = (newWidth: number, newHeight: number) => {
    setContainerSize({ width: newWidth, height: newHeight });
  };

  return (
    <div 
      ref={containerRef}
      className={cn("w-full border bg-neutral-900 flex flex-col relative", className)}
      style={{
        ...(bgRgb && { backgroundColor: bgRgb }),
        ...(borderRgb && { borderColor: borderRgb }),
        ...(borderRadius !== 12 && { borderRadius: `${borderRadius}px` }),
        ...(borderWidth !== 1 && { borderWidth: `${borderWidth}px`, borderStyle: "solid" }),
        height: `${containerSize.height}px`,
        width: containerSize.width > 0 ? `${containerSize.width}px` : '100%',
        padding: `${padding}px`,
      }}
    >
      {title && (
        <div className="flex justify-center mb-0.5 shrink-0">
          <EditableText
            value={title}
            onChange={onTitleChange}
            editable={editable}
            className="text-sm font-medium text-center"
            style={{
              ...(titleRgb && { color: titleRgb }),
              ...(!titleRgb && { color: "rgb(163 163 163)" }),
            }}
          />
        </div>
      )}
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={(() => {
                if (data && data.trim() !== "") {
                  return data.split("\n").filter(line => line.trim() !== "").map(line => {
                    const [name, value] = line.split(",").map(s => s.trim())
                    return { name: name || "", value: parseFloat(value) || 0 }
                  })
                }
                return PIE_DATA
              })()}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              fill="#8884d8"
              paddingAngle={paddingAngle}
              dataKey="value"
              label={showLabels ? ({ name, value, percent }: any) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)` : false}
              labelLine={showLabels}
            >
              {(() => {
                const pieData = data && data.trim() !== "" 
                  ? data.split("\n").filter(line => line.trim() !== "").map(line => {
                      const [name, value] = line.split(",").map(s => s.trim())
                      return { name: name || "", value: parseFloat(value) || 0 }
                    })
                  : PIE_DATA
                return pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                ))
              })()}
            </Pie>
            {showTooltip && (
              <Tooltip contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }} />
            )}
            {showLegend && <Legend />}
          </PieChart>
        </ResponsiveContainer>
      </div>
      {editable && <ResizeHandle onResize={handleResize} />}
    </div>
  );
};

// 6. Sparkline Stat
export interface SparklineStatProps extends ChartProps {
  value?: string;
  label?: string;
  valueColor?: string;
  labelColor?: string;
  lineColor?: string;
  lineWidth?: number;
  sparklineWidth?: number;
  sparklineHeight?: number;
}

export const SparklineStat = ({
  className,
  backgroundColor,
  borderColor,
  borderRadius = 12,
  borderWidth = 1,
  padding = 24,
  value = "8,420",
  label = "Daily Views",
  valueColor,
  labelColor,
  lineColor = "#22c55e",
  lineWidth = 2,
  sparklineWidth = 96,
  sparklineHeight = 40,
  editable = false,
  onTitleChange,
  onLabelChange,
  onValueChange,
}: SparklineStatProps & ChartProps) => {
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : undefined;
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : undefined;
  const valueRgb = valueColor && valueColor.trim() !== "" 
    ? (valueColor.startsWith("rgb") ? valueColor : (hexToRgb(valueColor) || valueColor))
    : undefined;
  const labelRgb = labelColor && labelColor.trim() !== "" 
    ? (labelColor.startsWith("rgb") ? labelColor : (hexToRgb(labelColor) || labelColor))
    : undefined;
  const lineRgb = lineColor && lineColor.trim() !== "" 
    ? (lineColor.startsWith("rgb") ? lineColor : (hexToRgb(lineColor) || lineColor))
    : "#22c55e";

  return (
    <div 
      className={cn("w-full border bg-neutral-900", className)}
      style={{
        ...(bgRgb && { backgroundColor: bgRgb }),
        ...(borderRgb && { borderColor: borderRgb }),
        ...(borderRadius !== 12 && { borderRadius: `${borderRadius}px` }),
        ...(borderWidth !== 1 && { borderWidth: `${borderWidth}px`, borderStyle: "solid" }),
        padding: `${padding}px`,
      }}
    >
      <div className="flex items-end justify-between">
        <div>
          <EditableText
            value={label}
            onChange={onLabelChange || (onTitleChange ? (text) => {
              // Fallback to onTitleChange if onLabelChange not provided
              onTitleChange(text)
            } : undefined)}
            editable={editable && !!(onLabelChange || onTitleChange)}
            className="text-sm font-medium block"
            style={{
              ...(labelRgb && { color: labelRgb }),
              ...(!labelRgb && { color: "rgb(115 115 115)" }),
            }}
          />
          <EditableText
            value={value}
            onChange={onValueChange || (onTitleChange ? (text) => {
              // Fallback to onTitleChange if onValueChange not provided
              onTitleChange(text)
            } : undefined)}
            editable={editable && !!(onValueChange || onTitleChange)}
            className="text-3xl font-bold block"
            style={{
              ...(valueRgb && { color: valueRgb }),
              ...(!valueRgb && { color: "rgb(255 255 255)" }),
            }}
          />
        </div>
        <div style={{ height: `${sparklineHeight}px`, width: `${sparklineWidth}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MOCK_DATA}>
              <Line type="monotone" dataKey="value" stroke={lineRgb} strokeWidth={lineWidth} dot={false} />
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

