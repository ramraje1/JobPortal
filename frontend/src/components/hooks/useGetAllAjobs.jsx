import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setadminJob } from "../../../redux/jobslice";

export default function useGetAllAjobs() {
  let dispatch = useDispatch();

  let fetchJobs = async () => {
    try {
      let res = await axios.get("http://localhost:8080/api/job/adiminjob", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setadminJob(res.data.getJob));
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, [dispatch]);
  return fetchJobs;
}
