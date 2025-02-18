import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../../redux/authslice";
import Loading from "../loading";
// import store from "../../../redux/store";
export default function Login() {
  let navigate = useNavigate();
  let { loading } = useSelector((store) => store.auth);
  let dispatch = useDispatch();
  let [input, setinput] = useState({
    email: "",
    password: "",
    role: "",
  });
  let changeEvent = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };
  let onSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    let payload = {
      email: input.email,
      password: input.password,
      role: input.role,
    };
    try {
      dispatch(setLoading(true));
      let res = await axios.post(
        "http://localhost:8080/api/user/login",
        payload
      );
      if (res.data.success) {
        //  let token=localStorage.setItem(res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        dispatch(setUser(res.data.user));
        navigate("/");
        // alert(`login successful ${res.data.token}`);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert("something is went wrong");
      console.log("something is error");
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="d-flex justify-center align-items-center py-4 bg-body-tertiary border w-100 p-5 ">
          <form className="w-25" onSubmit={onSubmit}>
            <img className="mb-4" src="" alt="" width="72" height="57" />
            <h1 className="h3 mb-3 fw-dark">please Login</h1>

            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                name="email"
                value={input.email}
                onChange={changeEvent}
              />
              <label for="floatingInput">Email address</label>
            </div>

            <div className="form-floating pb-2">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                name="password"
                value={input.password}
                onChange={changeEvent}
              />
              <label for="floatingPassword">Password</label>
            </div>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="role"
                id="inlineRadio1"
                value="student"
                checked={input.role === "student"}
                onChange={changeEvent}
              />
              <label className="form-check-label" for="inlineRadio1">
                student
              </label>
            </div>
            <div className="form-check form-check-inline ">
              <input
                className="form-check-input"
                type="radio"
                name="role"
                id="inlineRadio2"
                value="recuriter"
                checked={input.role === "recuriter"}
                onChange={changeEvent}
              />
              <label className="form-check-label" for="inlineRadio2">
                recuriter
              </label>
            </div>

            <button
              className="btn btn-primary w-100 py-2 mt-2 cursor-pointer"
              type="submit">
              login
              {/* {loading ? <p>loading ...</p> : <p>Login</p>} */}
            </button>

            <p className="mt-3 mb-3 text-body-secondary fs-5">
              Don't have an account?
              <Link className="text-blue-700 fw-normal" to="/signup">
                signup
              </Link>
            </p>
          </form>
        </div>
      )}
    </>
  );
}
