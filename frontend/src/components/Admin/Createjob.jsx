// import { useNavigate } from "react-router-dom";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import { useState } from "react";
// import axios from "axios";

// export default function Createjob() {
//   let navigate = useNavigate();
//   let [company, setCompany] = useState("");

//   const onsubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log("Submitting company:", company); // Debugging: Log the company name
//       let res = await axios.post(
//         "http://localhost:8080/api/company/register",
//         {
//           companyName: company,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );
//       console.log("Response:", res.data); // Debugging: Log the response
//       if (res.data.success) {
//         alert(res.data.message);
//         navigate("/admin/companies"); // Redirect after successful submission
//       } else {
//         alert(res.data.message || "Failed to register company.");
//       }
//     } catch (error) {
//       console.error("Error Details:", error.response || error.message); // Debugging: Log the error
//       alert(
//         error.response?.data?.message ||
//           "An error occurred while registering the company."
//       );
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto my-11">
//       <div>
//         <h1 className="font-bold text-xl">Your Company Name</h1>
//         <p className="text-md text-gray-500">
//           What would you like to name your company? You can change this later.
//         </p>
//         <Label className="mt-10 pb-2 font-semibold" htmlFor="comp">
//           Company Name
//         </Label>
//         <Input
//           type="text"
//           placeholder="JobHunt"
//           id="comp"
//           onChange={(e) => setCompany(e.target.value)}
//         />
//         <div className="flex gap-2 items-center my-6">
//           <Button
//             variant="outline"
//             onClick={() => navigate("/admin/companies")}>
//             Cancel
//           </Button>
//           <Button onClick={onsubmit}>Continue</Button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../../../redux/companyslice";

export default function Createjob() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [company, setCompany] = useState("");
  const onsubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(
        "http://localhost:8080/api/company/register",
        {
          companyName: company,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Response:", res.data);
      if (res.data.success) {
        dispatch(setSingleCompany(res.data.newCom));
        alert(res.data.message);
        let comId = res?.data?.newCom?._id;

        navigate(`/admin/companies/${comId}`);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-4xl mx-auto my-11">
      <div>
        <h1 className="font-bold text-xl">Your Company Name</h1>
        <p className=" text-md text-gray-500 ">
          what would you like to your company name ? you can change this later
        </p>
        <Label className="mt-10 pb-2 font-semibold" for="comp">
          Company Name
        </Label>
        <Input
          type="text"
          placeholder="JobHunt"
          id="comp"
          onChange={(e) => setCompany(e.target.value)}></Input>
        <div className="flex gap-2 items-center my-6">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}>
            cancel
          </Button>
          <Button onClick={onsubmit}>continue</Button>
        </div>
      </div>
    </div>
  );
}
