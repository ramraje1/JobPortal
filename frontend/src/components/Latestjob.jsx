import { useSelector } from "react-redux";
import Latestcard from "./Latestcard";
import useGetAllJobs from "./hooks/useGetAlljobs";

export default function Latestjob() {
  useGetAllJobs();
  let { allJob } = useSelector((store) => store.job);
  let { Query } = useSelector((store) => store.job);
  let filterJob = Query
    ? allJob.filter((item) =>
        item.title.toLowerCase().includes(Query.toLowerCase())
      )
    : allJob;
  return (
    <>
      <div className="mt-6 pt-6" style={{ marginLeft: "200px" }}>
        <h1 className="text-3xl font-bold text-black  ">
          <span className=" text-purple-700">Latest & Top </span>Job Openings
        </h1>
        <div className="grid grid-cols-3 gap-4 mt-4 mb-11 max-w-full me-4 ">
          {filterJob.length <= 0 ? (
            <center>
              <h1>There is Not any Availabel Post </h1>
            </center>
          ) : (
            filterJob.map((item, index) => (
              <Latestcard key={index} item={item}></Latestcard>
            ))
          )}
        </div>
      </div>
    </>
  );
}
