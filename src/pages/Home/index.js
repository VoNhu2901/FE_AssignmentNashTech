import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const HomePage = () => {
  const [isNew, setIsNew] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    let status = localStorage.getItem("status");
    if (status === "NEW") {
      setIsNew(true);
    }
  }, []);

  const handleSavePassword = () => {
    if (newPassword) {
      // send to backend
      const userId = localStorage.getItem("userId");

      axios({
        headers: {
          "content-type": "application/json",
        },
        url: `http://localhost:8080/api/auth/user/${userId}/${newPassword}`,
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
                  type="password"
                  id="pass"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
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
