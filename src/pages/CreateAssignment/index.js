import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "../../components/icon";
import SelectAsset from "./SelectAsset";
import SelectUser from "./SelectUser";
import "./style.scss";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import assignmentService from "../../api/assignmentService";
import { toast } from "react-toastify";

const CreateAssignment = () => {
  const navigate = useNavigate();
  const assignedBy = localStorage.getItem("username");
  const [assetName, setAssetName] = useState("");
  const [userId, setUserId] = useState("");
  // const [isOpenSelectUser, setIsOpenSelectUser] = useState(true);

  //data
  const [userName, setUserName] = useState("");
  const [assetCode, setAssetCode] = useState("");
  const [assignedDate, setAssignedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [note, setNote] = useState("");

  const handleCreateNewAssignment = () => {
    if (userName && assetCode && assignedDate && note) {
      const payload = {
        asset: assetCode,
        user: userName,
        assignedDate,
        note,
      };

      Loading.hourglass("Creating assignment...");
      assignmentService
        .createAssignment(assignedBy, payload)
        .then((res) => {
          if (res.status === 201) {
            toast.success("SUCCESSFULLY ADDED!!");
            localStorage.setItem("newAssignmentId", res.data.id);
            navigate("/manage-assignment");
          }
          Loading.remove();
        })
        .catch((error) => {
          Loading.remove();
          if (error.response.data) {
            toast.error(error.response.data.message);
          } else {
            toast.error("ERROR SERVER");
          }
        });
    } else {
      toast.error("Please fill all fields");
    }
  };

  const handleCancelAssignment = () => {
    navigate("/manage-assignment");
  };

  return (
    <>
      <div className="form-create-asset">
        <div className="form-create-asset__container">
          <h2 className="form-create-asset__title">Create New Assignment</h2>

          <div className="form-create-asset__input-wrapper">
            <label for="user">User</label>
            <div>
              <button
                id="user"
                className="btn border w-100 d-flex justify-content-between"
                type="button"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                data-bs-target="#selectUserModal"
              >
                {userName ? userName : "Select User"}
                <SearchIcon />
              </button>
              <SelectUser setUserName={setUserName} setUserId={setUserId} />
            </div>

            <label for="user">Asset</label>
            <div>
              <button
                id="user"
                className="btn border w-100 d-flex justify-content-between"
                type="button"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                data-bs-target="#selectUserModal"
              >
                {assetName ? assetName : "Select Asset"}
                <SearchIcon />
              </button>
              <SelectAsset
                setAssetCode={setAssetCode}
                setAssetName={setAssetName}
              />
            </div>

            <label for="assignedDate">Assignment Date</label>
            <div>
              <input
                type="date"
                id="assignedDate"
                className="form-create-asset__input"
                min={new Date().toISOString().split("T")[0]}
                value={
                  assignedDate
                    ? assignedDate
                    : new Date().toISOString().split("T")[0]
                }
                onChange={(e) => setAssignedDate(e.target.value)}
              ></input>
            </div>

            <label for="note">Note</label>
            <div>
              <textarea
                type="text"
                id="note"
                className="form-create-asset__input"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="form-create-asset__button-wrapper">
            <button
              id="save"
              className="form-create-asset__button-item"
              onClick={handleCreateNewAssignment}
              disabled={!(userName && assetCode && assignedDate && note)}
            >
              Save
            </button>
            <button
              id="cancel"
              className="form-create-asset__button-item"
              onClick={handleCancelAssignment}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAssignment;
