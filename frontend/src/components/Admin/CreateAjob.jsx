import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useGetCompanyById from "../hooks/useGetCompanyById";
import useGetAllCompany from "../hooks/useGetAllCompany";
import { setadminJob } from "../../../redux/jobslice";

export default function CreateAjob() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  useGetAllCompany();
  let { comp } = useSelector((store) => store.company);
  let [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salary: "",
    jobTypes: "",
    position: 0,
    experiance: "",
    company_id: "",
  });

  let handelState = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  let handleCompanyChange = (value) => {
    setInput({ ...input, company_id: value });
  };

  let onSubmit = async (e) => {
    e.preventDefault();
    let fromData = new FormData();
    fromData.append("title", input.title);
    fromData.append("description", input.description);
    fromData.append("requirements", input.requirements);
    fromData.append("location", input.location);
    fromData.append("salary", input.salary);
    fromData.append("jobTypes", input.jobTypes);
    fromData.append("position", input.position);
    fromData.append("experiance", input.experiance);
    fromData.append("company_id", input.company_id);

    for (let [key, value] of fromData.entries()) {
      console.log(key, value);
    }
    try {
      let res = await axios.post(
        `http://localhost:8080/api/job/post`,
        fromData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(fromData);
      if (res.data.success) {
        // dispatch(setadminJob(res.data.newJob));
        navigate("/admin/jobs");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto ">
        <div>
          <Label className="text-md font-semibold py-1" htmlFor="name">
            title
          </Label>
          <Input
            name="title"
            value={input.title}
            onChange={handelState}></Input>
        </div>
        <div className="my-1">
          <Label className="text-md font-semibold py-1" htmlFor="name">
            Description
          </Label>
          <Textarea
            type="text"
            name="description"
            value={input.description}
            onChange={handelState}></Textarea>
        </div>
        <div className="grid grid-cols-2 gap-1">
          <div className="my-1">
            <Label className="text-md font-semibold py-1" htmlFor="website">
              requirements
            </Label>
            <Input
              name="requirements"
              value={input.requirements}
              onChange={handelState}></Input>
          </div>
          <div className="my-1">
            <Label className="text-md font-semibold py-1" htmlFor="location">
              location
            </Label>
            <Input
              name="location"
              value={input.location}
              onChange={handelState}></Input>
          </div>
          <div className="my-1">
            <Label className="text-md font-semibold py-1" htmlFor="location">
              salary
            </Label>
            <Input
              name="salary"
              value={input.salary}
              onChange={handelState}></Input>
          </div>
          <div className="my-1">
            <Label className="text-md font-semibold py-1" htmlFor="location">
              position
            </Label>
            <Input
              name="position"
              value={input.position}
              onChange={handelState}></Input>
          </div>
          <div className="my-1">
            <Label className="text-md font-semibold py-1" htmlFor="location">
              experience
            </Label>
            <Input
              name="experiance"
              value={input.experiance}
              onChange={handelState}></Input>
          </div>
          <div className="my-1">
            <Label className="text-md font-semibold py-1" htmlFor="jobTypes">
              jobTypes
            </Label>
            <Input
              name="jobTypes"
              value={input.jobTypes}
              onChange={handelState}></Input>
          </div>
          <div className="mt-4 pt-2 flex items-center justify-center">
            <Select onValueChange={handleCompanyChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a company" />
              </SelectTrigger>
              <SelectContent>
                {comp.map((item, index) => {
                  return (
                    <SelectItem key={item._id} value={item._id}>
                      {item.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex my-4">
          <Button
            onClick={onSubmit}
            className="bg-green-500 text-white hover:bg-red-500"
            type="submit">
            post
          </Button>
        </div>
      </div>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { Textarea } from "../ui/textarea";
// import { Button } from "../ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import useGetCompanyById from "../hooks/useGetCompanyById";
// import useGetAllCompany from "../hooks/useGetAllCompany";

// export default function CreateAjob() {
//   useGetAllCompany();
//   let { comp } = useSelector((store) => store.company);
//   // let params = useParams();
//   // let compId = params.id;
//   // useGetCompanyById(compId);
//   // let { singleCompany } = useSelector((store) => store.company);
//   // let navigate = useNavigate();
//   // title,
//   // description,
//   // requirements,
//   // salary,
//   // location,
//   // jobTypes,
//   // position,
//   // experiance,
//   // company_id,
//   // name,description,website,location
//   let [input, setInput] = useState({
//     title: "",
//     description: "",
//     requirements: "",
//     location: "",
//     salary: "",
//     jobTypes: "",
//     position: 0,
//     experiance: "",
//     company_id: "",
//   });
//   // let handelState = () => {
//   //   setInput((state) => {
//   //     ({ ...state, [e.target.name]: e.target.value });
//   //   });
//   let handelState = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };
//   let handelChange = (value) => {
//     setInput({ ...input, company_id: value });
//   };
//   let onSubmit = async (e) => {
//     e.preventDefault();
//     // let paylod = {
//     //   name: input.name,
//     //   description: input.description,
//     //   website: input.website,
//     //   location: input.location,
//     //   logo: input.logo,
//     // };
//     // console.log(paylod);
//     let fromData = new FormData();
//     fromData.append("title", input.title);
//     fromData.append("description", input.description);
//     fromData.append("requirements", input.requirements);
//     fromData.append("location", input.location);
//     fromData.append("salary", input.salary);
//     fromData.append("jobTypes", input.jobTypes);
//     fromData.append("position", input.position);
//     fromData.append("experiance", input.experiance);
//     fromData.append("company_id", input.company_id);

//     for (let [key, value] of fromData.entries()) {
//       console.log(key, value);
//     }
//     try {
//       let res = await axios.post(
//         `http://localhost:8080/api/job/post`,
//         {
//           fromData,
//         },

//         {
//           headers: {
//             "Content-Type": "application/josn",
//           },
//           withCredentials: true,
//         }
//       );
//       console.log(fromData);
//       if (res.data.success) {
//         alert(res.data.message);
//       } else {
//         alert(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <div className="max-w-2xl mx-auto ">
//         <div>
//           <Label className="text-md font-semibold py-1" htmlFor="title">
//             title
//           </Label>
//           <Input
//             name="title"
//             value={input.title}
//             onChange={handelState}></Input>
//         </div>
//         <div className="my-1">
//           <Label className="text-md font-semibold py-1" htmlFor="description">
//             Description
//           </Label>
//           <Textarea
//             type="text"
//             name="description"
//             value={input.description}
//             onChange={handelState}></Textarea>
//         </div>
//         <div className="grid grid-cols-2 gap-1">
//           <div className="my-1">
//             <Label className="text-md font-semibold py-1" htmlFor="website">
//               requirements
//             </Label>
//             <Input
//               name="requirements"
//               value={input.requirements}
//               onChange={handelState}></Input>
//           </div>
//           <div className="my-1">
//             <Label className="text-md font-semibold py-1" htmlFor="location">
//               location
//             </Label>
//             <Input
//               name="location"
//               value={input.location}
//               onChange={handelState}></Input>
//           </div>
//           <div className="my-1">
//             <Label className="text-md font-semibold py-1" htmlFor="salary">
//               salary
//             </Label>
//             <Input
//               name="salary"
//               value={input.salary}
//               onChange={handelState}></Input>
//           </div>
//           <div className="my-1">
//             <Label className="text-md font-semibold py-1" htmlFor="position">
//               possition
//             </Label>
//             <Input
//               name="position"
//               value={input.position}
//               onChange={handelState}></Input>
//           </div>
//           <div className="my-1">
//             <Label className="text-md font-semibold py-1" htmlFor="experiance">
//               experiance
//             </Label>
//             <Input
//               name="experiance"
//               value={input.experiance}
//               onChange={handelState}></Input>
//           </div>
//           <div className="my-1">
//             <Label className="text-md font-semibold py-1" htmlFor="jobTypes">
//               jobTypes
//             </Label>
//             <Input
//               name="jobTypes"
//               value={input.jobTypes}
//               onChange={handelState}></Input>
//           </div>
//           <div className="mt-4 pt-2 flex items-center justify-center">
//             <Select onValueChange={handelChange}>
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="select the company" />
//               </SelectTrigger>
//               <SelectContent>
//                 {comp.map((item, index) => {
//                   return (
//                     <SelectItem key={item._id} value={item._id}>
//                       {item.name}
//                     </SelectItem>
//                   );
//                 })}
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         <div className="flex my-4">
//           <Button
//             onClick={onSubmit}
//             className="bg-green-500 text-white hover:bg-red-500"
//             type="submit">
//             post
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
// import { useState } from "react";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { Textarea } from "../ui/textarea";
// import { Button } from "../ui/button";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// export default function CompanySetUp() {
//   let params = useParams();
//   let copId = params.id;

//   let [input, setInput] = useState({
//     name: "",
//     description: "",
//     website: "",
//     location: "",
//     logo: null,
//   });

//   let handelState = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   let handelFile = (e) => {
//     let file = e.target.files?.[0];
//     setInput({ ...input, logo: file });
//   };

//   let onSubmit = async (e) => {
//     e.preventDefault();

//     let formData = new FormData();
//     formData.append("name", input.name);
//     formData.append("description", input.description);
//     formData.append("website", input.website);
//     formData.append("location", input.location);
//     if (input.logo) {
//       formData.append("logo", input.logo); // Append the file
//     }

//     // Debugging: Log FormData entries
//     for (let [key, value] of formData.entries()) {
//       console.log(key, value);
//     }

//     try {
//       let res = await axios.put(
//         `http://localhost:8080/api/company/update/${copId}`,
//         formData, // Send the FormData object directly
//         {
//           headers: {
//             "Content-Type": "multipart/form-data", // Set the correct content type
//           },
//           withCredentials: true,
//         }
//       );
//       if (res.data.success) {
//         alert(res.data.message);
//       } else {
//         alert(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <div className="max-w-xl mx-auto ">
//         <div>
//           <Label className="text-md font-semibold py-1" htmlFor="name">
//             Name
//           </Label>
//           <Input name="name" value={input.name} onChange={handelState}></Input>
//         </div>
//         <div className="my-1">
//           <Label className="text-md font-semibold py-1" htmlFor="name">
//             Description
//           </Label>
//           <Textarea
//             type="text"
//             name="description"
//             value={input.description}
//             onChange={handelState}></Textarea>
//         </div>
//         <div className="my-1">
//           <Label className="text-md font-semibold py-1" htmlFor="website">
//             website
//           </Label>
//           <Input
//             name="website"
//             value={input.website}
//             onChange={handelState}></Input>
//         </div>
//         <div className="my-1">
//           <Label className="text-md font-semibold py-1" htmlFor="location">
//             location
//           </Label>
//           <Input
//             name="location"
//             value={input.location}
//             onChange={handelState}></Input>
//         </div>
//         <div className="my-1">
//           <Label className="text-md font-semibold py-1" htmlFor="logo">
//             logo
//           </Label>
//           <Input
//             type="file"
//             id="logo"
//             accept="image/*"
//             name="logo"
//             placeholder="select"
//             onChange={handelFile}></Input>
//         </div>
//         <div className="flex my-4">
//           <Button
//             onClick={onSubmit}
//             className="bg-green-500 text-white hover:bg-red-500"
//             type="submit">
//             Update
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
