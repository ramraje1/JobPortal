import axios from "axios";
import { Bookmark } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

import { CgRemove } from "react-icons/cg";
import { setLoading } from "../../redux/authslice";

export default function GetFav() {
  let dispatch = useDispatch();
  let { loading } = useSelector((store) => store.auth);
  let { fav } = useSelector((store) => store.job);
  let navigate = useNavigate();
  let params = useParams();
  let id = params.id;

  const fatchFav = async () => {
    try {
      dispatch(setLoading(true));
      let res = await axios.post(
        `http://localhost:8080/api/job/getfav`,
        { favId: id },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        alert(res.data.message);
        navigate("/fav");
      } else {
        alert("already in the file");
        navigate("/browse");
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    fatchFav();
  }, [dispatch, id]);

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

  // let handdleDelete = async (delId) => {
  //   try {
  //     let res = await axios.post(
  //       "http://localhost:8080/api/job/delfav",
  //       {
  //         delId,
  //       },
  //       { withCredentials: true }
  //     );
  //     console.log(res.data);
  //     if (res.data.success) {
  //       dispatch(removFav(delId));
  //       alert(res.data.message);
  //     } else {
  //       alert("Failed to remove job from favorites.");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  if (loading) {
    return <div>loading..</div>;
  }
  return (
    <>
      <div className="max-w-7xl grid grid-cols-3 gap-3 mx-auto mt-3 ">
        {fav.map((item, index) => {
          return (
            <div className=" border border-gray-600 rounded-lg shadow-lg text-center">
              <div className="flex items-center justify-between">
                <p>{daysAgoFunction(item.createdAt)}</p>
                <Button
                  variant="outline"
                  // onClick={() => handdleDelete(item._id)}
                  className="rounded-full"
                  size="icon">
                  <CgRemove />
                </Button>
              </div>

              <div className="flex gap-2 items-center mt-1 justify-center">
                <Button className=" w-16" variant="outline" size="icon">
                  <Avatar>
                    <AvatarImage
                      className=""
                      src={item.company?.logo}></AvatarImage>
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
                  {item.requirements}
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
          );
        })}
      </div>
    </>
  );
}
