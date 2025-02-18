import { PopoverTrigger } from "@radix-ui/react-popover";
import { Popover, PopoverContent } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
let shortList = ["accepted", "rejected"];

export default function ApplicantTable({ applicant }) {
  let handaleStatus = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      let res = await axios.post(
        `http://localhost:8080/api/application/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        alert(res.data.message);
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Table>
        <TableCaption className="text-center">
          The list of resent aplicant
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contect</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicant?.applications?.map((item, index) => {
            return (
              <TableRow>
                <TableCell>{item.applicant.FullName}</TableCell>
                <TableCell>{item.applicant.email}</TableCell>

                <TableCell>{item.applicant.phoneNumber}</TableCell>
                <TableCell>
                  {item.applicant.profile.resume ? (
                    <a
                      href={item.applicant.profile.resume}
                      target="_blank"
                      rel="noopener norefrence">
                      click Here
                    </a>
                  ) : (
                    NA
                  )}
                </TableCell>
                <TableCell>
                  {item.applicant?.createdAt?.split("T")[0]}
                </TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="max-w-full flex items-center justify-center">
                      {shortList.map((status, index) => {
                        return (
                          <Button
                            onClick={() => handaleStatus(status, item?._id)}
                            className="m-3">
                            {status}
                          </Button>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            );

            //  <TableCell>Ram mane</TableCell>
            //  <TableCell>Ram mane</TableCell>
            //  <TableCell>Ram mane</TableCell>
            //  <TableCell>Ram mane</TableCell>
          })}
        </TableBody>
      </Table>
    </div>
  );
}
