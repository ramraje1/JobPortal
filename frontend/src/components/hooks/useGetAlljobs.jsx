import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlljob } from "../../../redux/jobslice";
import { setLoading } from "../../../redux/authslice";

export default function useGetAllJobs() {
  let { loading } = useSelector((store) => store.auth);
  let dispatch = useDispatch();
  useEffect(() => {
    const fetchAll = async () => {
      try {
        dispatch(setLoading(true));
        let res = await axios.get("http://localhost:8080/api/job/get", {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAlljob(res.data.jobs));
          // console.log(res.data.jobs);
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchAll();
  }, [dispatch]);
  return <></>;
}
