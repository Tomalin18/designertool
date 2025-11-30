export type TablePropControl =
  | "text"
  | "boolean"
  | "select"
  | "slider"
  | "color"
  | "textarea"
  | "number"

export interface TablePropDefinition {
  control: TablePropControl
  default: string | number | boolean
  description: string
  options?: string[]
  min?: number
  max?: number
  docType?: string
}

export interface TableSectionMeta {
  slug: string
  name: string
  componentName: string
  description: string
  tags: string[]
  props: Record<string, TablePropDefinition>
  groupingConfig?: any
}

// Common props for all tables
const commonTableProps: Record<string, TablePropDefinition> = {
  className: {
    control: "text",
    default: "",
    description: "Additional CSS classes to apply to the table.",
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
  textColor: {
    control: "color",
    default: "",
    description: "Text color (optional, uses default if empty).",
  },
}

export const tableSections: TableSectionMeta[] = [
  {
    slug: "basic-table",
    name: "Basic Table",
    componentName: "BasicTable",
    description: "A simple table with header and rows.",
    tags: ["table", "basic", "data", "display"],
    props: {
      ...commonTableProps,
    },
  },
  {
    slug: "striped-table",
    name: "Striped Table",
    componentName: "StripedTable",
    description: "A table with alternating row colors.",
    tags: ["table", "striped", "data", "display"],
    props: {
      ...commonTableProps,
    },
  },
  {
    slug: "user-directory-table",
    name: "User Directory Table",
    componentName: "UserDirectoryTable",
    description: "A table displaying user information with avatars and actions.",
    tags: ["table", "user", "directory", "data"],
    props: {
      ...commonTableProps,
    },
  },
  {
    slug: "transaction-table",
    name: "Transaction Table",
    componentName: "TransactionTable",
    description: "A table for displaying transaction history.",
    tags: ["table", "transaction", "finance", "data"],
    props: {
      ...commonTableProps,
    },
  },
  {
    slug: "status-board",
    name: "Status Board",
    componentName: "StatusBoard",
    description: "A grid-based status board for server monitoring.",
    tags: ["table", "status", "monitoring", "grid"],
    props: {
      ...commonTableProps,
    },
  },
  {
    slug: "file-browser-table",
    name: "File Browser Table",
    componentName: "FileBrowserTable",
    description: "A table for browsing files with icons.",
    tags: ["table", "file", "browser", "data"],
    props: {
      ...commonTableProps,
    },
  },
  {
    slug: "rich-data-grid",
    name: "Rich Data Grid",
    componentName: "RichDataGrid",
    description: "A feature-rich data grid with checkboxes and actions.",
    tags: ["table", "grid", "data", "advanced"],
    props: {
      ...commonTableProps,
    },
  },
  {
    slug: "invoice-table",
    name: "Invoice Table",
    componentName: "InvoiceTable",
    description: "A clean invoice table with light theme.",
    tags: ["table", "invoice", "finance", "light"],
    props: {
      ...commonTableProps,
    },
  },
  {
    slug: "team-availability-table",
    name: "Team Availability Table",
    componentName: "TeamAvailabilityTable",
    description: "A visual availability calendar for team members.",
    tags: ["table", "team", "availability", "calendar"],
    props: {
      ...commonTableProps,
    },
  },
  {
    slug: "leaderboard-table",
    name: "Leaderboard Table",
    componentName: "LeaderboardTable",
    description: "A styled leaderboard with rankings.",
    tags: ["table", "leaderboard", "ranking", "display"],
    props: {
      ...commonTableProps,
    },
  },
  {
    slug: "project-progress-table",
    name: "Project Progress Table",
    componentName: "ProjectProgressTable",
    description: "A table showing project progress with progress bars.",
    tags: ["table", "project", "progress", "data"],
    props: {
      ...commonTableProps,
    },
  },
  {
    slug: "activity-log-table",
    name: "Activity Log Table",
    componentName: "ActivityLogTable",
    description: "A timeline-style activity log.",
    tags: ["table", "activity", "log", "timeline"],
    props: {
      ...commonTableProps,
    },
  },
]

