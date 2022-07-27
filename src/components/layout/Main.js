import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
const list = [
  {
    id: 1,
    name: "Home",
    link: "/",
  },
  {
    id: 2,
    name: "Manage User",
    link: "/manage-user",
  },
  {
    id: 3,
    name: "Manage Asset",
    link: "/manage-asset",
  },
  {
    id: 4,
    name: "Manage Assignment",
    link: "/manage-assignment",
  },
  {
    id: 5,
    name: "Request for Returning",
    link: "/manage-request",
  },
  {
    id: 6,
    name: "Report",
    link: "/report",
  },
];

//Page dùng chung cho các Route
const Main = () => {
  const [menu, setMenu] = useState([]);
  const [header, setHeader] = useState("Home");
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = localStorage.getItem("userId");
    if (!checkUser) {
      navigate("/login");
    }
    setMenu(list);
  }, []);

  const handleClick = (e, id) => {
    setMenu(
      list.map((item) => {
        if (item.id === id) {
          setHeader(item.name);
        }
        return item;
      })
    );
  };

  return (
    <>
      <Header header={header}></Header>
      <div style={{ display: "flex" }}>
        <Sidebar menu={menu} handleClick={handleClick}></Sidebar>

        {/* Outlet dùng để nested những cái nằm trong Main (để muốn Route nào cũng có Header nên phải dùng Outlet như này) */}
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default Main;
