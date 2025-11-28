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
  height: {
    control: "slider",
    min: 200,
    max: 800,
    default: 256,
    description: "Chart height in pixels.",
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
      barColor: {
        control: "color",
        default: "#6366f1",
        description: "Bar color.",
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
      lineColor: {
        control: "color",
        default: "#8b5cf6",
        description: "Line color.",
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
      areaColor: {
        control: "color",
        default: "#ec4899",
        description: "Area color.",
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
      ...commonChartProps,
    },
  },
  {
    slug: "donut-chart",
    name: "Donut Chart",
    componentName: "DonutChart",
    description: "A donut chart with inner radius.",
    tags: ["chart", "donut", "proportion", "visualization"],
    props: {
      ...commonChartProps,
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
      lineColor: {
        control: "color",
        default: "#22c55e",
        description: "Sparkline color.",
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
    },
  },
]

