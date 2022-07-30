import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import './style.scss';

const EditAsset = () => {
  const navigate = useNavigate();
  let { assetCode } = useParams();

  // get data

  const handleCancel = () => {
    navigate("/manage-user");
  };

  return (
    <>
      <div className="form-create-asset">
        <div className="form-create-asset__container">
          <h2 className="form-create-asset__title">Edit Asset</h2>

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
                className="btn dropdown-toggle"
                id="disabled"
                aria-expanded="false"
              >
                Laptop
              </button>
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

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="notAvailable"
                  name="state"
                ></input>
                <label htmlFor="notAvailable">Waiting for recycling</label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="notAvailable"
                  name="state"
                ></input>
                <label htmlFor="notAvailable">Recycled</label>
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
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAsset;
