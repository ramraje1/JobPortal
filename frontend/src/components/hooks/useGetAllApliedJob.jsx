import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAppliedJob } from "../../../redux/applicationSlice";
import { setLoading } from "../../../redux/authslice";
export default function useGetAppliedJob() {
  let dispatch = useDispatch();
  useEffect(() => {
    let fetchAppliedJob = async () => {
      try {
        dispatch(setLoading(true));
        let res = await axios.get("http://localhost:8080/api/application/get", {
          withCredentials: true,
        });
        console.log(res.data);
        if (res.data.success) {
          console.log(res.data.application);
          dispatch(getAppliedJob(res.data.application));
        } else {
          console.log(res.data.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchAppliedJob();
  }, [dispatch]);
}
