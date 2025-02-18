import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setInputQuery } from "../../redux/jobslice";
import { useNavigate } from "react-router-dom";
export default function HeroSection() {
  let [input, setInput] = useState("");
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let handleInput = async () => {
    dispatch(setInputQuery(input));
    navigate("/browse");
  };
  return (
    <>
      <center className="mt-4">
        <div className="border border-gray-100 rounded-xl w-fit bg-gray-50 ">
          <span className="text-lg text-orange-400 font-bold p-2">
            India's No.1 Job Hunt website
          </span>
        </div>
        <h1 className="text-black text-5xl font-bold mt-3">
          Search,Apply &
          <br />
          Get Your{" "}
          <span className="text-purple-500 text-5xl font-bold ">
            {" "}
            Dream Jobs
          </span>{" "}
        </h1>
        <p className="mt-2  font-semibold text-black">
          just search and get your dream job with your skill
        </p>
        <div
          className="border border-gray-700 rounded-full flex flex-row text-start justify-between mt-4 shadow-lg shadow-gray-800"
          style={{ width: "35%", borderRadius: "50%" }}>
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            className="focus:outline-none border-none w-100"
            placeholder="Find your dream job"
          />
          <div className="flex items-center justify-center rounded-e-full bg-purple-800 p-1  w-fit">
            <CiSearch
              role="button"
              onClick={handleInput}
              className="text-2xl text-white  "
            />
          </div>
        </div>
      </center>
    </>
  );
}
