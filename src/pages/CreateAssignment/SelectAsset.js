import React from "react";
import { SearchIcon, ArrowDropDownIcon } from "../../components/icon";

const tableHead = [
  {
    id: "no",
    name: "",
    isDropdown: false,
  },
  {
    id: "assetcode",
    name: "Asset Code",
    isDropdown: true,
  },
  {
    id: "assetname",
    name: "Asset Name",
    isDropdown: true,
  },
  {
    id: "category",
    name: "Category",
    isDropdown: true,
  },
];

const tableBody = [
  {
    assetcode: "ASSET001",
    assetname: "Asset 1",
    category: "Category 1",
  },
  {
    assetcode: "ASSET002",
    assetname: "Asset 2",
    category: "Category 2",
  },
];

const SelectAsset = () => {
  const handleSave = () => {alert("Save")};

  return (
    <>
      <div className="container dropdown-menu p-3">
        <div class="d-flex justify-content-between">
          <h4 className="form-create-asset__title">Select Asset</h4>
          <div className="search">
            <div className="input">
              <input
                type="text"
                // value={content}
                // onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <button
              className="btn border-dark border-start border-bottom-0 border-end-0 border-top-0 rounded-0 me-1"
              // onClick={handleSearch}
            >
              <SearchIcon />
            </button>
          </div>
        </div>

        {/* start Table list */}
        <div>
          <table className="w-100 table table-hover">
            <thead>
              <tr>
                {tableHead.map((item) => (
                  <th className="border-bottom border-3" key={item.id}>
                    {item.name}
                    <button
                      className="btn border-0"
                      // onClick={() => sortByCol(item.id)}
                    >
                      {item.isDropdown ? <ArrowDropDownIcon /> : <></>}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(tableBody || []).map((ele, index) => {
                return (
                  <>
                    <tr key={ele.index}>
                      <td>
                        <input
                          className="form-check-input"
                          type="radio"
                          id={ele.assetcode}
                          name="state"
                        ></input>
                      </td>
                      <td className="border-bottom">
                        <label htmlFor={ele.assetcode}>{ele.assetcode}</label>
                      </td>
                      <td className="border-bottom">
                        <label htmlFor={ele.assetcode}>{ele.assetname}</label>
                      </td>
                      <td className="border-bottom">
                        <label htmlFor={ele.assetcode}>{ele.category}</label>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>

          <div className="d-flex justify-content-end gap-4">
            <button
              className="form-create-asset__button-item btn btn-danger"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="form-create-asset__button-item btn btn-light border-secondary"
              // onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </div>
        {/* end Table list */}
      </div>
    </>
  );
};

export default SelectAsset;
