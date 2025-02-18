import { useEffect } from "react";
import ApplicantTable from "./ApplicantTable";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getApplicant } from "../../../redux/applicationSlice";
import { setLoading } from "../../../redux/authslice";

export default function Applicant() {
  let params = useParams();
  let id = params.id;
  let dispatch = useDispatch();
  let { applicant } = useSelector((store) => store.application);

  let { loading } = useSelector((store) => store.auth);
  useEffect(() => {
    const fetchApplication = async () => {
      try {
        dispatch(setLoading(true));
        let res = await axios.get(
          `http://localhost:8080/api/application/${id}/applicant`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(getApplicant(res.data.job));
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchApplication();
  }, []);
  if (loading) {
    return <center>loading..</center>;
  }
  return (
    <div className="max-w-fit mx-auto">
      <h1>Number of Applicant {applicant?.applications?.length}</h1>
      <ApplicantTable applicant={applicant} />
    </div>
  );
}
