import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAlljob } from "../../../redux/jobslice";
import { setSingleCompany } from "../../../redux/companyslice";

export default function useGetCompanyById(compId) {
  let dispatch = useDispatch();
  useEffect(() => {
    if (!compId) return;
    const fetchSingleCompany = async () => {
      try {
        let res = await axios.get(
          `http://localhost:8080/api/company/get/${compId}`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setSingleCompany(res.data.companey));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleCompany();
  }, [compId, dispatch]);
  return <></>;
}
