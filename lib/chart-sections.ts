export type ChartPropControl =
  | "text"
  | "boolean"
  | "select"
  | "slider"
  | "color"
  | "textarea"
  | "number"

export interface ChartPropDefinition {
  control: ChartPropControl
  default: string | number | boolean
  description: string
  options?: string[]
  min?: number
  max?: number
  docType?: string
}

export interface ChartSectionMeta {
  slug: string
  name: string
  componentName: string
  description: string
  tags: string[]
  props: Record<string, ChartPropDefinition>
  groupingConfig?: any
}

// Common props for all charts
const commonChartProps: Record<string, ChartPropDefinition> = {
  className: {
    control: "text",
    default: "",
    description: "Additional CSS classes to apply to the chart.",
  },
  backgroundColor: {
    control: "color",
    default: "",
    description: "Background color (optional, uses default if empty).",
  },
  borderColor: {
    control: "color",
    default: "",
    description: "Border color (optional, uses default if empty).",
  },
  title: {
    control: "text",
    default: "",
    description: "Chart title (optional).",
  },
  titleColor: {
    control: "color",
    default: "",
    description: "Title text color (optional).",
  },
  titleFontSize: {
    control: "slider",
    min: 10,
    max: 32,
    default: 14,
    description: "Title font size in pixels.",
  },
  titleFontWeight: {
    control: "select",
    default: "medium",
    options: ["normal", "medium", "semibold", "bold"],
    description: "Title font weight.",
  },
  height: {
    control: "slider",
    min: 200,
    max: 800,
    default: 256,
    description: "Chart height in pixels.",
  },
  borderRadius: {
    control: "slider",
    min: 0,
    max: 32,
    default: 12,
    description: "Border radius in pixels.",
  },
  borderWidth: {
    control: "slider",
    min: 0,
    max: 4,
    default: 1,
    description: "Border width in pixels.",
  },
  padding: {
    control: "slider",
    min: 8,
    max: 32,
    default: 16,
    description: "Chart padding in pixels.",
  },
  showGrid: {
    control: "boolean",
    default: false,
    description: "Show chart grid lines.",
  },
  showTooltip: {
    control: "boolean",
    default: true,
    description: "Show tooltip on hover.",
  },
}

