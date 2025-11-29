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
  headerBackgroundColor?: string;
  headerTextColor?: string;
  rowHoverColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  padding?: number;
  rowCount?: number;
  showHover?: boolean;
}

// Extended props for BasicTable
export interface BasicTableProps extends TableProps {
  title?: string;
  headers?: string;
  editable?: boolean;
  onTitleChange?: (text: string) => void;
  onHeaderChange?: (index: number, text: string) => void;
  onCellChange?: (rowIndex: number, colIndex: number, text: string) => void;
}

// Editable cell component
const EditableCell = ({ 
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

// 1. Basic Table
export const BasicTable = ({
  className,
  backgroundColor,
  borderColor,
  textColor,
  headerBackgroundColor,
  headerTextColor,
  rowHoverColor,
  borderRadius = 12,
  borderWidth = 1,
  padding = 6,
  rowCount = 3,
  showHover = true,
  title,
  headers = "Name\nTitle\nEmail\nRole",
  editable = false,
  onTitleChange,
  onHeaderChange,
  onCellChange,
}: BasicTableProps) => {
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : undefined;
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : undefined;
  const textRgb = textColor && textColor.trim() !== "" 
    ? (textColor.startsWith("rgb") ? textColor : (hexToRgb(textColor) || textColor))
    : undefined;
  const headerBgRgb = headerBackgroundColor && headerBackgroundColor.trim() !== "" 
    ? (headerBackgroundColor.startsWith("rgb") ? headerBackgroundColor : (hexToRgb(headerBackgroundColor) || headerBackgroundColor))
    : undefined;
  const headerTextRgb = headerTextColor && headerTextColor.trim() !== "" 
    ? (headerTextColor.startsWith("rgb") ? headerTextColor : (hexToRgb(headerTextColor) || headerTextColor))
    : undefined;
  const hoverRgb = rowHoverColor && rowHoverColor.trim() !== "" 
    ? (rowHoverColor.startsWith("rgb") ? rowHoverColor : (hexToRgb(rowHoverColor) || rowHoverColor))
    : undefined;

  const headerList = headers.split("\n").filter(h => h.trim() !== "");

  return (
    <div 
      className={cn("w-full overflow-hidden border bg-neutral-900/50", className)}
      style={{
        ...(bgRgb && { backgroundColor: bgRgb }),
        ...(borderRgb && { borderColor: borderRgb }),
        ...(borderRadius !== 12 && { borderRadius: `${borderRadius}px` }),
        ...(borderWidth !== 1 && { borderWidth: `${borderWidth}px`, borderStyle: "solid" }),
      }}
    >
      {title && (
        <div className="border-b border-neutral-800 p-4">
          <EditableCell
            value={title}
            onChange={onTitleChange}
            editable={editable}
            className="font-bold text-white"
          />
        </div>
      )}
      <table className="w-full text-left text-sm text-neutral-400">
        <thead 
          className="text-neutral-200"
          style={{
            ...(headerBgRgb && { backgroundColor: headerBgRgb }),
            ...(headerTextRgb && { color: headerTextRgb }),
          }}
        >
          <tr>
            {headerList.map((header, idx) => (
              <th 
                key={idx} 
                className="font-medium"
                style={{ padding: `${padding * 0.5}px ${padding * 1}px` }}
              >
                <EditableCell
                  value={header}
                  onChange={onHeaderChange ? (text) => onHeaderChange(idx, text) : undefined}
                  editable={editable}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800">
          {Array.from({ length: rowCount }).map((_, i) => (
            <tr 
              key={i} 
              className={showHover ? "hover:bg-neutral-800/50" : ""}
              style={{
                ...(showHover && hoverRgb && { 
                  "--hover-bg": hoverRgb 
                } as React.CSSProperties),
              }}
            >
              {headerList.map((_, idx) => {
                const cellValue = idx === 0 ? `John Doe ${i + 1}` : 
                                 idx === 1 ? "Developer" :
                                 idx === 2 ? `john${i + 1}@example.com` : "Admin"
                return (
                  <td 
                    key={idx}
                    style={{ 
                      padding: `${padding * 0.67}px ${padding * 1}px`,
                      ...(idx === 0 && textRgb && { color: textRgb, fontWeight: 500 }),
                    }}
                  >
                    <EditableCell
                      value={cellValue}
                      onChange={onCellChange ? (text) => onCellChange(i, idx, text) : undefined}
                      editable={editable}
                    />
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Extended props for StripedTable
export interface StripedTableProps extends TableProps {
  headers?: string;
  stripedRowColor?: string;
  editable?: boolean;
  onHeaderChange?: (index: number, text: string) => void;
  onCellChange?: (rowIndex: number, colIndex: number, text: string) => void;
}

// 2. Striped Table
export const StripedTable = ({
  className,
  backgroundColor,
  borderColor,
  textColor,
  headerBackgroundColor,
  headerTextColor,
  rowHoverColor,
  borderRadius = 12,
  borderWidth = 1,
  padding = 6,
  rowCount = 4,
  showHover = true,
  headers = "Invoice\nStatus\nMethod\nAmount",
  stripedRowColor,
  editable = false,
  onHeaderChange,
  onCellChange,
}: StripedTableProps) => {
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : undefined;
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : undefined;
  const headerBgRgb = headerBackgroundColor && headerBackgroundColor.trim() !== "" 
    ? (headerBackgroundColor.startsWith("rgb") ? headerBackgroundColor : (hexToRgb(headerBackgroundColor) || headerBackgroundColor))
    : undefined;
  const headerTextRgb = headerTextColor && headerTextColor.trim() !== "" 
    ? (headerTextColor.startsWith("rgb") ? headerTextColor : (hexToRgb(headerTextColor) || headerTextColor))
    : undefined;
  const hoverRgb = rowHoverColor && rowHoverColor.trim() !== "" 
    ? (rowHoverColor.startsWith("rgb") ? rowHoverColor : (hexToRgb(rowHoverColor) || rowHoverColor))
    : undefined;
  const stripedRgb = stripedRowColor && stripedRowColor.trim() !== "" 
    ? (stripedRowColor.startsWith("rgb") ? stripedRowColor : (hexToRgb(stripedRowColor) || stripedRowColor))
    : undefined;

  const headerList = headers.split("\n").filter(h => h.trim() !== "");
  
  // Use state to manage editable data
  const [tableData, setTableData] = React.useState(() => [
    { id: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
    { id: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
    { id: "INV003", status: "Paid", method: "Bank Transfer", amount: "$350.00" },
    { id: "INV004", status: "Paid", method: "Credit Card", amount: "$450.00" },
  ].slice(0, rowCount));
  
  // Update data when rowCount changes
  React.useEffect(() => {
    const defaultData = [
      { id: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
      { id: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
      { id: "INV003", status: "Paid", method: "Bank Transfer", amount: "$350.00" },
      { id: "INV004", status: "Paid", method: "Credit Card", amount: "$450.00" },
    ];
    setTableData(defaultData.slice(0, rowCount));
  }, [rowCount]);
  
  const mockData = tableData;

  return (
    <div 
      className={cn("w-full overflow-hidden border bg-neutral-950", className)}
      style={{
        ...(bgRgb && { backgroundColor: bgRgb }),
        ...(borderRgb && { borderColor: borderRgb }),
        ...(borderRadius !== 12 && { borderRadius: `${borderRadius}px` }),
        ...(borderWidth !== 1 && { borderWidth: `${borderWidth}px`, borderStyle: "solid" }),
      }}
    >
      <table className="w-full text-left text-sm text-neutral-400">
        <thead 
          className="border-b border-neutral-800 font-bold text-white"
          style={{
            ...(headerBgRgb && { backgroundColor: headerBgRgb }),
            ...(headerTextRgb && { color: headerTextRgb }),
          }}
        >
          <tr>
            {headerList.map((header, idx) => (
              <th 
                key={idx}
                className={idx === headerList.length - 1 ? "text-right" : ""}
                style={{ padding: `${padding * 0.67}px ${padding * 1}px` }}
              >
                <EditableCell
                  value={header}
                  onChange={onHeaderChange ? (text) => onHeaderChange(idx, text) : undefined}
                  editable={editable}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mockData.map((row, i) => (
            <tr 
              key={i} 
              className={cn(
                "group transition-colors",
                showHover && "hover:bg-neutral-800/50",
                i % 2 === 0 ? (stripedRgb ? "" : "bg-neutral-900/30") : "bg-transparent"
              )}
              style={{
                ...(i % 2 === 0 && stripedRgb && { backgroundColor: stripedRgb }),
                ...(showHover && hoverRgb && { "--hover-bg": hoverRgb } as React.CSSProperties),
              }}
            >
              <td className="font-medium text-white group-hover:text-indigo-400" style={{ padding: `${padding * 0.67}px ${padding * 1}px` }}>
                <EditableCell
                  value={row.id}
                  onChange={(text) => {
                    if (editable) {
                      const newData = [...tableData];
                      newData[i] = { ...newData[i], id: text };
                      setTableData(newData);
                    }
                    if (onCellChange) onCellChange(i, 0, text);
                  }}
                  editable={editable}
                />
              </td>
              <td style={{ padding: `${padding * 0.67}px ${padding * 1}px` }}>
                <EditableCell
                  value={row.status}
                  onChange={(text) => {
                    if (editable) {
                      const newData = [...tableData];
                      newData[i] = { ...newData[i], status: text };
                      setTableData(newData);
                    }
                    if (onCellChange) onCellChange(i, 1, text);
                  }}
                  editable={editable}
                />
              </td>
              <td style={{ padding: `${padding * 0.67}px ${padding * 1}px` }}>
                <EditableCell
                  value={row.method}
                  onChange={(text) => {
                    if (editable) {
                      const newData = [...tableData];
                      newData[i] = { ...newData[i], method: text };
                      setTableData(newData);
                    }
                    if (onCellChange) onCellChange(i, 2, text);
                  }}
                  editable={editable}
                />
              </td>
              <td className="text-right" style={{ padding: `${padding * 0.67}px ${padding * 1}px` }}>
                <EditableCell
                  value={row.amount}
                  onChange={(text) => {
                    if (editable) {
                      const newData = [...tableData];
                      newData[i] = { ...newData[i], amount: text };
                      setTableData(newData);
                    }
                    if (onCellChange) onCellChange(i, 3, text);
                  }}
                  editable={editable}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Extended props for UserDirectoryTable
export interface UserDirectoryTableProps extends TableProps {
  title?: string;
  showFilter?: boolean;
  showAddButton?: boolean;
  addButtonText?: string;
  addButtonColor?: string;
  statusBadgeColor?: string;
  editable?: boolean;
  onTitleChange?: (text: string) => void;
  onCellChange?: (rowIndex: number, colIndex: number, text: string) => void;
}

// 3. User Directory Table
export const UserDirectoryTable = ({
  className,
  backgroundColor,
  borderColor,
  textColor,
  headerBackgroundColor,
  headerTextColor,
  rowHoverColor,
  borderRadius = 12,
  borderWidth = 1,
  padding = 6,
  rowCount = 3,
  showHover = true,
  title = "Team Members",
  showFilter = true,
  showAddButton = true,
  addButtonText = "Add Member",
  addButtonColor = "#6366f1",
  statusBadgeColor = "#22c55e",
  editable = false,
  onTitleChange,
  onCellChange,
}: UserDirectoryTableProps) => {
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : undefined;
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : undefined;
  const hoverRgb = rowHoverColor && rowHoverColor.trim() !== "" 
    ? (rowHoverColor.startsWith("rgb") ? rowHoverColor : (hexToRgb(rowHoverColor) || rowHoverColor))
    : undefined;
  const buttonRgb = addButtonColor && addButtonColor.trim() !== "" 
    ? (addButtonColor.startsWith("rgb") ? addButtonColor : (hexToRgb(addButtonColor) || addButtonColor))
    : "#6366f1";
  const badgeRgb = statusBadgeColor && statusBadgeColor.trim() !== "" 
    ? (statusBadgeColor.startsWith("rgb") ? statusBadgeColor : (hexToRgb(statusBadgeColor) || statusBadgeColor))
    : "#22c55e";

  return (
    <div 
      className={cn("w-full overflow-hidden border bg-neutral-900/50", className)}
      style={{
        ...(bgRgb && { backgroundColor: bgRgb }),
        ...(borderRgb && { borderColor: borderRgb }),
        ...(borderRadius !== 12 && { borderRadius: `${borderRadius}px` }),
        ...(borderWidth !== 1 && { borderWidth: `${borderWidth}px`, borderStyle: "solid" }),
      }}
    >
      <div className="flex items-center justify-between border-b border-neutral-800 p-4">
        <EditableCell
          value={title}
          onChange={onTitleChange}
          editable={editable}
          className="font-bold text-white"
        />
        <div className="flex gap-2">
          {showFilter && (
            <button className="rounded-lg border border-neutral-700 p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white"><Filter size={16} /></button>
          )}
          {showAddButton && (
            <button 
              className="rounded-lg px-3 py-2 text-xs font-bold text-white hover:opacity-90"
              style={{ backgroundColor: buttonRgb }}
            >
              {addButtonText}
            </button>
          )}
        </div>
      </div>
      <table className="w-full text-left text-sm">
        <tbody className="divide-y divide-neutral-800">
          {[1, 2, 3].slice(0, rowCount).map((i) => {
            const mockData = [
              { name: "Sarah Smith", email: "sarah@company.com", status: "Active", role: "Product Designer" },
              { name: "John Doe", email: "john@company.com", status: "Active", role: "Developer" },
              { name: "Jane Wilson", email: "jane@company.com", status: "Away", role: "Designer" },
            ][i - 1] || { name: "User " + i, email: `user${i}@company.com`, status: "Active", role: "Member" };
            return (
              <tr key={i} className="group hover:bg-neutral-800/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} className="h-10 w-10 rounded-full bg-neutral-800" alt="Avatar" />
                    <div>
                      <EditableCell
                        value={mockData.name}
                        onChange={onCellChange ? (text) => onCellChange(i - 1, 0, text) : undefined}
                        editable={editable}
                        className="font-bold text-white block"
                      />
                      <EditableCell
                        value={mockData.email}
                        onChange={onCellChange ? (text) => onCellChange(i - 1, 1, text) : undefined}
                        editable={editable}
                        className="text-xs text-neutral-500 block"
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <EditableCell
                    value={mockData.status}
                    onChange={onCellChange ? (text) => onCellChange(i - 1, 2, text) : undefined}
                    editable={editable}
                    className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500 ring-1 ring-inset ring-green-500/20"
                  />
                </td>
                <td className="px-6 py-4 text-neutral-400">
                  <EditableCell
                    value={mockData.role}
                    onChange={onCellChange ? (text) => onCellChange(i - 1, 3, text) : undefined}
                    editable={editable}
                  />
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-neutral-500 hover:text-white"><MoreHorizontal size={16} /></button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// Extended props for TransactionTable
export interface TransactionTableProps extends TableProps {
  title?: string;
  positiveColor?: string;
  negativeColor?: string;
  editable?: boolean;
  onTitleChange?: (text: string) => void;
  onCellChange?: (rowIndex: number, colIndex: number, text: string) => void;
}

// 4. Transaction Table
export const TransactionTable = ({
  className,
  backgroundColor,
  borderColor,
  textColor,
  headerBackgroundColor,
  headerTextColor,
  rowHoverColor,
  borderRadius = 12,
  borderWidth = 1,
  padding = 6,
  rowCount = 3,
  showHover = true,
  title = "Recent Transactions",
  positiveColor = "#3b82f6",
  negativeColor = "#22c55e",
  editable = false,
  onTitleChange,
  onCellChange,
}: TransactionTableProps) => {
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : undefined;
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : undefined;
  const hoverRgb = rowHoverColor && rowHoverColor.trim() !== "" 
    ? (rowHoverColor.startsWith("rgb") ? rowHoverColor : (hexToRgb(rowHoverColor) || rowHoverColor))
    : undefined;
  const posRgb = positiveColor && positiveColor.trim() !== "" 
    ? (positiveColor.startsWith("rgb") ? positiveColor : (hexToRgb(positiveColor) || positiveColor))
    : "#3b82f6";
  const negRgb = negativeColor && negativeColor.trim() !== "" 
    ? (negativeColor.startsWith("rgb") ? negativeColor : (hexToRgb(negativeColor) || negativeColor))
    : "#22c55e";

  return (
    <div 
      className={cn("w-full overflow-hidden border bg-black", className)}
      style={{
        ...(bgRgb && { backgroundColor: bgRgb }),
        ...(borderRgb && { borderColor: borderRgb }),
        ...(borderRadius !== 12 && { borderRadius: `${borderRadius}px` }),
        ...(borderWidth !== 1 && { borderWidth: `${borderWidth}px`, borderStyle: "solid" }),
      }}
    >
      <div className="border-b border-neutral-800 p-4">
        <EditableCell
          value={title}
          onChange={onTitleChange}
          editable={editable}
          className="font-mono text-sm font-bold uppercase text-neutral-500"
        />
      </div>
      <table className="w-full text-left text-sm text-neutral-400">
        <tbody className="divide-y divide-neutral-800">
          {[
            { t: "Spotify Subscription", d: "Oct 24", a: "-$12.99", isPositive: false },
            { t: "Freelance Payment", d: "Oct 23", a: "+$2,400.00", isPositive: true },
            { t: "Grocery Store", d: "Oct 21", a: "-$84.20", isPositive: false },
          ].slice(0, rowCount).map((item, i) => (
            <tr 
              key={i} 
              className={showHover ? "hover:bg-neutral-900" : ""}
              style={{
                ...(showHover && hoverRgb && { "--hover-bg": hoverRgb } as React.CSSProperties),
              }}
            >
              <td style={{ padding: `${padding * 0.67}px ${padding * 1}px` }}>
                <div className="flex items-center gap-3">
                  <div 
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold"
                    style={{
                      backgroundColor: item.isPositive ? `${posRgb}33` : `${negRgb}33`,
                      color: item.isPositive ? posRgb : negRgb,
                    }}
                  >
                    {item.t[0]}
                  </div>
                  <div>
                    <EditableCell
                      value={item.t}
                      onChange={onCellChange ? (text) => onCellChange(i, 0, text) : undefined}
                      editable={editable}
                      className="font-medium text-white block"
                    />
                    <EditableCell
                      value={item.d}
                      onChange={onCellChange ? (text) => onCellChange(i, 1, text) : undefined}
                      editable={editable}
                      className="text-xs block"
                    />
                  </div>
                </div>
              </td>
              <td 
                className="text-right font-mono font-medium"
                style={{ 
                  padding: `${padding * 0.67}px ${padding * 1}px`,
                  color: item.isPositive ? posRgb : "rgb(212 212 212)",
                }}
              >
                <EditableCell
                  value={item.a}
                  onChange={onCellChange ? (text) => onCellChange(i, 2, text) : undefined}
                  editable={editable}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Extended props for StatusBoard
export interface StatusBoardProps extends TableProps {
  headers?: string;
  operationalColor?: string;
  degradedColor?: string;
  editable?: boolean;
  onHeaderChange?: (index: number, text: string) => void;
  onCellChange?: (rowIndex: number, colIndex: number, text: string) => void;
}

// 5. Status Board
export const StatusBoard = ({
  className,
  backgroundColor,
  borderColor,
  textColor,
  headerBackgroundColor,
  headerTextColor,
  borderRadius = 12,
  borderWidth = 1,
  padding = 6,
  headers = "Server\nStatus\nUptime\nLatency",
  operationalColor = "#22c55e",
  degradedColor = "#eab308",
  editable = false,
  onHeaderChange,
  onCellChange,
}: StatusBoardProps) => {
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : undefined;
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : undefined;
  const headerBgRgb = headerBackgroundColor && headerBackgroundColor.trim() !== "" 
    ? (headerBackgroundColor.startsWith("rgb") ? headerBackgroundColor : (hexToRgb(headerBackgroundColor) || headerBackgroundColor))
    : undefined;
  const headerTextRgb = headerTextColor && headerTextColor.trim() !== "" 
    ? (headerTextColor.startsWith("rgb") ? headerTextColor : (hexToRgb(headerTextColor) || headerTextColor))
    : undefined;
  const opRgb = operationalColor && operationalColor.trim() !== "" 
    ? (operationalColor.startsWith("rgb") ? operationalColor : (hexToRgb(operationalColor) || operationalColor))
    : "#22c55e";
  const degRgb = degradedColor && degradedColor.trim() !== "" 
    ? (degradedColor.startsWith("rgb") ? degradedColor : (hexToRgb(degradedColor) || degradedColor))
    : "#eab308";

  const headerList = headers.split("\n").filter(h => h.trim() !== "");

  return (
    <div 
      className={cn("w-full overflow-hidden border bg-neutral-900/50", className)}
      style={{
        ...(bgRgb && { backgroundColor: bgRgb }),
        ...(borderRgb && { borderColor: borderRgb }),
        ...(borderRadius !== 12 && { borderRadius: `${borderRadius}px` }),
        ...(borderWidth !== 1 && { borderWidth: `${borderWidth}px`, borderStyle: "solid" }),
      }}
    >
      <div className="grid grid-cols-4 gap-px bg-neutral-800 text-xs font-bold uppercase tracking-wider text-neutral-500">
        {headerList.map((header, idx) => (
          <div 
            key={idx}
            className={idx === headerList.length - 1 ? "text-right" : ""}
            style={{
              ...(headerBgRgb && { backgroundColor: headerBgRgb }),
              ...(headerTextRgb && { color: headerTextRgb }),
              padding: `${padding * 0.5}px ${padding * 1}px`,
            }}
          >
            <EditableCell
              value={header}
              onChange={onHeaderChange ? (text) => onHeaderChange(idx, text) : undefined}
              editable={editable}
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-px bg-neutral-800">
        {[
          { s: "US-East-1", st: "Operational", u: "99.99%", l: "24ms" },
          { s: "EU-West-1", st: "Operational", u: "99.95%", l: "42ms" },
          { s: "AP-South-1", st: "Degraded", u: "98.50%", l: "120ms" },
        ].map((row, i) => (
          <React.Fragment key={i}>
            <div className="bg-neutral-900 px-6 py-4 text-sm font-medium text-white">
              <EditableCell
                value={row.s}
                onChange={onCellChange ? (text) => onCellChange(i, 0, text) : undefined}
                editable={editable}
              />
            </div>
            <div className="bg-neutral-900 px-6 py-4">
              <span className={cn("inline-flex items-center gap-1.5 rounded px-2 py-1 text-xs font-medium", row.st === "Operational" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500")}>
                <div className={cn("h-1.5 w-1.5 rounded-full", row.st === "Operational" ? "bg-green-500" : "bg-yellow-500")} />
                <EditableCell
                  value={row.st}
                  onChange={onCellChange ? (text) => onCellChange(i, 1, text) : undefined}
                  editable={editable}
                />
              </span>
            </div>
            <div className="bg-neutral-900 px-6 py-4 text-sm text-neutral-400 font-mono">
              <EditableCell
                value={row.u}
                onChange={onCellChange ? (text) => onCellChange(i, 2, text) : undefined}
                editable={editable}
              />
            </div>
            <div className="bg-neutral-900 px-6 py-4 text-right text-sm text-neutral-400 font-mono">
              <EditableCell
                value={row.l}
                onChange={onCellChange ? (text) => onCellChange(i, 3, text) : undefined}
                editable={editable}
              />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// Extended props for FileBrowserTable
export interface FileBrowserTableProps extends TableProps {
  headers?: string;
  fileIconColor?: string;
  folderIconColor?: string;
  editable?: boolean;
  onHeaderChange?: (index: number, text: string) => void;
  onCellChange?: (rowIndex: number, colIndex: number, text: string) => void;
}

// 6. File Browser Table
export const FileBrowserTable = ({
  className,
  backgroundColor,
  borderColor,
  textColor,
  headerBackgroundColor,
  headerTextColor,
  rowHoverColor,
  borderRadius = 12,
  borderWidth = 1,
  padding = 6,
  rowCount = 3,
  showHover = true,
  headers = "Name\nDate Modified\nSize",
  fileIconColor = "#ef4444",
  folderIconColor = "#3b82f6",
  editable = false,
  onHeaderChange,
  onCellChange,
}: FileBrowserTableProps) => {
  const bgRgb = backgroundColor && backgroundColor.trim() !== "" 
    ? (backgroundColor.startsWith("rgb") ? backgroundColor : (hexToRgb(backgroundColor) || backgroundColor))
    : undefined;
  const borderRgb = borderColor && borderColor.trim() !== "" 
    ? (borderColor.startsWith("rgb") ? borderColor : (hexToRgb(borderColor) || borderColor))
    : undefined;
  const headerBgRgb = headerBackgroundColor && headerBackgroundColor.trim() !== "" 
    ? (headerBackgroundColor.startsWith("rgb") ? headerBackgroundColor : (hexToRgb(headerBackgroundColor) || headerBackgroundColor))
    : undefined;
  const headerTextRgb = headerTextColor && headerTextColor.trim() !== "" 
    ? (headerTextColor.startsWith("rgb") ? headerTextColor : (hexToRgb(headerTextColor) || headerTextColor))
    : undefined;
  const hoverRgb = rowHoverColor && rowHoverColor.trim() !== "" 
    ? (rowHoverColor.startsWith("rgb") ? rowHoverColor : (hexToRgb(rowHoverColor) || rowHoverColor))
    : undefined;
  const fileRgb = fileIconColor && fileIconColor.trim() !== "" 
    ? (fileIconColor.startsWith("rgb") ? fileIconColor : (hexToRgb(fileIconColor) || fileIconColor))
    : "#ef4444";
  const folderRgb = folderIconColor && folderIconColor.trim() !== "" 
    ? (folderIconColor.startsWith("rgb") ? folderIconColor : (hexToRgb(folderIconColor) || folderIconColor))
    : "#3b82f6";

  const headerList = headers.split("\n").filter(h => h.trim() !== "");
  const mockFiles = [
    { n: "Project Proposal.pdf", d: "Oct 24, 2024", s: "2.4 MB", i: FileText, isFile: true },
    { n: "Design Assets", d: "Oct 23, 2024", s: "-", i: ImageIcon, isFile: false },
    { n: "Quarterly Report.docx", d: "Oct 20, 2024", s: "1.2 MB", i: FileText, isFile: true },
  ].slice(0, rowCount);

  return (
    <div 
      className={cn("w-full overflow-hidden border bg-neutral-900", className)}
      style={{
        ...(bgRgb && { backgroundColor: bgRgb }),
        ...(borderRgb && { borderColor: borderRgb }),
        ...(borderRadius !== 12 && { borderRadius: `${borderRadius}px` }),
        ...(borderWidth !== 1 && { borderWidth: `${borderWidth}px`, borderStyle: "solid" }),
      }}
    >
      <table className="w-full text-left text-sm text-neutral-400">
        <thead 
          className="border-b border-neutral-800 text-xs font-medium uppercase text-neutral-500"
          style={{
            ...(headerBgRgb && { backgroundColor: headerBgRgb }),
            ...(headerTextRgb && { color: headerTextRgb }),
          }}
        >
          <tr>
            {headerList.map((header, idx) => (
              <th 
                key={idx}
                className={idx === headerList.length - 1 ? "text-right" : ""}
                style={{ padding: `${padding * 0.5}px ${padding * 0.67}px` }}
              >
                <EditableCell
                  value={header}
                  onChange={onHeaderChange ? (text) => onHeaderChange(idx, text) : undefined}
                  editable={editable}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800">
          {mockFiles.map((file, i) => (
            <tr 
              key={i} 
              className={cn("cursor-pointer", showHover && "hover:bg-neutral-800/50")}
              style={{
                ...(showHover && hoverRgb && { "--hover-bg": hoverRgb } as React.CSSProperties),
              }}
            >
              <td style={{ padding: `${padding * 0.5}px ${padding * 0.67}px` }}>
                <div className="flex items-center gap-3 text-white">
                  <file.i size={18} style={{ color: file.isFile ? fileRgb : folderRgb }} />
                  <EditableCell
                    value={file.n}
                    onChange={onCellChange ? (text) => onCellChange(i, 0, text) : undefined}
                    editable={editable}
                  />
                </div>
              </td>
              <td className="text-xs" style={{ padding: `${padding * 0.5}px ${padding * 0.67}px` }}>
                <EditableCell
                  value={file.d}
                  onChange={onCellChange ? (text) => onCellChange(i, 1, text) : undefined}
                  editable={editable}
                />
              </td>
              <td className="text-right text-xs font-mono" style={{ padding: `${padding * 0.5}px ${padding * 0.67}px` }}>
                <EditableCell
                  value={file.s}
                  onChange={onCellChange ? (text) => onCellChange(i, 2, text) : undefined}
                  editable={editable}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Extended props for RichDataGrid
export interface RichDataGridProps extends TableProps {
  editable?: boolean;
  onCellChange?: (rowIndex: number, colIndex: number, text: string) => void;
}

// 7. Rich Data Grid
export const RichDataGrid = ({
  className,
  backgroundColor,
  borderColor,
  textColor,
  editable = false,
  onCellChange,
}: RichDataGridProps) => {
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
              <td className="px-4 py-3 font-medium text-white">
                <EditableCell
                  value={row.p}
                  onChange={onCellChange ? (text) => onCellChange(i, 0, text) : undefined}
                  editable={editable}
                />
              </td>
              <td className="px-4 py-3">
                <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium", 
                  row.s === "In Stock" ? "bg-green-500/10 text-green-500" : 
                  row.s === "Low Stock" ? "bg-yellow-500/10 text-yellow-500" : "bg-red-500/10 text-red-500"
                )}>
                  <EditableCell
                    value={row.s}
                    onChange={onCellChange ? (text) => onCellChange(i, 1, text) : undefined}
                    editable={editable}
                  />
                </span>
              </td>
              <td className="px-4 py-3 text-neutral-500">
                <EditableCell
                  value={row.c}
                  onChange={onCellChange ? (text) => onCellChange(i, 2, text) : undefined}
                  editable={editable}
                />
              </td>
              <td className="px-4 py-3 font-mono">
                <EditableCell
                  value={row.pr}
                  onChange={onCellChange ? (text) => onCellChange(i, 3, text) : undefined}
                  editable={editable}
                />
              </td>
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

// Extended props for InvoiceTable
export interface InvoiceTableProps extends TableProps {
  editable?: boolean;
  onCellChange?: (rowIndex: number, colIndex: number, text: string) => void;
}

// 8. Invoice Table
export const InvoiceTable = ({
  className,
  backgroundColor,
  borderColor,
  textColor,
  editable = false,
  onCellChange,
}: InvoiceTableProps) => {
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
              <td className="px-6 py-4 font-mono font-medium text-indigo-600">
                <EditableCell
                  value={`#INV-2024-00${i}`}
                  onChange={onCellChange ? (text) => onCellChange(i - 1, 0, text) : undefined}
                  editable={editable}
                />
              </td>
              <td className="px-6 py-4 font-medium text-neutral-900">
                <EditableCell
                  value={`Acme Corp ${i}`}
                  onChange={onCellChange ? (text) => onCellChange(i - 1, 1, text) : undefined}
                  editable={editable}
                />
              </td>
              <td className="px-6 py-4 text-neutral-500">
                <EditableCell
                  value="Oct 24, 2024"
                  onChange={onCellChange ? (text) => onCellChange(i - 1, 2, text) : undefined}
                  editable={editable}
                />
              </td>
              <td className="px-6 py-4 text-right font-bold text-neutral-900">
                <EditableCell
                  value="$1,200.00"
                  onChange={onCellChange ? (text) => onCellChange(i - 1, 3, text) : undefined}
                  editable={editable}
                />
              </td>
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

// Extended props for TeamAvailabilityTable
export interface TeamAvailabilityTableProps extends TableProps {
  editable?: boolean;
  onTitleChange?: (text: string) => void;
  onCellChange?: (rowIndex: number, colIndex: number, text: string) => void;
}

// 9. Team Availability Table
export const TeamAvailabilityTable = ({
  className,
  backgroundColor,
  borderColor,
  textColor,
  editable = false,
  onTitleChange,
  onCellChange,
}: TeamAvailabilityTableProps) => {
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
        <EditableCell
          value="Team Availability"
          onChange={onTitleChange}
          editable={editable}
          className="font-bold text-white"
        />
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
            <div className="w-16 text-sm font-medium text-neutral-300">
              <EditableCell
                value={user.n}
                onChange={onCellChange ? (text) => onCellChange(i, 0, text) : undefined}
                editable={editable}
              />
            </div>
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

// Extended props for LeaderboardTable
export interface LeaderboardTableProps extends TableProps {
  editable?: boolean;
  onTitleChange?: (text: string) => void;
  onCellChange?: (rowIndex: number, colIndex: number, text: string) => void;
}

// 10. Leaderboard Table
export const LeaderboardTable = ({
  className,
  backgroundColor,
  borderColor,
  textColor,
  editable = false,
  onTitleChange,
  onCellChange,
}: LeaderboardTableProps) => {
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
          <EditableCell
            value="Top Performers"
            onChange={onTitleChange}
            editable={editable}
            className="text-lg font-black uppercase italic tracking-wider text-white"
          />
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
                <td className="px-6 py-4 font-bold">
                  <EditableCell
                    value={row.n}
                    onChange={onCellChange ? (text) => onCellChange(i, 0, text) : undefined}
                    editable={editable}
                  />
                </td>
                <td className="px-6 py-4 text-right font-mono text-indigo-300">
                  <EditableCell
                    value={`${row.s} xp`}
                    onChange={onCellChange ? (text) => onCellChange(i, 1, text) : undefined}
                    editable={editable}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Extended props for ProjectProgressTable
export interface ProjectProgressTableProps extends TableProps {
  headers?: string;
  editable?: boolean;
  onHeaderChange?: (index: number, text: string) => void;
  onCellChange?: (rowIndex: number, colIndex: number, text: string) => void;
}

// 11. Project Progress Table
export const ProjectProgressTable = ({
  className,
  backgroundColor,
  borderColor,
  textColor,
  headers = "Project\nProgress\nDue Date\nTeam",
  editable = false,
  onHeaderChange,
  onCellChange,
}: ProjectProgressTableProps) => {
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
            {headers.split("\n").filter(h => h.trim() !== "").map((header, idx) => (
              <th key={idx} className="px-6 py-3 font-medium">
                <EditableCell
                  value={header}
                  onChange={onHeaderChange ? (text) => onHeaderChange(idx, text) : undefined}
                  editable={editable}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800">
          {[
            { p: "Website Redesign", prog: 75, d: "Nov 15", t: [1,2,3] },
            { p: "Mobile App", prog: 30, d: "Dec 01", t: [4,5] },
            { p: "Dashboard V2", prog: 90, d: "Oct 30", t: [1] },
          ].map((row, i) => (
            <tr key={i} className="hover:bg-neutral-800/30">
              <td className="px-6 py-4 font-medium text-white">
                <EditableCell
                  value={row.p}
                  onChange={onCellChange ? (text) => onCellChange(i, 0, text) : undefined}
                  editable={editable}
                />
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-24 rounded-full bg-neutral-800">
                    <div className="h-full rounded-full bg-indigo-500" style={{ width: `${row.prog}%` }} />
                  </div>
                  <EditableCell
                    value={`${row.prog}%`}
                    onChange={onCellChange ? (text) => {
                      const num = parseInt(text.replace('%', '')) || 0
                      onCellChange(i, 1, `${num}%`)
                    } : undefined}
                    editable={editable}
                    className="text-xs"
                  />
                </div>
              </td>
              <td className="px-6 py-4">
                <EditableCell
                  value={row.d}
                  onChange={onCellChange ? (text) => onCellChange(i, 2, text) : undefined}
                  editable={editable}
                />
              </td>
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

// Extended props for ActivityLogTable
export interface ActivityLogTableProps extends TableProps {
  editable?: boolean;
  onTitleChange?: (text: string) => void;
  onCellChange?: (rowIndex: number, colIndex: number, text: string) => void;
}

// 12. Activity Log Table
export const ActivityLogTable = ({
  className,
  backgroundColor,
  borderColor,
  textColor,
  editable = false,
  onTitleChange,
  onCellChange,
}: ActivityLogTableProps) => {
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
      <EditableCell
        value="Recent Activity"
        onChange={onTitleChange}
        editable={editable}
        className="mb-4 font-bold text-white"
      />
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
            {/* 
              使用 <div> 而不是 <p> 來包住 EditableCell。
              EditableCell 的根元素是 <div>，如果用 <p> 來包會形成「<div> 不能是 <p> 的子元素」的無效 HTML，
              進而在 Next.js 中造成 hydration error。
            */}
            <div className="text-sm text-neutral-300">
              <EditableCell
                value={item.u}
                onChange={onCellChange ? (text) => onCellChange(i, 0, text) : undefined}
                editable={editable}
                className="font-bold text-white inline"
              />{" "}
              <EditableCell
                value={item.a}
                onChange={onCellChange ? (text) => onCellChange(i, 1, text) : undefined}
                editable={editable}
                className="inline"
              />
            </div>
            <EditableCell
              value={item.t}
              onChange={onCellChange ? (text) => onCellChange(i, 2, text) : undefined}
              editable={editable}
              className="text-xs text-neutral-500 block"
            />
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

