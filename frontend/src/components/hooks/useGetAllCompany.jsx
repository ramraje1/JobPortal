import { useDispatch, useSelector } from "react-redux";
import { setCompanies } from "../../../redux/companyslice";
import { useEffect } from "react";
import axios from "axios";

export default function useGetAllCompany() {
  let dispatch = useDispatch();
  // let { loading } = useSelector((store = store.auth));

  let getCompany = async () => {
    try {
      // dispatch(setLoading(true));
      let res = await axios.get("http://localhost:8080/api/company/get", {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setCompanies(res.data.companies));
        // alert(res.data.message);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
    // } finally {
    //   // dispatch(setLoading(false));
    // }
  };
  useEffect(() => {
    getCompany();
  }, [dispatch]);
  return getCompany;
}
