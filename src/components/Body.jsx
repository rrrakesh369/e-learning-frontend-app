import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import SummaryBar from "./SummaryBar";

const Body = () => {
  return (
    <div>
      <NavBar />
      <SummaryBar />
      <Outlet />
    </div>
  );
};

export default Body;
