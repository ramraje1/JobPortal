import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../redux/jobslice";
let filterData = [
  {
    filterType: "location",
    filterArray: [" Pune", "Mumbai", "Noida"],
  },
  {
    filterType: "Industry",
    filterArray: [
      "Frontend Developer",
      "Backend Developer",
      "Fullstack Developer",
    ],
  },
  {
    filterType: "Salary",
    filterArray: ["0-40k", "42-2lakh", "1lakh to 5lakh"],
  },
];
export default function Filter() {
  let { filter } = useSelector((store) => store.job);
  // console.log(filter);
  let dispatch = useDispatch();
  let handleSubmit = (type, value) => {
    dispatch(setFilters({ ...filter, [type]: value }));
  };

  return (
    <>
      <div>
        <h1>Filter Jobs</h1>
        <hr className="mt-3" />

        {filterData.map((data, index) => {
          return (
            <RadioGroup
              onValueChange={(value) => handleSubmit(data.filterType, value)}>
              <div key={index}>
                <h1 className="font-bold my-1">{data.filterType}</h1>
                {data.filterArray.map((item, index) => {
                  return (
                    <div className="flex items-center gap-2" key={index}>
                      <RadioGroupItem
                        className="font-bold"
                        value={item}
                        key={index}
                      />
                      <Label>{item}</Label>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>
          );
        })}
      </div>
    </>
  );
}
