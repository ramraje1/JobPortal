import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetCompanyById from "../hooks/useGetCompanyById";

export default function CompanySetUp() {
  let params = useParams();
  let compId = params.id;
  useGetCompanyById(compId);
  let { singleCompany } = useSelector((store) => store.company);
  let navigate = useNavigate();

  // name,description,website,location
  let [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    logo: null,
  });

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        logo: singleCompany.logo || null,
      });
    }
  }, [singleCompany]);
  // let handelState = () => {
  //   setInput((state) => {
  //     ({ ...state, [e.target.name]: e.target.value });
  //   });
  let handelState = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  let handelFile = (e) => {
    let file = e.target.files?.[0];
    setInput({ ...input, logo: file });
  };

  let onSubmit = async (e) => {
    e.preventDefault();
    // let paylod = {
    //   name: input.name,
    //   description: input.description,
    //   website: input.website,
    //   location: input.location,
    //   logo: input.logo,
    // };
    // console.log(paylod);
    let fromData = new FormData();
    fromData.append("name", input.name);
    fromData.append("description", input.description);
    fromData.append("website", input.website);
    fromData.append("location", input.location);
    if (input.logo) {
      fromData.append("logo", input.logo);
    }

    for (let [key, value] of fromData.entries()) {
      console.log(key, value);
    }
    try {
      let res = await axios.put(
        `http://localhost:8080/api/company/update/${compId}`,

        fromData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        alert(res.data.message);
        navigate("/admin/companies");
        // console.log(res.data.company);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="max-w-xl mx-auto ">
        <div>
          <Label className="text-md font-semibold py-1" htmlFor="name">
            Name
          </Label>
          <Input name="name" value={input.name} onChange={handelState}></Input>
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
        <div className="my-1">
          <Label className="text-md font-semibold py-1" htmlFor="website">
            website
          </Label>
          <Input
            name="website"
            value={input.website}
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
          <Label className="text-md font-semibold py-1" htmlFor="logo">
            logo
          </Label>
          <Input
            type="file"
            id="logo"
            accept="image/*"
            name="logo"
            placeholder="select"
            onChange={handelFile}></Input>
        </div>
        <div className="flex my-4">
          <Button
            onClick={onSubmit}
            className="bg-green-500 text-white hover:bg-red-500"
            type="submit">
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}
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
