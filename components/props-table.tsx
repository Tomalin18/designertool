import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface PropsTableProps {
  props: {
    name: string
    type: string
    default?: string
    description: string
  }[]
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Prop</TableHead>
            <TableHead className="w-[200px]">Type</TableHead>
            <TableHead className="w-[120px]">Default</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.map((prop) => (
            <TableRow key={prop.name}>
              <TableCell className="font-mono text-sm">{prop.name}</TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">{prop.type}</TableCell>
              <TableCell className="font-mono text-xs">{prop.default || "-"}</TableCell>
              <TableCell className="text-sm">{prop.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
