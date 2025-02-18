import { useSelector } from "react-redux";
import Job from "./Job";
import useGetAllJobs from "./hooks/useGetAlljobs";

export default function Browse() {
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
      <div className="max-w-6xl mx-auto my-10">
        <h1 className="font-semibold my-10">
          search result {filterJob.length}
        </h1>
        <div className="grid grid-cols-3 gap-4 ">
          {/* {randomJobs.map((item, index) => {
            return <Job />;
          })} */}
          {filterJob.length <= 0 ? (
            <center>
              <h1>There is Not any Availabel Post </h1>
            </center>
          ) : (
            filterJob.map((item, index) => <Job key={index} item={item}></Job>)
          )}
        </div>
      </div>
    </>
  );
}
