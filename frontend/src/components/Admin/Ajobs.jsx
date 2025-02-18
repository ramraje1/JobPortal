import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import AjobTable from "./AjobsTable";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Ajobs() {
  // let dispatch = useDispatch();
  let navigate = useNavigate();
  // let [company, setCompany] = useState("");
  let [input, setInput] = useState();
  return (
    <>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <Input
            onChange={(e) => setInput(e.target.value)}
            className="w-fit"
            placeholder="Filtered by name"></Input>
          <Button onClick={() => navigate("/admin/post/jobs")}>New Jobs</Button>
        </div>
        <AjobTable ajob={input} />
        {/* <CompanyTabel com={cp} /> */}
      </div>
    </>
  );
}
