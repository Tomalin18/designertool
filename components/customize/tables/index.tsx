"use client"

import React from "react";
import { cn } from "../../../lib/utils";
import { 
  MoreHorizontal, 
  Filter, 
  FileText,
  Image as ImageIcon,
  MoreVertical,
  Download,
  ChevronLeft,
  ChevronRight,
  Plus,
  CheckCircle2,
} from "lucide-react";
import { tableSections } from "@/lib/table-sections";

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

// Common props interface
export interface TableProps {
  className?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
}

// 1. Basic Table
export const BasicTable = ({
  className,
  backgroundColor,
  borderColor,
  textColor,
}: TableProps) => {
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : undefined;
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : undefined;
  const textRgb = textColor && textColor.trim() !== "" 
    ? (textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor))
    : undefined;

  return (
    <div 
      className={cn("w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50", className)}
      style={{
        ...(bgRgb && { backgroundColor: bgRgb }),
        ...(borderRgb && { borderColor: borderRgb }),
      }}
    >
      <table className="w-full text-left text-sm text-neutral-400">
        <thead className="bg-neutral-900 text-neutral-200">
          <tr>
            <th className="px-6 py-3 font-medium">Name</th>
            <th className="px-6 py-3 font-medium">Title</th>
            <th className="px-6 py-3 font-medium">Email</th>
            <th className="px-6 py-3 font-medium">Role</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800">
          {[1, 2, 3].map((i) => (
            <tr key={i} className="hover:bg-neutral-800/50">
              <td className="px-6 py-4 font-medium text-white">John Doe {i}</td>
              <td className="px-6 py-4">Developer</td>
              <td className="px-6 py-4">john{i}@example.com</td>
              <td className="px-6 py-4">Admin</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// 2. Striped Table
export const StripedTable = ({
  className,
  backgroundColor,
  borderColor,
  textColor,
}: TableProps) => {
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : undefined;
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : undefined;

  return (
    <div 
      className={cn("w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950", className)}
      style={{
        ...(bgRgb && { backgroundColor: bgRgb }),
        ...(borderRgb && { borderColor: borderRgb }),
      }}
    >
      <table className="w-full text-left text-sm text-neutral-400">
        <thead className="border-b border-neutral-800 bg-neutral-900 font-bold text-white">
          <tr>
            <th className="px-6 py-4">Invoice</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Method</th>
            <th className="px-6 py-4 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {[
            { id: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
            { id: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
            { id: "INV003", status: "Paid", method: "Bank Transfer", amount: "$350.00" },
            { id: "INV004", status: "Paid", method: "Credit Card", amount: "$450.00" },
          ].map((row, i) => (
            <tr key={i} className={cn("group transition-colors hover:bg-neutral-800/50", i % 2 === 0 ? "bg-neutral-900/30" : "bg-transparent")}>
              <td className="px-6 py-4 font-medium text-white group-hover:text-indigo-400">{row.id}</td>
              <td className="px-6 py-4">{row.status}</td>
              <td className="px-6 py-4">{row.method}</td>
              <td className="px-6 py-4 text-right">{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// 3. User Directory Table
export const UserDirectoryTable = ({
  className,
  backgroundColor,
  borderColor,
  textColor,
}: TableProps) => {
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : undefined;
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : undefined;

  return (
    <div 
      className={cn("w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50", className)}
      style={{
        ...(bgRgb && { backgroundColor: bgRgb }),
        ...(borderRgb && { borderColor: borderRgb }),
      }}
    >
      <div className="flex items-center justify-between border-b border-neutral-800 p-4">
        <h3 className="font-bold text-white">Team Members</h3>
        <div className="flex gap-2">
          <button className="rounded-lg border border-neutral-700 p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white"><Filter size={16} /></button>
          <button className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-bold text-white hover:bg-indigo-500">Add Member</button>
        </div>
      </div>
      <table className="w-full text-left text-sm">
        <tbody className="divide-y divide-neutral-800">
          {[1, 2, 3].map((i) => (
            <tr key={i} className="group hover:bg-neutral-800/50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} className="h-10 w-10 rounded-full bg-neutral-800" alt="Avatar" />
                  <div>
                    <div className="font-bold text-white">Sarah Smith</div>
                    <div className="text-xs text-neutral-500">sarah@company.com</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500 ring-1 ring-inset ring-green-500/20">Active</span>
              </td>
              <td className="px-6 py-4 text-neutral-400">Product Designer</td>
              <td className="px-6 py-4 text-right">
                <button className="text-neutral-500 hover:text-white"><MoreHorizontal size={16} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// 4. Transaction Table
export const TransactionTable = ({
  className,
  backgroundColor,
  borderColor,
  textColor,
}: TableProps) => {
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : undefined;
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : undefined;

  return (
    <div 
      className={cn("w-full overflow-hidden rounded-xl border border-neutral-800 bg-black", className)}
      style={{
        ...(bgRgb && { backgroundColor: bgRgb }),
        ...(borderRgb && { borderColor: borderRgb }),
      }}
    >
      <div className="border-b border-neutral-800 p-4">
        <h3 className="font-mono text-sm font-bold uppercase text-neutral-500">Recent Transactions</h3>
      </div>
      <table className="w-full text-left text-sm text-neutral-400">
        <tbody className="divide-y divide-neutral-800">
          {[
            { t: "Spotify Subscription", d: "Oct 24", a: "-$12.99", i: "bg-green-500/20 text-green-500" },
            { t: "Freelance Payment", d: "Oct 23", a: "+$2,400.00", i: "bg-blue-500/20 text-blue-500" },
            { t: "Grocery Store", d: "Oct 21", a: "-$84.20", i: "bg-orange-500/20 text-orange-500" },
          ].map((item, i) => (
            <tr key={i} className="hover:bg-neutral-900">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold", item.i)}>
                    {item.t[0]}
                  </div>
                  <div>
                    <div className="font-medium text-white">{item.t}</div>
                    <div className="text-xs">{item.d}</div>
                  </div>
                </div>
              </td>
              <td className={cn("px-6 py-4 text-right font-mono font-medium", item.a.startsWith('+') ? "text-green-500" : "text-neutral-300")}>
                {item.a}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// 5. Status Board
export const StatusBoard = ({
  className,
  backgroundColor,
  borderColor,
  textColor,
}: TableProps) => {
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : undefined;
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : undefined;

  return (
    <div 
      className={cn("w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50", className)}
      style={{
        ...(bgRgb && { backgroundColor: bgRgb }),
        ...(borderRgb && { borderColor: borderRgb }),
      }}
    >
      <div className="grid grid-cols-4 gap-px bg-neutral-800 text-xs font-bold uppercase tracking-wider text-neutral-500">
        <div className="bg-neutral-900 px-6 py-3">Server</div>
        <div className="bg-neutral-900 px-6 py-3">Status</div>
        <div className="bg-neutral-900 px-6 py-3">Uptime</div>
        <div className="bg-neutral-900 px-6 py-3 text-right">Latency</div>
      </div>
      <div className="grid grid-cols-4 gap-px bg-neutral-800">
        {[
          { s: "US-East-1", st: "Operational", u: "99.99%", l: "24ms" },
          { s: "EU-West-1", st: "Operational", u: "99.95%", l: "42ms" },
          { s: "AP-South-1", st: "Degraded", u: "98.50%", l: "120ms" },
        ].map((row, i) => (
          <React.Fragment key={i}>
            <div className="bg-neutral-900 px-6 py-4 text-sm font-medium text-white">{row.s}</div>
            <div className="bg-neutral-900 px-6 py-4">
              <span className={cn("inline-flex items-center gap-1.5 rounded px-2 py-1 text-xs font-medium", row.st === "Operational" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500")}>
                <div className={cn("h-1.5 w-1.5 rounded-full", row.st === "Operational" ? "bg-green-500" : "bg-yellow-500")} />
                {row.st}
              </span>
            </div>
            <div className="bg-neutral-900 px-6 py-4 text-sm text-neutral-400 font-mono">{row.u}</div>
            <div className="bg-neutral-900 px-6 py-4 text-right text-sm text-neutral-400 font-mono">{row.l}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// 6. File Browser Table
export const FileBrowserTable = ({
  className,
  backgroundColor,
  borderColor,
  textColor,
}: TableProps) => {
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : undefined;
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : undefined;

  return (
    <div 
      className={cn("w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900", className)}
      style={{
        ...(bgRgb && { backgroundColor: bgRgb }),
        ...(borderRgb && { borderColor: borderRgb }),
      }}
    >
      <table className="w-full text-left text-sm text-neutral-400">
        <thead className="border-b border-neutral-800 bg-neutral-900/50 text-xs font-medium uppercase text-neutral-500">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Date Modified</th>
            <th className="px-4 py-3 text-right">Size</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800">
          {[
            { n: "Project Proposal.pdf", d: "Oct 24, 2024", s: "2.4 MB", i: FileText, c: "text-red-400" },
            { n: "Design Assets", d: "Oct 23, 2024", s: "-", i: ImageIcon, c: "text-blue-400" },
            { n: "Quarterly Report.docx", d: "Oct 20, 2024", s: "1.2 MB", i: FileText, c: "text-blue-400" },
          ].map((file, i) => (
            <tr key={i} className="hover:bg-neutral-800/50 cursor-pointer">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3 text-white">
                  <file.i size={18} className={file.c} />
                  {file.n}
                </div>
              </td>
              <td className="px-4 py-3 text-xs">{file.d}</td>
              <td className="px-4 py-3 text-right text-xs font-mono">{file.s}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// 7. Rich Data Grid
export const RichDataGrid = ({
  className,
  backgroundColor,
  borderColor,
  textColor,
}: TableProps) => {
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : undefined;
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : undefined;

  return (
    <div 
      className={cn("w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 shadow-2xl", className)}
      style={{
        ...(bgRgb && { backgroundColor: bgRgb }),
        ...(borderRgb && { borderColor: borderRgb }),
      }}
    >
      <div className="flex items-center justify-between border-b border-neutral-800 p-3 bg-neutral-900/50">
        <div className="flex items-center gap-2">
          <input type="checkbox" className="rounded border-neutral-700 bg-neutral-800 text-indigo-600 focus:ring-0" />
          <span className="text-xs font-medium text-neutral-400">3 selected</span>
        </div>
        <div className="flex gap-2">
          <button className="p-1 text-neutral-400 hover:text-white"><Download size={16} /></button>
          <button className="p-1 text-neutral-400 hover:text-white"><MoreVertical size={16} /></button>
        </div>
      </div>
      <table className="w-full text-left text-sm">
        <thead className="bg-neutral-800/50 text-xs font-medium text-neutral-400">
          <tr>
            <th className="w-8 px-4 py-3"><input type="checkbox" className="rounded border-neutral-700 bg-neutral-800" /></th>
            <th className="px-4 py-3">Product</th>
            <th className="px-4 py-3">Stock</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Price</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800 text-neutral-300">
          {[
            { p: "Wireless Headphones", s: "In Stock", c: "Electronics", pr: "$299" },
            { p: "Ergonomic Chair", s: "Low Stock", c: "Furniture", pr: "$599" },
            { p: "Mechanical Keyboard", s: "Out of Stock", c: "Electronics", pr: "$149" },
          ].map((row, i) => (
            <tr key={i} className="hover:bg-neutral-800/30">
              <td className="px-4 py-3"><input type="checkbox" className="rounded border-neutral-700 bg-neutral-800" /></td>
              <td className="px-4 py-3 font-medium text-white">{row.p}</td>
              <td className="px-4 py-3">
                <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium", 
                  row.s === "In Stock" ? "bg-green-500/10 text-green-500" : 
                  row.s === "Low Stock" ? "bg-yellow-500/10 text-yellow-500" : "bg-red-500/10 text-red-500"
                )}>
                  {row.s}
                </span>
              </td>
              <td className="px-4 py-3 text-neutral-500">{row.c}</td>
              <td className="px-4 py-3 font-mono">{row.pr}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between border-t border-neutral-800 p-3 text-xs text-neutral-500">
        <span>Page 1 of 10</span>
        <div className="flex gap-1">
          <button className="rounded p-1 hover:bg-neutral-800 hover:text-white"><ChevronLeft size={14}/></button>
          <button className="rounded p-1 hover:bg-neutral-800 hover:text-white"><ChevronRight size={14}/></button>
        </div>
      </div>
    </div>
  );
};

// 8. Invoice Table
export const InvoiceTable = ({
  className,
  backgroundColor,
  borderColor,
  textColor,
}: TableProps) => {
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : undefined;
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : undefined;

  return (
    <div 
      className={cn("w-full rounded-xl border border-neutral-200 bg-white", className)}
      style={{
        ...(bgRgb && { backgroundColor: bgRgb }),
        ...(borderRgb && { borderColor: borderRgb }),
      }}
    >
      <table className="w-full text-left text-sm text-neutral-600">
        <thead className="bg-neutral-50 text-xs font-bold uppercase text-neutral-500">
          <tr>
            <th className="px-6 py-4">Invoice ID</th>
            <th className="px-6 py-4">Client</th>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4 text-right">Amount</th>
            <th className="px-6 py-4"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {[1, 2, 3].map((i) => (
            <tr key={i} className="hover:bg-neutral-50">
              <td className="px-6 py-4 font-mono font-medium text-indigo-600">#INV-2024-00{i}</td>
              <td className="px-6 py-4 font-medium text-neutral-900">Acme Corp {i}</td>
              <td className="px-6 py-4 text-neutral-500">Oct 24, 2024</td>
              <td className="px-6 py-4 text-right font-bold text-neutral-900">$1,200.00</td>
              <td className="px-6 py-4 text-right">
                <button className="rounded-md border border-neutral-200 px-3 py-1 text-xs font-bold hover:bg-neutral-100">Download</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// 9. Team Availability Table
export const TeamAvailabilityTable = ({
  className,
  backgroundColor,
  borderColor,
  textColor,
}: TableProps) => {
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
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-bold text-white">Team Availability</h3>
        <div className="flex gap-2 text-xs">
          <div className="flex items-center gap-1"><div className="h-2 w-2 rounded bg-green-500" /><span className="text-neutral-400">Available</span></div>
          <div className="flex items-center gap-1"><div className="h-2 w-2 rounded bg-red-500" /><span className="text-neutral-400">Busy</span></div>
        </div>
      </div>
      <div className="space-y-4">
        {[
          { n: "Alex", av: [1, 1, 0, 1, 1] },
          { n: "Sarah", av: [1, 0, 1, 1, 1] },
          { n: "Mike", av: [0, 1, 1, 0, 1] },
        ].map((user, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="w-16 text-sm font-medium text-neutral-300">{user.n}</div>
            <div className="flex flex-1 gap-1">
              {user.av.map((status, j) => (
                <div key={j} className={cn("h-8 flex-1 rounded-md transition-all hover:opacity-80", status ? "bg-green-500/20 border border-green-500/30" : "bg-red-500/20 border border-red-500/30")} />
              ))}
            </div>
          </div>
        ))}
        <div className="flex pl-20 gap-1 text-center text-xs text-neutral-500">
          {["Mon", "Tue", "Wed", "Thu", "Fri"].map(d => <div key={d} className="flex-1">{d}</div>)}
        </div>
      </div>
    </div>
  );
};

// 10. Leaderboard Table
export const LeaderboardTable = ({
  className,
  backgroundColor,
  borderColor,
  textColor,
}: TableProps) => {
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : undefined;
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : undefined;

  return (
    <div 
      className={cn("w-full overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900 to-purple-900 p-1", className)}
      style={{
        ...(bgRgb && { backgroundColor: bgRgb }),
        ...(borderRgb && { borderColor: borderRgb }),
      }}
    >
      <div className="rounded-xl bg-black/40 backdrop-blur-xl">
        <div className="p-4 text-center">
          <h3 className="text-lg font-black uppercase italic tracking-wider text-white">Top Performers</h3>
        </div>
        <table className="w-full text-left text-sm text-white">
          <tbody>
            {[
              { r: 1, n: "Alex Chen", s: "24,500", c: "bg-yellow-500" },
              { r: 2, n: "Sarah Smith", s: "22,100", c: "bg-neutral-400" },
              { r: 3, n: "Mike Jones", s: "19,400", c: "bg-orange-600" },
            ].map((row, i) => (
              <tr key={i} className="border-t border-white/10 hover:bg-white/5">
                <td className="px-6 py-4 w-16">
                  <div className={cn("flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-black", row.c)}>{row.r}</div>
                </td>
                <td className="px-6 py-4 font-bold">{row.n}</td>
                <td className="px-6 py-4 text-right font-mono text-indigo-300">{row.s} xp</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 11. Project Progress Table
export const ProjectProgressTable = ({
  className,
  backgroundColor,
  borderColor,
  textColor,
}: TableProps) => {
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : undefined;
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : undefined;

  return (
    <div 
      className={cn("w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900", className)}
      style={{
        ...(bgRgb && { backgroundColor: bgRgb }),
        ...(borderRgb && { borderColor: borderRgb }),
      }}
    >
      <table className="w-full text-left text-sm text-neutral-400">
        <thead className="bg-neutral-950 text-neutral-300">
          <tr>
            <th className="px-6 py-3 font-medium">Project</th>
            <th className="px-6 py-3 font-medium">Progress</th>
            <th className="px-6 py-3 font-medium">Due Date</th>
            <th className="px-6 py-3 font-medium">Team</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800">
          {[
            { p: "Website Redesign", prog: 75, d: "Nov 15", t: [1,2,3] },
            { p: "Mobile App", prog: 30, d: "Dec 01", t: [4,5] },
            { p: "Dashboard V2", prog: 90, d: "Oct 30", t: [1] },
          ].map((row, i) => (
            <tr key={i} className="hover:bg-neutral-800/30">
              <td className="px-6 py-4 font-medium text-white">{row.p}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-24 rounded-full bg-neutral-800">
                    <div className="h-full rounded-full bg-indigo-500" style={{ width: `${row.prog}%` }} />
                  </div>
                  <span className="text-xs">{row.prog}%</span>
                </div>
              </td>
              <td className="px-6 py-4">{row.d}</td>
              <td className="px-6 py-4">
                <div className="flex -space-x-2">
                  {row.t.map(u => (
                    <div key={u} className="h-6 w-6 rounded-full border-2 border-neutral-900 bg-neutral-700" />
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// 12. Activity Log Table
export const ActivityLogTable = ({
  className,
  backgroundColor,
  borderColor,
  textColor,
}: TableProps) => {
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
      <h3 className="mb-4 font-bold text-white">Recent Activity</h3>
      <div className="relative border-l border-neutral-800 ml-3 space-y-6 pl-6">
        {[
          { a: "Created new project", u: "Alex M.", t: "2m ago", i: Plus },
          { a: "Updated settings", u: "Sarah J.", t: "1h ago", i: FileText },
          { a: "Deployed to production", u: "System", t: "3h ago", i: CheckCircle2 },
        ].map((item, i) => (
          <div key={i} className="relative">
            <div className="absolute -left-[31px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-800 border-2 border-neutral-900 text-neutral-400">
              <item.i size={12} />
            </div>
            <p className="text-sm text-neutral-300">
              <span className="font-bold text-white">{item.u}</span> {item.a}
            </p>
            <span className="text-xs text-neutral-500">{item.t}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export component map
export const tableComponentsByName: Record<string, React.ComponentType<any>> = {
  BasicTable,
  StripedTable,
  UserDirectoryTable,
  TransactionTable,
  StatusBoard,
  FileBrowserTable,
  RichDataGrid,
  InvoiceTable,
  TeamAvailabilityTable,
  LeaderboardTable,
  ProjectProgressTable,
  ActivityLogTable,
};

