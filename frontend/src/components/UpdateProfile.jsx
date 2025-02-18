import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { useState, useEffect } from "react";
import axios from "axios";
import { setLoading, setUser } from "../../redux/authslice";

export default function UpdateProfile({ open, setopen }) {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { loading } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    name: user?.FullName || "",
    number: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    profilePhoto: user?.profile?.profilePhoto || null,
    resume: user?.profile?.profilePhoto || null,
  });

  useEffect(() => {
    if (user) {
      setInput({
        name: user.FullName,
        number: user.phoneNumber,
        bio: user.profile?.bio,
        skills: user.profile?.skills.join(", "),
        profilePhoto: user?.profile?.profilePhoto || null,
        resume: user?.profile?.profilePhoto || null,
      });
    }
  }, [user]);

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    if (e.target.name === "profilePhoto") {
      const file = e.target.files[0];
      console.log("Selected file:", file);
      setInput({ ...input, profilePhoto: file });
    } else if (e.target.name === "resume") {
      const file = e.target.files[0];
      console.log("Selected file:", file);
      setInput({ ...input, resume: file });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("FullName", input.name);
    formData.append("phoneNumber", input.number);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.profilePhoto) {
      formData.append("profilePhoto", input.profilePhoto);
    }
    if (input.resume) {
      formData.append("resume", input.resume);
    }

    // Debugging: Log FormData entries
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      dispatch(setLoading(true));

      const res = await axios.put(
        "http://localhost:8080/api/user/profile/update",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      console.log("Response received:", res.data);

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        localStorage.setItem("user", JSON.stringify(res.data.user));
        alert("Profile updated successfully!");
        setopen(false);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        alert(error.response.data.message || "Something went wrong.");
      } else {
        alert("Network error or server is not responding.");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={() => setopen(false)}>
        <DialogHeader>
          <DialogTitle>Update Profile {user.email}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} encType="multipart/form-data">
          <div className="grid gap-3">
            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="name" className="text-center">
                Name:
              </Label>
              <input
                type="text"
                value={input.name}
                name="name"
                placeholder="Enter your name"
                onChange={handleInput}
                className="col-span-3 text-xl border border-black"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="number" className="text-center">
                Phone:
              </Label>
              <input
                type="text"
                value={input.number}
                name="number"
                placeholder="Enter your phone number"
                onChange={handleInput}
                className="col-span-3 text-xl border border-black"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="skills" className="text-center">
                Skills:
              </Label>
              <input
                type="text"
                value={input.skills}
                name="skills"
                placeholder="Enter skills (comma-separated)"
                onChange={handleInput}
                className="col-span-3 text-xl border border-black"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="bio" className="text-center">
                Bio:
              </Label>
              <input
                type="text"
                value={input.bio}
                name="bio"
                placeholder="Enter your bio"
                onChange={handleInput}
                className="col-span-3 text-xl border border-black"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="profilePhoto" className="text-center">
                Profile Photo:
              </Label>
              <input
                type="file"
                name="profilePhoto"
                accept="image/*"
                onChange={handleChange}
                className="col-span-3 text-xl border border-black"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="resume" className="text-center">
                Resume:
              </Label>
              <input
                type="file"
                name="resume"
                accept="image/pdf"
                onChange={handleChange}
                className="col-span-3 text-xl border border-black"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">
              {loading ? <p>Loading..</p> : <p>Update</p>}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// import { useDispatch, useSelector } from "react-redux";
// import { Button } from "./ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "./ui/dialog";
// import { Label } from "./ui/label";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { setLoading, setUser } from "../../redux/authslice";

// export default function UpdateProfile({ open, setopen }) {
//   const dispatch = useDispatch();
//   const { user } = useSelector((store) => store.auth); // Retrieve user from Redux
//   const { loading } = useSelector((store) => store.auth);
//   const [input, setInput] = useState({
//     name: user?.FullName || "",
//     number: user?.phoneNumber || "",
//     bio: user?.profile?.bio || "",
//     skills: user?.profile?.skills?.join(", ") || "", // Convert skills array to string
//   });

//   // Update input fields when user data changes
//   useEffect(() => {
//     if (user) {
//       setInput({
//         name: user.FullName,

//         number: user.phoneNumber,
//         bio: user.profile?.bio,
//         skills: user.profile?.skills.join(", "),
//       });
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     const payload = {
//       FullName: input.name,

//       phoneNumber: input.number,
//       bio: input.bio,
//       skills: input.skills,
//     };
//     try {
//       dispatch(setLoading(true));
//       const token = localStorage.getItem("token");
//       const res = await axios.put(
//         "http://localhost:8080/api/user/profile/update",
//         payload,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true, // If using cookies
//         }
//       );

//       if (res.data.success) {
//         dispatch(setUser(res.data.user));
//         localStorage.setItem("user", JSON.stringify(res.data.user));
//         dispatch(setUser(res.data.user));
//         alert("Profile updated successfully!");
//         dispatch(setLoading(false));
//         setopen(false);
//       } else {
//         alert(res.data.message);
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       alert("Something went wrong while updating the profile.");
//     }
//   };

//   return (
//     <Dialog open={open}>
//       <DialogContent
//         className="sm:max-w-[425px]"
//         onInteractOutside={() => setopen(false)}>
//         <DialogHeader>
//           <DialogTitle>Update Profile {user.email}</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={onSubmit}>
//           <div className="grid gap-3">
//             <div className="grid grid-cols-4 items-center gap-3">
//               <Label htmlFor="name" className="text-center">
//                 Name:
//               </Label>
//               <input
//                 type="text"
//                 value={input.name}
//                 name="name"
//                 placeholder="Enter your name"
//                 onChange={handleChange}
//                 className="col-span-3 text-xl border border-black"
//               />
//             </div>

//             <div className="grid grid-cols-4 items-center gap-3">
//               <Label htmlFor="number" className="text-center">
//                 Phone:
//               </Label>
//               <input
//                 type="text"
//                 value={input.number}
//                 name="number"
//                 placeholder="Enter your phone number"
//                 onChange={handleChange}
//                 className="col-span-3 text-xl border border-black"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-3">
//               <Label htmlFor="skills" className="text-center">
//                 Skills:
//               </Label>
//               <input
//                 type="text"
//                 value={input.skills}
//                 name="skills"
//                 placeholder="Enter skills (comma-separated)"
//                 onChange={handleChange}
//                 className="col-span-3 text-xl border border-black"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-3">
//               <Label htmlFor="bio" className="text-center">
//                 Bio:
//               </Label>
//               <input
//                 type="text"
//                 value={input.bio}
//                 name="bio"
//                 placeholder="Enter your bio"
//                 onChange={handleChange}
//                 className="col-span-3 text-xl border border-black"
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button type="submit">
//               {loading ? <p>Loading..</p> : <p>update</p>}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }
