import {
  Delete,
  DeleteIcon,
  Edit2,
  LucideDelete,
  MoreHorizontal,
} from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSelector } from "react-redux";
import useGetAllCompany from "../hooks/useGetAllCompany";
import { useNavigate } from "react-router-dom";
import useGetCompanyById from "../hooks/useGetCompanyById";
import axios from "axios";

export default function CompanyTabel({ com }) {
  let navigate = useNavigate();
  let getComp = useGetAllCompany();
  let { comp } = useSelector((store) => store.company);
  const filteredCompanies = com
    ? comp.filter((item) => item.name.toLowerCase().includes(com.toLowerCase()))
    : comp; // Show all companies if no search term
  // if (filteredCompanies.length === 0) {
  //   return (
  //     <center>
  //       <p>There is Not match Found</p>
  //     </center>
  //   );
  // }
  let handleDel = async (compId) => {
    try {
      console.log("Deleting company with ID:", compId); // Debugging
      let res = await axios.post(
        "http://localhost:8080/api/company/delete",

        { compId: compId },

        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      if (res.data.success) {
        alert(res.data.message);
        getComp();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Table>
        <TableCaption>A List of your registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={item.logo}></AvatarImage>
                    </Avatar>
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.createdAt.split("T")[0]}</TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="max-w-32">
                        <div className=" flex justify-evenly items-center cursor-pointer">
                          <Edit2
                            role="button"
                            onClick={() =>
                              navigate(`/admin/companies/${item._id}`)
                            }
                          />
                        </div>
                        <div className=" flex justify-evenly items-center cursor-pointer pt-2">
                          <LucideDelete
                            role="button"
                            onClick={() => handleDel(item._id)}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                There is not match found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
