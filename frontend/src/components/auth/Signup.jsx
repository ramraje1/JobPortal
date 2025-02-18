import axios from "axios";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLoading } from "../../../redux/authslice";

export function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { loading } = useSelector((store) => store.auth);

  let [input, setinput] = useState({
    FullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    profilePhoto: null,
  });

  const changeEvent = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setinput({ ...input, profilePhoto: file });
    console.log("Selected file:", file);
  };

  const onsubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("FullName", input.FullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role); // Correctly append the role
    if (input.profilePhoto) {
      formData.append("profilePhoto", input.profilePhoto);
    }

    // Debugging: Log FormData entries
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        "http://localhost:8080/api/user/signUp",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Fix the typo
          },
          withCredentials: true,
        }
      );
      console.log("Response:", response.data);
      navigate("/login");
      alert("Registration successful!");
    } catch (error) {
      console.error("Error Details:", error.response || error.message);
      alert(error.response?.data?.message || "Error during registration!");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <div className="d-flex justify-center align-items-center py-4 bg-body-tertiary border w-100 p-5 ">
        <form className="w-25" onSubmit={onsubmit}>
          <img className="mb-4" src="" alt="" width="72" height="57" />
          <h1 className="h3 mb-3 fw-dark">Please sign up</h1>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="FullName"
              placeholder="Ramchandra Mane"
              value={input.FullName}
              onChange={changeEvent}
              name="FullName"
            />
            <label htmlFor="FullName">FullName</label>
          </div>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={input.email}
              onChange={changeEvent}
              name="email"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="phone"
              placeholder="8080808"
              value={input.phoneNumber}
              onChange={changeEvent}
              name="phoneNumber"
            />
            <label htmlFor="phone">Phone</label>
          </div>
          <div className="form-floating pb-2">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={input.password}
              onChange={changeEvent}
              name="password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="form-floating">
            <input
              type="file"
              className="form-control"
              accept="image/*"
              id="file"
              onChange={changeFileHandler}
              name="profilePhoto" // Match the backend expectation
            />
            <label htmlFor="file">Profile Photo</label>
          </div>

          <div className="form-check form-check-inline mt-1">
            <input
              className="form-check-input fs-6"
              type="radio"
              name="role"
              id="inlineRadio1"
              value="student"
              checked={input.role === "student"}
              onChange={changeEvent}
            />
            <label className="form-check-label fs-6" htmlFor="inlineRadio1">
              Student
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="inlineRadio2"
              value="recuriter"
              checked={input.role === "recuriter"}
              onChange={changeEvent}
            />
            <label className="form-check-label" htmlFor="inlineRadio2">
              Recruiter
            </label>
          </div>

          <button className="btn btn-primary w-100 py-2 mt-2" type="submit">
            {loading ? <p>loading..</p> : <p>Sign up</p>}
          </button>
          <p className="mt-3 mb-3 text-body-secondary fs-5">
            Already have an account?
            <Link className="text-blue-700 fw-normal" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

// import axios from "axios";
// import { useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { setLoading } from "../../../redux/authslice";
// export function Signup() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   let { loading } = useSelector((store) => store.auth);
//   // const fullNameRef = useRef("");
//   // const emailRef = useRef("");
//   // const phoneNumberRef = useRef("");
//   // const passwordRef = useRef("");
//   // const roleRef = useRef("");
//   // const fileRef = useRef("");

//   let [input, setinput] = useState({
//     FullName: "",
//     email: "",
//     phoneNumber: "",
//     password: "",
//     role: "",
//     file: "",
//     profilePhoto: null,
//   });
//   const changeEvent = (e) => {
//     setinput({ ...input, [e.target.name]: e.target.value });
//   };
//   // const changeFileHandler = (e) => {

//   //   setinput({ ...input, file: e.target.files?.[0] });
//   // };
//   const changeFileHandler = (e) => {
//     const file = e.target.files?.[0];
//     setinput({ ...input, profilePhoto: file });
//     console.log("Selected file:", file);
//   };

//   const onsubmit = async (e) => {
//     e.preventDefault();
//     let formData = new FormData();
//     formData.append("FullName", input.FullName);
//     formData.append("email", input.email);
//     formData.append("phoneNumber", input.phoneNumber);
//     formData.append("password", input.password);
//     formData.append("role", input.role.checked ? "student" : "recuriter");
//     formData.append("profilePhoto", input.profilePhoto);
//     // const payload = {
//     //   FullName: input.FullName,
//     //   email: input.email,
//     //   phoneNumber: input.phoneNumber,
//     //   password: input.password,
//     //   role: input.role,
//     // };

//     console.log("Sending data:", formData);

//     try {
//       dispatch(setLoading(true));
//       const response = await axios.post(
//         "http://localhost:8080/api/user/signUp",
//         formData, // Send JSON data
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           withCredentials: true,
//         }
//       );
//       console.log("Response:", response.data);
//       navigate("/login");
//       alert("Registration successful!");
//     } catch (error) {
//       console.error("Error Details:", error.response || error.message);
//       alert(error.response?.data?.message || "Error during registration!");
//     } finally {
//       dispatch(setLoading(false));
//     }

//     // try {
//     //   const response = await axios.post(
//     //     "http://localhost:8080/api/user/signUp",

//     //     {
//     //       body: formData,
//     //       headers: {
//     //         "Content-Type": "multipart/form-data",
//     //       },
//     //       withCredentials: true,
//     //     }
//     //   );
//     //   console.log("Response:", response.data);
//     //   alert("Registration successful!");
//     // } catch (error) {
//     //   console.error("Error Details:", error.response || error.message);
//     //   alert("Error during registration!");
//     // }
//   };

//   return (
//     <>
//       <div className="d-flex justify-center align-items-center py-4 bg-body-tertiary border w-100 p-5 ">
//         <form className="w-25" onSubmit={onsubmit}>
//           <img className="mb-4" src="" alt="" width="72" height="57" />
//           <h1 className="h3 mb-3 fw-dark">Please sign up</h1>

//           <div className="form-floating">
//             <input
//               contentEditable
//               type="text"
//               className="form-control"
//               id="FullName"
//               placeholder="Ramchandra Mane"
//               value={input.FullName}
//               onChange={changeEvent}
//               name="FullName"
//             />
//             <label htmlFor="FullName">FullName</label>
//           </div>
//           <div className="form-floating">
//             <input
//               type="email"
//               className="form-control"
//               id="floatingInput"
//               placeholder="name@example.com"
//               value={input.email}
//               onChange={changeEvent}
//               name="email"
//             />
//             <label htmlFor="floatingInput">Email address</label>
//           </div>
//           <div className="form-floating">
//             <input
//               type="text"
//               className="form-control"
//               id="phone"
//               placeholder="8080808"
//               value={input.phoneNumber}
//               onChange={changeEvent}
//               name="phoneNumber"
//             />
//             <label htmlFor="phone">Phone</label>
//           </div>
//           <div className="form-floating pb-2">
//             <input
//               type="password"
//               className="form-control"
//               id="floatingPassword"
//               placeholder="Password"
//               value={input.password}
//               onChange={changeEvent}
//               name="password"
//             />
//             <label htmlFor="floatingPassword">Password</label>
//           </div>
//           <div className="form-floating">
//             <input
//               type="file"
//               className="form-control"
//               accept="image/*"
//               id="file"
//               onChange={changeFileHandler}
//               name="profilePhoto"
//             />
//             <label htmlFor="file">Profile Photo</label>
//           </div>

//           <div className="form-check form-check-inline mt-1">
//             <input
//               className="form-check-input fs-6"
//               type="radio"
//               name="role"
//               id="inlineRadio1"
//               value="student"
//               checked={input.role === "student"}
//               onChange={changeEvent}
//             />
//             <label className="form-check-label fs-6" htmlFor="inlineRadio1">
//               Student
//             </label>
//           </div>
//           <div className="form-check form-check-inline">
//             <input
//               className="form-check-input"
//               type="radio"
//               name="role"
//               id="inlineRadio2"
//               value="recuriter"
//               checked={input.role === "recuriter"}
//               onChange={changeEvent}
//             />
//             <label className="form-check-label" htmlFor="inlineRadio2">
//               Recruiter
//             </label>
//           </div>

//           <button className="btn btn-primary w-100 py-2 mt-2" type="submit">
//             {loading ? <p>loading..</p> : <p>Sign up</p>}
//           </button>
//           <p className="mt-3 mb-3 text-body-secondary fs-5">
//             Already have an account?
//             <Link className="text-blue-700 fw-normal" to="/login">
//               Login
//             </Link>
//           </p>
//         </form>
//       </div>
//     </>
//   );
// }
