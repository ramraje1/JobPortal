import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setInputQuery } from "../../redux/jobslice";
import { useNavigate } from "react-router-dom";

const category = [
  "Frontend developer",
  "Backend developer",
  "Data Science",
  "Fullstack developer",
];
export default function Categorical() {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  return (
    <>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {category.map((item, i) => (
            <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
              <Button
                onClick={() => {
                  dispatch(setInputQuery(item));
                  navigate("/browse");
                }}
                variant="outline"
                className="rounded-full">
                {item}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
}
