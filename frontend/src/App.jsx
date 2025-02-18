import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { Button } from "./components/ui/button";
import { Navbar } from "./components/shared/Navbar";
import Path from "./Router/Path";
import HeroSection from "./components/HeroSection";
import Categorical from "./components/Categorical";
import Latestjob from "./components/Latestjob";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function App() {
  let { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "recuriter") {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <>
      <HeroSection />
      <Categorical />
      <Latestjob />
    </>
  );
}

export default App;
