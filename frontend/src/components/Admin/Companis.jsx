import { Input } from "../ui/input";
import { Navbar } from "../shared/Navbar";
import { Button } from "../ui/button";
import CompanyTabel from "./CompanyTable";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/authslice";

export default function Companies() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let [cp, setCom] = useState();

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <Input
            className="w-fit"
            placeholder="Filtered by name"
            onChange={(e) => setCom(e.target.value)}></Input>
          <Button onClick={() => navigate("/admin/jobs/create")}>
            New Company
          </Button>
        </div>
        <CompanyTabel com={cp} />
      </div>
    </>
  );
}
