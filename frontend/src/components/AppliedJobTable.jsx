import { useSelector } from "react-redux";
import useGetAppliedJob from "./hooks/useGetAllApliedJob";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export default function AppliedJobTable() {
  useGetAppliedJob();
  let { appliedJob } = useSelector((store) => store.application);
  let { loading } = useSelector((store) => store.auth);
  if (loading) {
    return <center>loading..</center>;
  }
  if (appliedJob.length <= 0) {
    return <center>You haven't applied job yet</center>;
  }

  return (
    <>
      <div>
        <Table>
          <TableCaption className="text-center">Applied job </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Job Role</TableHead>
              <TableHead>company</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appliedJob.map((item, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>{item?.createdAt?.split("T")[0]}</TableCell>
                  <TableCell>{item.job?.title}</TableCell>
                  <TableCell>{item.job?.company?.name}</TableCell>
                  <TableCell className="text-right">
                    <Badge>{item?.status}</Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
