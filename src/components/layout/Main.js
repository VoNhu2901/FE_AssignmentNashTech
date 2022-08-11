import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
const list = [
  {
    id: 1,
    name: "Home",
    link: "/",
    role: "STAFF",
  },
  {
    id: 1,
    name: "Home",
    link: "/",
    role: "ADMIN",
  },
  {
    id: 2,
    name: "Manage User",
    link: "/manage-user",
    role: "ADMIN",
  },
  {
    id: 3,
    name: "Manage Asset",
    link: "/manage-asset",
    role: "ADMIN",
  },
  {
    id: 4,
    name: "Manage Assignment",
    link: "/manage-assignment",
    role: "ADMIN",
  },
  {
    id: 5,
    name: "Request for Returning",
    link: "/manage-request",
    role: "ADMIN",
  },
  {
    id: 6,
    name: "Report",
    link: "/report",
    role: "ADMIN",
  },
];

const createList = [
  {
    id: 2,
    name: "Create New User",
    link: "/create-user",
    role: "ADMIN",
  },
  {
    id: 3,
    name: "Create New Asset",
    link: "/create-asset",
  },
  {
    id: 4,
    name: "Create New Assignment",
    link: "/create-assignment",
  },
];

//Page dùng chung cho các Route
const Main = () => {
  const [menu, setMenu] = useState([]);
  const [header, setHeader] = useState(list[0].name);
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  // sidebar menu
  useEffect(() => {
    const checkUser = localStorage.getItem("userId");
    const checkRole = localStorage.getItem("role");
    if (!checkUser) {
      navigate("/login");
    }
    if (checkUser && checkRole === "ADMIN") {
      setMenu(list.filter((item) => item.role === "ADMIN"));
      const header = createList.find((item) => item.link === currentPath);
      // const headerId = header.id;
      // const headerName = header.name;
      // setHeader(list.find((item) => item.id === headerId).name + " - " + headerName);
      
    } else {
      setMenu(list.filter((item) => item.role === "STAFF"));
    }
  }, []);

  const handleClick = (e, id) => {
    setHeader(list.find((item) => item.id === id).name);
  };

  // useEffect(() => {
  //   subList.map((item) => {
  //     if (item.link === currentPath) {
  //       setHeader(list[1].name + " > " + item.name);
  //     }
  //   });
  // }, [currentPath]);

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
