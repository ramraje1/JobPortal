import { useSelector } from "react-redux";
import Filter from "./Filter";
import Job from "./Job";
import useGetAllJobs from "./hooks/useGetAlljobs";

export default function Jobs() {
  useGetAllJobs();
  let { loading } = useSelector((store) => store.auth);
  let { allJob, filter } = useSelector((store) => store.job);

  // ✅ Properly filter jobs based on selected criteria
  let filterJob = allJob.filter((job) => {
    return (
      (!filter.Industry ||
        job.title.toLowerCase().includes(filter.Industry.toLowerCase())) &&
      (!filter.Location ||
        job.location.toLowerCase() === filter.Location.toLowerCase()) &&
      (!filter.salary || job.salary.includes(filter.salary))
    );
  });

  if (loading) {
    return <div>Loading...!</div>;
  }

  return (
    <div className="max-w-[95%] mx-10 mt-3 ">
      <div className="flex gap-3">
        {/* Sidebar Filter */}
        <div className="w-[20%]">
          <Filter />
        </div>

        {/* Display Filtered Jobs */}
        {filterJob.length <= 0 ? (
          <h1 className="mx-auto text-center mt-24">No jobs available</h1>
        ) : (
          <div className="grid grid-cols-3 gap-5 w-full">
            {filterJob.map((item, i) => (
              <Job item={item} key={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// import { useSelector } from "react-redux";
// import Filter from "./Filter";
// import Job from "./Job";

// import useGetAllJobs from "./hooks/useGetAlljobs";
// export default function Jobs() {
//   useGetAllJobs();
//   let { loading } = useSelector((store) => store.auth);
//   let { allJob } = useSelector((store) => store.job);
//   let { filter } = useSelector((store) => store.job);
//   let filterJob = filter
//     ? allJob.filter(
//         (item) =>
//           item.title.toLowerCase() ||
//           item.salary
//             .toLowerCase()
//             .includes(filter.Industry.toLowerCase() || filter.Salary)
//       )
//     : allJob;
//   if (loading) {
//     return <div>Loading...!</div>;
//   }
//   return (
//     <>
//       <div className="max-w-[95%] mx-10 mt-3 ">
//         <div className="flex   gap-3">
//           <div className="w-[20%]">
//             <Filter />
//           </div>

//           {filterJob.length <= 0 ? (
//             <h1 className="mx-auto text-center mt-24">Job is not availble</h1>
//           ) : (
//             <div className="grid grid-cols-3 gap-5 w-full">
//               {filterJob.map((item, i) => (
//                 <Job item={item} key={i} />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }
