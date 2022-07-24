import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Sidebar from '../sidebar/Sidebar';

//Page dùng chung cho các Route
const Main = () => {
  return (
    <>
      <Header></Header>
      <div style={{ display: "flex" }}>
        <Sidebar></Sidebar>

        {/* Outlet dùng để nested những cái nằm trong Main (để muốn Route nào cũng có Header nên phải dùng Outlet như này) */}
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default Main;
