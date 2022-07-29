import React, { useEffect, useState } from "react";
import "./header.scss";
import { useNavigate} from "react-router-dom";
import authService from "../../api/authService";

const Header = ({ header }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Username");
  useEffect(() => {
    let name = localStorage.getItem("username");
    setUsername(name);
  }, []);


  const handleLogOut = () =>{
    authService.logout()
  .then(res => {
    localStorage.clear();
    navigate("/login")
  }).catch((err) =>{
    console.log(err)
  })

  }

  
  return (
    <>
      <div className="header">
        <div className="header__title">{header}</div>
        <div className="header__username" id="user_header">{username}
          <div className="btn-group">
            <button type="button" class="btn btn-error dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-bs-toggle="dropdown" aria-expanded="false" data-bs-reference="parent">
              <span className="visually-hidden">Toggle Dropdown</span>
            </button>

            <ul className="dropdown-menu" aria-labelledby="dropdownMenuReference">
              <li className="dropdown-item" data-bs-toggle="modal" data-bs-target="#logoutModal">Logout</li>
              <li><a className="dropdown-item" href="/#" id="li-bottom">Change password</a></li>
            </ul>
          </div>

          {/* <!-- Modal --> */}
          <div className="modal fade" id="logoutModal" tabIndex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-sm">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="ModalLabel">Are you sure?</h5>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" id="btnLogout" onClick={handleLogOut} data-bs-dismiss="modal">Logout</button>
                  <button type="button" className="btn btn-primary" data-bs-dismiss="modal" id="btnCancel">Cancel</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Header;
