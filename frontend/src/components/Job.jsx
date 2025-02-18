import { Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setFav } from "../../redux/jobslice";
import { setLoading } from "../../redux/authslice";

export default function Job({ item }) {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let { loading } = useSelector((store) => store.auth);
  const daysAgoFunction = (createdAt) => {
    if (!createdAt) {
      return "N/A";
    }
    const dataTime = new Date(createdAt);
    const currentTime = new Date();
    let timeDifference = currentTime - dataTime;
    const timenow = Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    if (timenow === 0) {
      return "Today";
    } else {
      return `${timenow} days Ago`;
    }
  };

  // const fatchFav = async (id) => {
  //   try {
  //     dispatch(setLoading(true));
  //     let res = await axios.post(
  //       `http://localhost:8080/api/job/getfav/${id}`,
  //       { favId: id },
  //       {
  //         withCredentials: true,
  //       }
  //     );

  //     if (res.data.success) {
  //       console.log(res.data.favjob);
  //       dispatch(setFav(res.data.favjob));
  //       navigate("/fav");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     dispatch(setLoading(false));
  //   }
  // };
  if (loading) {
    return <div>Loading..</div>;
  }

  return (
    // title,
    // description,
    // requirements,
    // salary,
    // location,
    // jobTypes,
    // position,
    // experiance,
    <>
      <div className="flex flex-col max-w-7xl border border-gray-600 rounded-lg shadow-lg text-center">
        <div className="flex items-center justify-between">
          <p>{daysAgoFunction(item.createdAt)}</p>
          <Button
            variant="outline"
            className="rounded-full"
            size="icon"
            role="button"
            onClick={() => navigate(`/fav/${item._id}`)}>
            <Bookmark />
          </Button>
        </div>

        <div className="flex gap-2 items-center mt-1 justify-center">
          <Button className=" w-16" variant="outline" size="icon">
            <Avatar>
              <AvatarImage className="" src={item.company?.logo}></AvatarImage>
            </Avatar>
          </Button>
          <div>
            <h1>{item.company?.name || "not Availble"}</h1>
            <p>india</p>
          </div>
        </div>
        <div>
          <h1 className="font-bold text-lg my-2">{item.title}</h1>
          <p className=" text-md text-gray-400 ">{item.description}</p>
        </div>
        <div className="flex items-center gap-2 mt-4 justify-center">
          <Badge variant="ghost" className=" text-blue-700 font-bold">
            {item.location}
          </Badge>
          <Badge variant="outline" className="bg-green-400 text-white">
            {item.jobTypes}
          </Badge>
          <Badge variant="outline" className="bg-yellow-400 text-white">
            {item.salary}
          </Badge>
        </div>
        <div className=" flex items-center justify-between my-3 mx-auto gap-3 ">
          <Button
            variant="outline"
            onClick={() => navigate(`/detail/${item._id}`)}>
            detail
          </Button>
          <Button className="bg-purple-700">save for later</Button>
        </div>
      </div>
    </>
  );
}
