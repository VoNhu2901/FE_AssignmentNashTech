import React, { useEffect } from "react";
import "./header.scss";

const Header = ({header}) => {

  return (
    <>
      <div className="header">
        <div className="header__title">{header}</div>
        <div className="header__username">Username</div>
      </div>
    </>
  );
};

export default Header;
