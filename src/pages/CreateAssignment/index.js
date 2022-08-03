import React from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "../../components/icon";

const CreateAssignment = () => {
  const navigate = useNavigate();

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
                className="btn border w-100 d-flex justify-content-end"
                type="button"
              >
                <SearchIcon />
              </button>
            </div>

            <label for="asset">Asset</label>
            <div>
              <button
                id="asset"
                className="btn border w-100 d-flex justify-content-end"
                type="button"
              >
                <SearchIcon />
              </button>
            </div>

            <label for="assignedDate">Assignment Date</label>
            <div>
              <input
                type="date"
                id="assignedDate"
                className="form-create-asset__input"
                // value={assignedDate}
                // onChange={(e) => setAssignedDate(e.target.value)}
              ></input>
            </div>

            <label for="note">Note</label>
            <div>
              <textarea
                type="text"
                id="note"
                className="form-create-asset__input"
                // value={note}
                // onChange={(e) => setNote(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="form-create-asset__button-wrapper">
            <button
              id="save"
              className="form-create-asset__button-item"
              // onClick={handleCreateNewAsset}
              // disabled={
              //   !(
              //     name &&
              //     category &&
              //     specification &&
              //     installedDate &&
              //     state &&
              //     categoryName
              //   )
              // }
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
