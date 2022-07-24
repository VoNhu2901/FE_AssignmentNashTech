import React, { useEffect, useState } from "react";
import "./header.scss";

const Header = ({ header }) => {
  const [username, setUsername] = useState("Username");
  useEffect(() => {
    let name = localStorage.getItem("username");
    setUsername(name);
  }, []);

  return (
    <>
      <div className="header">
        <div className="header__title">{header}</div>
        <div className="header__username">{username}</div>
      </div>
    </>
  );
};

export default Header;
