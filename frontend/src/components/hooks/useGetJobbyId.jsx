import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOnejob } from "../../../redux/jobslice";

export default function useGetJobById(id) {
  let dispatch = useDispatch();
  let fetchData = async () => {
    try {
      let res = await axios.get(`http://localhost:8080/api/job/get/${id}`, {
        withCredentials: true,
      });
      console.log(res);
      if (res.data.success) {
        dispatch(getOnejob(res.data.findjob));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [dispatch]);
}
