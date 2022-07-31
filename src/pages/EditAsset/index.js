import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import './style.scss';
import assetService from "../../api/assetService";

const EditAsset = () => {
  const navigate = useNavigate();
  let { assetCode } = useParams();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [specification, setSpecification] = useState("");
  const [installedDate, setInstalledDate] = useState("");
  const [state, setState] = useState("");

  // get data
  useEffect(() => {
    assetService
      .getAssetById(assetCode)
      .then((res) => {        
        
        setName(res.data.name)
        setCategory(res.data.category.id)
        setCategoryName(res.data.category.name)
        setSpecification(res.data.specification)
        setInstalledDate(res.data.installedDate)
        setState(res.data.state)
      })
      .catch((error) => {
        console.log(error);
        
      });
  }, [])
  

  const handleEditAsset = () => {
    if (name && specification && installedDate && state){
      const payload = {
        name,
        specification,
        installedDate,
        state,
      };
      console.log(payload)

      assetService
      .editAsset(assetCode, payload)
      .then((res) => {
        if (res.status === 200) {
          toast.success("SUCCESSFULLY EDIT!!");
          localStorage.setItem("newAsset", res.data.id);
          navigate("/manage-asset");
        }
      })
      .catch((error) => {
        toast.error("EDIT FAILED!!")
      });
    }    
  };

  const handleCancel = () => {
    navigate("/manage-asset");
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
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>

            <label for="category">Category</label>
            <div className="btn-group">
              <button
                className="btn dropdown-toggle"
                id="disabled"
                aria-expanded="false"

              >
                {categoryName}
              </button>
            </div>

            <label for="specification">Specification</label>
            <div>
              <textarea
                type="text"
                id="specification"
                className="form-create-asset__input"
                value={specification}
                onChange={(e) => setSpecification(e.target.value)}
              ></textarea>
            </div>

            <label for="installedDate">Installed Date</label>
            <div>
              <input
                type="date"
                id="installedDate"
                className="form-create-asset__input"
                value={installedDate}
                onChange={(e) => setInstalledDate(e.target.value)}
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
                  checked={state === "Available"}
                  value={"Available"}
                  onClick={(e) => setState(e.target.value)}
                ></input>
                <label htmlFor="available">Available</label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="notAvailable"
                  name="state"
                  checked={state === "Not Available"}
                  value={"Not Available"}
                  onClick={(e) => setState(e.target.value)}
                ></input>
                <label htmlFor="notAvailable">Not Available</label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="notAvailable"
                  name="state"
                  checked={state === "Waiting for recycling"}
                  value={"Waiting for recycling"}
                  onClick={(e) => setState(e.target.value)}
                ></input>
                <label htmlFor="notAvailable">Waiting for recycling</label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="notAvailable"
                  name="state"
                  checked={state === "Recycled"}
                  value={"Recycled"}
                  onClick={(e) => setState(e.target.value)}
                ></input>
                <label htmlFor="notAvailable">Recycled</label>
              </div>
            </div>
          </div>

          <div className="form-create-asset__button-wrapper">
            <button 
              id="save"
              className="form-create-asset__button-item"
              onClick={handleEditAsset}
              disabled={
                !(
                  name &&
                  category &&
                  specification &&
                  installedDate &&
                  state
                )
              }
            >
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
