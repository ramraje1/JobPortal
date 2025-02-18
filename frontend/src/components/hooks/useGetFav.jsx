import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setFav } from "../../../redux/jobslice";

import { setLoading } from "../../../redux/authslice";
import { useEffect } from "react";
import axios from "axios";
export default function useGetFav() {
  let dispatch = useDispatch();
  // let { loading } = useSelector((store) => store.auth);
  // let { fav } = useSelector((store) => store.job);
  let navigate = useNavigate();
  // let params = useParams();
  // let id = params.id;

  const fatchFav = async () => {
    try {
      dispatch(setLoading(true));
      let res = await axios.get(
        `http://localhost:8080/api/job/getreq`,

        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setFav(res.data.favjobs));
        console.log(res.data.favjobs);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    fatchFav();
  }, [dispatch]);
  return fatchFav;
}
