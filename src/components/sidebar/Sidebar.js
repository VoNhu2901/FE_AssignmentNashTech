import React from "react";
import "./sidebar.scss";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  // const navigate = useNavigate();

  return (
    <>
      <div className="sidebar">
        {/* logo */}
        <div className="logo">
          <img
            src={process.env.PUBLIC_URL + "/assets/logo.jpg"}
            alt="logo"
            className="logo__image"
          />
          <h1 className="logo__title">Online Asset Management</h1>
        </div>
        {/* menu */}
        <div className="menu">
          <div className="menu__item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "menu__item--active menu-navlink" : "menu-navlink"
              }
            >
              Home
            </NavLink>
          </div>
          <div className="menu__item">
            <NavLink
              to="/manage-user"
              className={({ isActive }) =>
                isActive ? "menu__item--active menu-navlink" : "menu-navlink"
              }
            >
              Manage User
            </NavLink>
          </div>
          <div className="menu__item">
            <NavLink
              to="/manage-asset"
              className={({ isActive }) =>
                isActive ? "menu__item--active menu-navlink" : "menu-navlink"
              }
            >
              Manage Asset
            </NavLink>
          </div>
          <div className="menu__item">
            <NavLink
              to="/manage-assignment"
              className={({ isActive }) =>
                isActive ? "menu__item--active menu-navlink" : "menu-navlink"
              }
            >
              Manage Assignment
            </NavLink>
          </div>
          <div className="menu__item">
            <NavLink
              to="/manage-request"
              className={({ isActive }) =>
                isActive ? "menu__item--active menu-navlink" : "menu-navlink"
              }
            >
              Request for Returning
            </NavLink>
          </div>
          <div className="menu__item">
            <NavLink
              to="/report"
              className={({ isActive }) =>
                isActive ? "menu__item--active menu-navlink" : "menu-navlink"
              }
            >
              Report
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
