import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import IconEyeClose from "../../components/icon/IconEyeClose";
import IconEyeOpen from './../../components/icon/IconEyeOpen';
import "./home.scss";

const HomePage = () => {
  const [isNew, setIsNew] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);

  useEffect(() => {
    let status = localStorage.getItem("status");
    if (status === "NEW") {
      setIsNew(true);
    }
  }, []);

  const handleSavePassword = () => {
    if (newPassword) {
      // send to backend test
      const userId = localStorage.getItem("userId");

      axios({
        headers: {
          "content-type": "application/json",
        },
        url: `https://backend05.azurewebsites.net/api/auth/user/${userId}/${newPassword}`,
        method: "PUT",
      })
        .then(() => {
          setIsNew(false);
          localStorage.removeItem("status");
          toast.success("Change Password success!!!");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Can change password");
        });
    } else {
      toast.error("New Password not Empty.");
    }
  };

  return (
    <>
      <div
        className={"modal fade " + (isNew ? " show d-block" : " d-none")}
        tabIndex="-1"
        role="dialog"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-danger">Change Password</h5>
            </div>
            <div class="modal-body">
              <div className="text">
                <h6>
                  This is a first time you logged in. <br /> You have to change
                  password to continue.
                </h6>
              </div>
              <div className="change-password">
                <label htmlFor="pass" className="pe-1">
                  New Password
                </label>
                <input
                  type={togglePassword ? "text" : "password"}
                  id="pass"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                {!togglePassword ? (
                  <IconEyeClose
                    className="icon-eye"
                    onClick={() => setTogglePassword(true)}
                  ></IconEyeClose>
                ) : (
                  <IconEyeOpen
                    className="icon-eye"
                    onClick={() => setTogglePassword(false)}
                  ></IconEyeOpen>
                )}
              </div>
              <div className="button-save">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleSavePassword}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