export const chartSections: ChartSectionMeta[] = [
  {
    slug: "simple-bar-chart",
    name: "Simple Bar Chart",
    componentName: "SimpleBarChart",
    description: "A basic bar chart showing data values.",
    tags: ["chart", "bar", "data", "visualization"],
    props: {
      ...commonChartProps,
      data: {
        control: "textarea",
        default: "Mon,4000\nTue,3000\nWed,2000\nThu,2780\nFri,1890\nSat,2390\nSun,3490",
        description: "Chart data in format: name,value (one per line).",
      },
      barColor: {
        control: "color",
        default: "#6366f1",
        description: "Bar color.",
      },
      barRadius: {
        control: "slider",
        min: 0,
        max: 16,
        default: 4,
        description: "Bar corner radius in pixels.",
      },
      showXAxis: {
        control: "boolean",
        default: false,
        description: "Show X axis labels.",
      },
      showYAxis: {
        control: "boolean",
        default: false,
        description: "Show Y axis labels.",
      },
    },
  },
  {
    slug: "simple-line-chart",
    name: "Simple Line Chart",
    componentName: "SimpleLineChart",
    description: "A basic line chart showing trends over time.",
    tags: ["chart", "line", "trend", "visualization"],
    props: {
      ...commonChartProps,
      data: {
        control: "textarea",
        default: "Mon,4000\nTue,3000\nWed,2000\nThu,2780\nFri,1890\nSat,2390\nSun,3490",
        description: "Chart data in format: name,value (one per line).",
      },
      lineColor: {
        control: "color",
        default: "#8b5cf6",
        description: "Line color.",
      },
      lineWidth: {
        control: "slider",
        min: 1,
        max: 6,
        default: 2,
        description: "Line width in pixels.",
      },
      showDots: {
        control: "boolean",
        default: false,
        description: "Show data point dots.",
      },
      dotColor: {
        control: "color",
        default: "",
        description: "Dot color (uses lineColor if empty).",
      },
      showXAxis: {
        control: "boolean",
        default: false,
        description: "Show X axis labels.",
      },
      showYAxis: {
        control: "boolean",
        default: false,
        description: "Show Y axis labels.",
      },
    },
  },
  {
    slug: "simple-area-chart",
    name: "Simple Area Chart",
    componentName: "SimpleAreaChart",
    description: "An area chart with gradient fill.",
    tags: ["chart", "area", "gradient", "visualization"],
    props: {
      ...commonChartProps,
      data: {
        control: "textarea",
        default: "Mon,2400\nTue,1398\nWed,9800\nThu,3908\nFri,4800\nSat,3800\nSun,4300",
        description: "Chart data in format: name,value (one per line).",
      },
      areaColor: {
        control: "color",
        default: "#ec4899",
        description: "Area color.",
      },
      lineColor: {
        control: "color",
        default: "",
        description: "Line color (uses areaColor if empty).",
      },
      gradientOpacity: {
        control: "slider",
        min: 0,
        max: 100,
        default: 30,
        description: "Gradient opacity percentage.",
      },
      showXAxis: {
        control: "boolean",
        default: false,
        description: "Show X axis labels.",
      },
      showYAxis: {
        control: "boolean",
        default: false,
        description: "Show Y axis labels.",
      },
    },
  },
  {
    slug: "simple-pie-chart",
    name: "Simple Pie Chart",
    componentName: "SimplePieChart",
    description: "A basic pie chart showing proportions.",
    tags: ["chart", "pie", "proportion", "visualization"],
    props: {
      className: commonChartProps.className,
      colors: {
        control: "textarea",
        default: "#6366f1\n#8b5cf6\n#ec4899\n#f43f5e",
        description: "Chart colors, one per line (hex format).",
      },
      ...commonChartProps,
      outerRadius: {
        control: "slider",
        min: 40,
        max: 150,
        default: 80,
        description: "Pie chart outer radius in pixels.",
      },
      showLegend: {
        control: "boolean",
        default: false,
        description: "Show chart legend.",
      },
      legendPosition: {
        control: "select",
        default: "right",
        options: ["top", "bottom", "left", "right"],
        description: "Legend position.",
      },
      data: {
        control: "textarea",
        default: "Group A,400\nGroup B,300\nGroup C,300\nGroup D,200",
        description: "Chart data in format: name,value (one per line).",
      },
      showLabels: {
        control: "boolean",
        default: false,
        description: "Show data labels directly on chart (instead of hover only).",
      },
    },
  },
  {
    slug: "donut-chart",
    name: "Donut Chart",
    componentName: "DonutChart",
    description: "A donut chart with inner radius.",
    tags: ["chart", "donut", "proportion", "visualization"],
    props: {
      className: commonChartProps.className,
      colors: {
        control: "textarea",
        default: "#6366f1\n#8b5cf6\n#ec4899\n#f43f5e",
        description: "Chart colors, one per line (hex format).",
      },
      ...commonChartProps,
      data: {
        control: "textarea",
        default: "Group A,400\nGroup B,300\nGroup C,300\nGroup D,200",
        description: "Chart data in format: name,value (one per line).",
      },
      innerRadius: {
        control: "slider",
        min: 20,
        max: 80,
        default: 60,
        description: "Inner radius in pixels.",
      },
      outerRadius: {
        control: "slider",
        min: 40,
        max: 150,
        default: 80,
        description: "Outer radius in pixels.",
      },
      paddingAngle: {
        control: "slider",
        min: 0,
        max: 20,
        default: 5,
        description: "Padding angle between segments in degrees.",
      },
      showLegend: {
        control: "boolean",
        default: false,
        description: "Show chart legend.",
      },
      legendPosition: {
        control: "select",
        default: "right",
        options: ["top", "bottom", "left", "right"],
        description: "Legend position.",
      },
      showLabels: {
        control: "boolean",
        default: false,
        description: "Show data labels directly on chart (instead of hover only).",
      },
    },
  },
  {
    slug: "sparkline-stat",
    name: "Sparkline Stat",
    componentName: "SparklineStat",
    description: "A compact sparkline chart with statistics.",
    tags: ["chart", "sparkline", "stat", "compact"],
    props: {
      ...commonChartProps,
      value: {
        control: "text",
        default: "8,420",
        description: "Main statistic value.",
      },
      label: {
        control: "text",
        default: "Daily Views",
        description: "Statistic label.",
      },
      valueColor: {
        control: "color",
        default: "",
        description: "Value text color (optional).",
      },
      labelColor: {
        control: "color",
        default: "",
        description: "Label text color (optional).",
      },
      lineColor: {
        control: "color",
        default: "#22c55e",
        description: "Sparkline color.",
      },
      lineWidth: {
        control: "slider",
        min: 1,
        max: 4,
        default: 2,
        description: "Sparkline width in pixels.",
      },
      sparklineWidth: {
        control: "slider",
        min: 60,
        max: 200,
        default: 96,
        description: "Sparkline chart width in pixels.",
      },
      sparklineHeight: {
        control: "slider",
        min: 20,
        max: 80,
        default: 40,
        description: "Sparkline chart height in pixels.",
      },
    },
  },
  {
    slug: "heatmap-visual",
    name: "Heatmap Visual",
    componentName: "HeatmapVisual",
    description: "A contribution heatmap visualization.",
    tags: ["chart", "heatmap", "contribution", "visualization"],
    props: {
      ...commonChartProps,
      weeks: {
        control: "slider",
        min: 4,
        max: 52,
        default: 52,
        description: "Number of weeks to display.",
      },
      daysPerWeek: {
        control: "slider",
        min: 5,
        max: 7,
        default: 7,
        description: "Number of days per week.",
      },
      intensityLevels: {
        control: "slider",
        min: 2,
        max: 5,
        default: 4,
        description: "Number of intensity levels.",
      },
      colorLevel1: {
        control: "color",
        default: "",
        description: "Level 1 color (lowest intensity, optional).",
      },
      colorLevel2: {
        control: "color",
        default: "#166534",
        description: "Level 2 color.",
      },
      colorLevel3: {
        control: "color",
        default: "#15803d",
        description: "Level 3 color.",
      },
      colorLevel4: {
        control: "color",
        default: "#22c55e",
        description: "Level 4 color (highest intensity).",
      },
      cellSize: {
        control: "slider",
        min: 8,
        max: 16,
        default: 10,
        description: "Cell size in pixels.",
      },
      cellGap: {
        control: "slider",
        min: 1,
        max: 4,
        default: 1,
        description: "Gap between cells in pixels.",
      },
    },
  },
  {
    slug: "gantt-visual",
    name: "Gantt Visual",
    componentName: "GanttVisual",
    description: "A Gantt chart for project timelines.",
    tags: ["chart", "gantt", "timeline", "project"],
    props: {
      ...commonChartProps,
      tasks: {
        control: "textarea",
        default: "Design Phase:0:40:indigo\nDevelopment:30:50:purple\nTesting:70:20:pink\nDeployment:85:15:green",
        description: "Tasks in format 'Name:Start%:Width%:Color', one per line.",
      },
      barHeight: {
        control: "slider",
        min: 4,
        max: 16,
        default: 8,
        description: "Task bar height in pixels.",
      },
      barRadius: {
        control: "slider",
        min: 0,
        max: 8,
        default: 4,
        description: "Task bar corner radius in pixels.",
      },
      timelineStart: {
        control: "text",
        default: "Week 1",
        description: "Timeline start label.",
      },
      timelineEnd: {
        control: "text",
        default: "Week 8",
        description: "Timeline end label.",
      },
      timelineMid: {
        control: "text",
        default: "Week 4",
        description: "Timeline middle label.",
      },
      timelineColor: {
        control: "color",
        default: "",
        description: "Timeline text color (optional).",
      },
    },
  },
]

