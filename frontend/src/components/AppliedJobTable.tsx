import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";
import { Badge } from "./ui/badge";

const AppliedJobTable = () => {
  return (
    <div className="rounded-2xl border border-black/10 bg-[#fdfdfd] shadow-sm">
      <Table>
        <TableCaption className="py-4 text-xs font-medium uppercase tracking-[0.2em] text-black/60">
          List of applied jobs
        </TableCaption>
        <TableHeader>
          <TableRow className="border-black/10 hover:bg-transparent">
            <TableHead className="text-xs font-medium uppercase tracking-[0.2em] text-black/60">
              Date
            </TableHead>
            <TableHead className="text-xs font-medium uppercase tracking-[0.2em] text-black/60">
              Job Role
            </TableHead>
            <TableHead className="text-xs font-medium uppercase tracking-[0.2em] text-black/60">
              Company
            </TableHead>
            <TableHead className="text-xs font-medium uppercase tracking-[0.2em] text-black/60">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
            <TableRow
              key={index}
              className="border-black/5 transition hover:bg-white"
            >
              <TableCell className="text-sm text-black/80">2025-01-01</TableCell>
              <TableCell className="text-sm font-medium text-black">
                Software Engineer
              </TableCell>
              <TableCell className="text-sm text-black/70">Google</TableCell>
              <TableCell>
                <Badge className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-black/70">
                  Pending
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
