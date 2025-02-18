import App from "../App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Signup } from "../components/auth/Signup";
import Home from "../components/Home";
import Login from "../components/auth/Login";
import { Navbar } from "../components/shared/Navbar";
import Jobs from "@/components/Jobs";
import Browse from "@/components/Browse";
import Profile from "@/components/Profile";
import JobDescription from "@/components/JobDesciption";
import Logout from "@/components/Logout";
import Companies from "@/components/Admin/Companis";
import Ajobs from "@/components/Admin/Ajobs";
import Createjob from "@/components/Admin/Createjob";
import CompanySetUp from "@/components/Admin/CompanySetUp";
import CreateAjob from "@/components/Admin/CreateAjob";
import Applicant from "@/components/Admin/Applicant";

import Favourite from "@/components/Favourite";
import UseGet from "@/components/hooks/useGetFav";
import GetFav from "@/components/GetFav";
import UpdateJob from "@/components/Admin/UpdateJob";

export default function Path() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/fav/:id" element={<GetFav />} />
          <Route path="/fav" element={<Favourite />} />
          <Route path="/detail/:id" element={<JobDescription />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/admin/companies" element={<Companies />} />
          <Route path="/admin/jobs" element={<Ajobs />} />
          <Route path="/admin/jobs/create" element={<Createjob />} />
          <Route path="/admin/jobs/update/:id" element={<UpdateJob />} />
          <Route path="/admin/companies/:id" element={<CompanySetUp />} />
          <Route path="/admin/post/jobs" element={<CreateAjob />} />
          <Route path="/admin/jobs/:id/applicants" element={<Applicant />} />
        </Routes>
      </Router>
    </>
  );
}
