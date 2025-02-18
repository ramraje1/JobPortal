// import axios from "axios";
// import { Bookmark } from "lucide-react";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { Button } from "./ui/button";
// import { Avatar } from "@radix-ui/react-avatar";
// import { AvatarImage } from "./ui/avatar";
// import { Badge } from "./ui/badge";
// // import { setFav } from "../../redux/jobslice";
// import { CgRemove } from "react-icons/cg";
// import { setLoading } from "../../redux/authslice";
// import UseGet from "./hooks/useGetFav";
// import useGetFav from "./hooks/useGetFav";

// export default function Favourite() {
//   useGetFav();

//   let { loading } = useSelector((store) => store.auth);
//   let { fav } = useSelector((store) => store.job);
//   let dispatch = useDispatch();

//   let navigate = useNavigate();

//   if (loading) return <div>Loading...</div>;
//   if (!fav || fav.length === 0) return <div>No favorite jobs available</div>;
//   const daysAgoFunction = (createdAt) => {
//     if (!createdAt) {
//       return "N/A";
//     }
//     const dataTime = new Date(createdAt);
//     const currentTime = new Date();
//     let timeDifference = currentTime - dataTime;
//     const timenow = Math.floor(timeDifference / (1000 * 24 * 60 * 60));
//     if (timenow === 0) {
//       return "Today";
//     } else {
//       return `${timenow} days Ago`;
//     }
//   };

//   let handdleDelete = async (delId) => {
//     try {
//       let res = await axios.post(
//         "http://localhost:8080/api/job/delfav",
//         {
//           delId,
//         },
//         { withCredentials: true }
//       );

//       if (res.data.success) {
//         alert(res.data.message);
//       } else {
//         alert("Failed to remove job from favorites.");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <div className="max-w-7xl grid grid-cols-3 gap-3 mx-auto mt-3 ">
//         {fav.map((item, index) => {
//           return (
//             <div className=" border border-gray-600 rounded-lg shadow-lg text-center">
//               <div className="flex items-center justify-between">
//                 <p>{daysAgoFunction(item.createdAt)}</p>
//                 <Button
//                   variant="outline"
//                   onClick={() => handdleDelete(item._id)}
//                   className="rounded-full"
//                   size="icon">
//                   <CgRemove />
//                 </Button>
//               </div>

//               <div className="flex gap-2 items-center mt-1 justify-center">
//                 <Button className=" w-16" variant="outline" size="icon">
//                   <Avatar>
//                     <AvatarImage
//                       className=""
//                       src={item.company?.logo}></AvatarImage>
//                   </Avatar>
//                 </Button>
//                 <div>
//                   <h1>{item.company?.name || "not Availble"}</h1>
//                   <p>india</p>
//                 </div>
//               </div>
//               <div>
//                 <h1 className="font-bold text-lg my-2">{item.title}</h1>
//                 <p className=" text-md text-gray-400 ">{item.description}</p>
//               </div>
//               <div className="flex items-center gap-2 mt-4 justify-center">
//                 <Badge variant="ghost" className=" text-blue-700 font-bold">
//                   {item.requirements}
//                 </Badge>
//                 <Badge variant="outline" className="bg-green-400 text-white">
//                   {item.jobTypes}
//                 </Badge>
//                 <Badge variant="outline" className="bg-yellow-400 text-white">
//                   {item.salary}
//                 </Badge>
//               </div>
//               <div className=" flex items-center justify-between my-3 mx-auto gap-3 ">
//                 <Button
//                   variant="outline"
//                   onClick={() => navigate(`/detail/${item._id}`)}>
//                   detail
//                 </Button>
//                 <Button className="bg-purple-700">save for later</Button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// }
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "./ui/badge";
import { CgRemove } from "react-icons/cg";
import useGetFav from "./hooks/useGetFav";

export default function Favourite() {
  let fatchFav = useGetFav(); // Fetch favorite jobs

  const { loading } = useSelector((store) => store.auth);
  const { fav } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const daysAgoFunction = (createdAt) => {
    if (!createdAt) return "N/A";
    const dataTime = new Date(createdAt);
    const currentTime = new Date();
    const timeDifference = currentTime - dataTime;
    const timenow = Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    return timenow === 0 ? "Today" : `${timenow} days Ago`;
  };

  const handleDelete = async (jobId) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/job/delfav",
        { jobId }, // Send jobId in the request body
        { withCredentials: true }
      );

      if (res.data.success) {
        alert(res.data.message);
        // Optionally, refetch the favorite jobs after deletion
        fatchFav();
      } else {
        alert("Failed to remove job from favorites.");
      }
    } catch (error) {
      console.error("Error removing job from favorites:", error);
      alert("An error occurred while removing the job from favorites.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!fav || fav.length === 0) return <div>No favorite jobs available</div>;

  return (
    <div className="max-w-6xl grid grid-cols-3 gap-4 mx-auto mt-3">
      {fav.map((item) => (
        <div
          key={item._id}
          className="border border-gray-600 rounded-lg shadow-lg text-center">
          <div className="flex items-center justify-between">
            <p>{daysAgoFunction(item.createdAt)}</p>
            <Button
              variant="outline"
              onClick={() => handleDelete(item._id)}
              className="rounded-full"
              size="icon">
              <CgRemove />
            </Button>
          </div>

          <div className="flex gap-2 items-center mt-1 justify-center">
            <Button className="w-16" variant="outline" size="icon">
              <Avatar>
                <AvatarImage src={item.company?.logo} />
              </Avatar>
            </Button>
            <div>
              <h1>{item.company?.name || "not Available"}</h1>
              <p>India</p>
            </div>
          </div>
          <div>
            <h1 className="font-bold text-lg my-2">{item.title}</h1>
            <p className="text-md text-gray-400">{item.description}</p>
          </div>
          <div className="flex items-center gap-2 mt-4 justify-center">
            <Badge variant="ghost" className="text-blue-700 font-bold">
              {item.location}
            </Badge>
            <Badge variant="outline" className="bg-green-400 text-white">
              {item.jobTypes}
            </Badge>
            <Badge variant="outline" className="bg-yellow-400 text-white">
              {item.salary}
            </Badge>
          </div>
          <div className="flex items-center justify-between my-3 mx-auto gap-3">
            <Button
              variant="outline"
              onClick={() => navigate(`/detail/${item._id}`)}>
              Detail
            </Button>
            <Button className="bg-purple-700">Save for later</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
