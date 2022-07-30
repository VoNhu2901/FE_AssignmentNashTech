import React, { useState } from "react";
import "./style.scss";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

const CreateAsset = () => {
const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <div className="form-create-asset">
        <div className="form-create-asset__container">
          <h2 className="form-create-asset__title">Create New Asset</h2>

          <div className="form-create-asset__input-wrapper">
            <label for="name">Name</label>
            <div>
              <input
                type="text"
                id="name"
                className="form-create-asset__input"
              ></input>
            </div>

            <label for="category">Category</label>
            <div className="btn-group">
              <button
                class="btn border dropdown-toggle"
                type="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></button>
              <ul className="dropdown-menu bg-light">
                <li>
                  <a className="dropdown-item" href="#">
                    Menu item
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Menu item
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                {!isOpen ? (
                  <>
                    <li>
                      <span
                        id="add-new-category"
                        className="dropdown-item danger"
                        onClick={() => {
                          setIsOpen(true);
                        }}
                      >
                        Add new category
                      </span>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <div class="input-group px-3">
                        <input
                          type="text"
                          class="form-control w-50"
                          placeholder="Bluetooth Mouse"
                        />
                        <input
                          type="text"
                          class="form-control w-15"
                          placeholder="BM"
                        />
                        <div style={{ padding: "5px", cursor: "pointer" }}>
                          <CheckIcon sx={{ color: "red" }} />
                          <CloseIcon
                            onClick={() => {
                              setIsOpen(false);
                            }}
                          />
                        </div>
                      </div>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <label for="specification">Specification</label>
            <div>
              <textarea
                type="text"
                id="specification"
                className="form-create-asset__input"
              ></textarea>
            </div>

            <label for="installedDate">Installed Date</label>
            <div>
              <input
                type="date"
                id="installedDate"
                className="form-create-asset__input"
              ></input>
            </div>

            <label for="state">State</label>
            <div className="form-create-asset__input--item">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="available"
                  name="state"
                ></input>
                <label htmlFor="available">Available</label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="notAvailable"
                  name="state"
                ></input>
                <label htmlFor="notAvailable">Not Available</label>
              </div>
            </div>
          </div>

          <div className="form-create-asset__button-wrapper">
            <button id="save" className="form-create-asset__button-item">
              Save
            </button>
            <button
              id="cancel"
              className="form-create-asset__button-item"
              // onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAsset;
