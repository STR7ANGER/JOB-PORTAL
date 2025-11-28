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
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

const AppliedJobTable = () => {
  useGetAppliedJobs();
  const { appliedJobs } = useSelector((state: RootState) => state.application);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const getCompanyName = (company: any) => {
    if (!company) return "N/A";
    if (typeof company === "string") return "N/A";
    return company.name;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "accepted":
        return "bg-green-50 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-white text-black/70 border-black/10";
    }
  };

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
          {appliedJobs.length > 0 ? (
            appliedJobs.map((application) => (
              <TableRow
                key={application._id}
                className="border-black/5 transition hover:bg-white"
              >
                <TableCell className="text-sm text-black/80">
                  {formatDate(application.createdAt)}
                </TableCell>
                <TableCell className="text-sm font-medium text-black">
                  {application.job?.title || "N/A"}
                </TableCell>
                <TableCell className="text-sm text-black/70">
                  {typeof application.job?.company === "object" && application.job.company
                    ? getCompanyName(application.job.company)
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] ${getStatusColor(
                      application.status
                    )}`}
                  >
                    {application.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-sm text-black/50 py-8"
              >
                No applications found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
