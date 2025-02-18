import { useParams } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getOnejob } from "../../redux/jobslice";
import { setLoading } from "../../redux/authslice";

export default function JobDescription() {
  const [isApplyed, setIsApplyed] = useState(false); // State to track if the user has applied
  let params = useParams();
  const jobid = params.id;
  const dispatch = useDispatch();
  let { loading } = useSelector((store) => store.auth);
  let { oneJob } = useSelector((store) => store.job);

  // Check if the user has already applied
  useEffect(() => {
    const checkIfApplied = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/application/check/${jobid}`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          setIsApplyed(res.data.applied); // Update the `isApplyed` state
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkIfApplied();
  }, [jobid]);

  // Fetch job details
  useEffect(() => {
    let fetchSingleByid = async () => {
      try {
        dispatch(setLoading(true));
        await axios
          .get(`http://localhost:8080/api/job/get/${jobid}`, {
            withCredentials: true,
          })
          .then((res) => {
            if (res.data.success) {
              dispatch(getOnejob(res.data.findjob));
            }
          });
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchSingleByid();
  }, [jobid, dispatch]);

  // Handle the "Apply" button click
  const handleApply = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/application/apply/${jobid}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setIsApplyed(true); // Update the `isApplyed` state
        alert("Application submitted successfully!");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error applying for the job.");
    }
  };

  return (
    <>
      {loading ? (
        <div>
          <h1>Loading ...</h1>
        </div>
      ) : oneJob ? (
        <div className="max-w-5xl mx-auto rounded-md my-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">{oneJob.title}</h1>
              <div>
                <Badge variant="outline" className="text-indigo-600 text-md">
                  {oneJob.position}
                </Badge>
                <Badge variant="outline" className="text-orange-600 text-md">
                  {oneJob.salary}
                </Badge>
                <Badge variant="outline" className="text-purple-600 text-md">
                  {oneJob.jobTypes}
                </Badge>
              </div>
            </div>
            <div>
              <Button
                disabled={isApplyed}
                onClick={handleApply} // Add the click handler
                className={`text-md rounded-lg ${
                  isApplyed
                    ? "bg-gray-600 cursor-not-allowed text-white"
                    : "bg-indigo-700 text-white hover:bg-indigo-800"
                }`}>
                {isApplyed ? "Already applied" : "Apply now"}
              </Button>
            </div>
          </div>
          <h1 className=" border-b-2 border-b-gray-400 font-bold py-4">
            Job Description
          </h1>
          <div>
            <h1 className="my-2 text-md font-semibold">
              Role:
              <span className="ps-3 text-md text-gray-500 font-semibold">
                {oneJob.title}
              </span>
            </h1>
            <h1 className="my-2 text-md font-semibold">
              Location:
              <span className="ps-3 text-md text-gray-500 font-semibold">
                {oneJob.location}
              </span>
            </h1>
            <h1 className="my-3 text-md font-semibold">
              Description:
              <span className="ps-3 text-md text-gray-500 font-semibold">
                {oneJob.description}
              </span>
            </h1>
            <h1 className="my-3 text-md font-semibold">
              Experience:
              <span className="ps-3 text-md text-gray-500 font-semibold">
                {oneJob.experiance}
              </span>
            </h1>
            <h1 className="my-3 text-md font-semibold">
              Salary:
              <span className="ps-3 text-md text-gray-500 font-semibold">
                {oneJob.salary}
              </span>
            </h1>
            <h1 className="my-3 text-md font-semibold">
              Total Applicant:
              <span className="ps-3 text-md text-gray-500 font-semibold">
                {oneJob?.applications?.length ?? "N/A"}
              </span>
            </h1>
            <h1 className="my-3 text-md font-semibold ">
              Requirements:
              <span className="ps-3 text-md text-gray-500 font-semibold">
                {oneJob?.requirements.map((item) => (
                  <p>{item}</p>
                ))}
              </span>
            </h1>
            <h1 className="my-3 text-md font-semibold">
              posted Date:
              <span className="ps-3 text-md text-gray-500 font-semibold">
                {oneJob?.createdAt?.split("T")[0] ?? "N/A"}
              </span>
            </h1>
          </div>
        </div>
      ) : (
        <div>not</div>
      )}
    </>
  );
}
