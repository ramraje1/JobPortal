import { DeleteIcon, Edit, Eye, MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import useGetAllAjobs from "../hooks/useGetAllAjobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AjobTable({ ajob }) {
  let navigate = useNavigate();
  // console.log(ajob);
  let getJob = useGetAllAjobs();
  let { adminJob } = useSelector((store) => store.job);
  // console.log(adminJob);
  let filterAjob = ajob
    ? adminJob.filter((item) =>
        item.title.toLowerCase().includes(ajob.toLowerCase())
      )
    : adminJob;
  let handleDel = async (jobId) => {
    try {
      let res = await axios.post(
        "http://localhost:8080/api/job/delete",

        { JobId: jobId },

        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        alert(res.data.message);
        getJob();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Table>
        <TableCaption>A list of Resent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterAjob.map((job, index) => {
            return (
              <TableRow key={job?._id}>
                <TableCell>
                  {job?.company?.name || <p>not available</p>}
                </TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="max-w-32">
                      <div className=" flex justify-evenly items-center cursor-pointer">
                        <Edit
                          role="button"
                          onClick={() =>
                            navigate(`/admin/jobs/update/${job._id}`)
                          }
                        />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center justify-center w-fit cursor-pointer gap-2 mt-2">
                        <Eye />
                        <span>Applicant</span>
                      </div>
                      <div
                        onClick={() => handleDel(job._id)}
                        className="flex items-center justify-center w-fit cursor-pointer gap-2 mt-2">
                        <DeleteIcon />
                        <span>delete</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
