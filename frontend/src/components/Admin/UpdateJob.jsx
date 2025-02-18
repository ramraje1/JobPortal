import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useGetJobById from "../hooks/useGetJobbyId";
import { useSelector } from "react-redux";

export default function UpdateJob() {
  let navigate = useNavigate();
  let params = useParams();
  let id = params.id;

  useGetJobById(id);
  let { oneJob } = useSelector((store) => store.job);

  let [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salary: "",
    jobTypes: "",
    position: "",
    experiance: "",
  });
  useEffect(() => {
    oneJob &&
      setInput({
        title: oneJob.title || "",
        description: oneJob.description || "",
        requirements: oneJob.requirements || "",
        location: oneJob.location || "",
        salary: oneJob.salary || "",
        jobTypes: oneJob.jobTypes || "",
        position: oneJob.position || "",
        experiance: oneJob.experiance || "",
      });
  }, [oneJob]);
  let handleState = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  let handleSubmit = async (e) => {
    e.preventDefault();
    let payload = {
      title: input.title,
      description: input.description,
      requirements: input.requirements,
      location: input.location,
      salary: input.salary,
      jobTypes: input.jobTypes,
      position: input.position,
      experiance: input.experiance,
    };
    try {
      let res = await axios.post(
        `http://localhost:8080/api/job/update/${id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.data.success) {
        alert(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="max-w-2xl mx-auto">
        <div>
          <Label className="text-md font-semibold py-1" htmlFor="name">
            title
          </Label>
          <Input
            name="title"
            value={input.title}
            onChange={handleState}></Input>
        </div>
        <div>
          <Label className="text-md font-semibold py-1" htmlFor="name">
            description
          </Label>
          <Textarea
            name="description"
            value={input.description}
            onChange={handleState}></Textarea>
        </div>
        <div className="grid grid-cols-2 gap-1">
          <div className="my-1">
            <Label className="text-md font-semibold py-1" htmlFor="website">
              requirements
            </Label>
            <Input
              name="requirements"
              value={input.requirements}
              onChange={handleState}></Input>
          </div>
          <div className="my-1">
            <Label className="text-md font-semibold py-1" htmlFor="location">
              location
            </Label>
            <Input
              name="location"
              value={input.location}
              onChange={handleState}></Input>
          </div>
          <div className="my-1">
            <Label className="text-md font-semibold py-1" htmlFor="location">
              salary
            </Label>
            <Input
              name="salary"
              value={input.salary}
              onChange={handleState}></Input>
          </div>
          <div className="my-1">
            <Label className="text-md font-semibold py-1" htmlFor="location">
              position
            </Label>
            <Input
              name="position"
              value={input.position}
              onChange={handleState}></Input>
          </div>
          <div className="my-1">
            <Label className="text-md font-semibold py-1" htmlFor="location">
              experience
            </Label>
            <Input
              name="experiance"
              value={input.experiance}
              onChange={handleState}></Input>
          </div>
          <div className="my-1">
            <Label className="text-md font-semibold py-1" htmlFor="jobTypes">
              jobTypes
            </Label>
            <Input
              name="jobTypes"
              value={input.jobTypes}
              onChange={handleState}></Input>
          </div>
        </div>
        <div className="flex my-4">
          <Button
            onClick={handleSubmit}
            className="bg-green-500 text-white hover:bg-red-500"
            type="submit">
            Update
          </Button>
        </div>
      </div>
    </>
  );
}
