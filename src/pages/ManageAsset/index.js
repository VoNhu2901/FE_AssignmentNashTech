import React from "react";
import moment from "moment";
import {
  FilterAltIcon,
  SearchIcon,
  HighlightOffIcon,
  EditIcon,
  ArrowDropDownIcon,
  CloseIcon,
} from "../../components/icon";
import SubTable from "./SubTable";
import './index.scss';
import { useNavigate } from "react-router-dom";

const filterState = [
  {
    id: "typeAll",
    value: "All",
    checked: "ALL",
  },
  {
    id: "typeAssigned",
    value: "Assigned",
    checked: "ASSIGNED",
  },
  {
    id: "typeAvailable",
    value: "Available",
    checked: "AVAILABLE",
  },
  {
    id: "typeNotAvailable",
    value: "Not available",
    checked: "NOT_AVAILABLE",
  },
  {
    id: "typeWaiting",
    value: "Waiting for recycling",
    checked: "WAITING",
  },
  {
    id: "typeRecycled",
    value: "Recycled",
    checked: "RECYCLED",
  },
];

const filterCategory = [
  {
    id: "categoryAll",
    value: "All",
    checked: "ALL",
  },
  {
    id: "categoryBluetoothMouse",
    value: "Bluetooth Mouse",
    checked: "BLUETOOTH_MOUSE",
  },
  {
    id: "categoryHeadset",
    value: "Headset",
    checked: "HEADSET",
  },
  {
    id: "categoryIpad",
    value: "Ipad",
    checked: "IPAD",
  },
  {
    id: "categoryIphone",
    value: "Iphone",
    checked: "IPHONE",
  },
  {
    id: "categoryLaptop",
    value: "Laptop",
    checked: "LAPTOP",
  },
  {
    id: "categoryMobile",
    value: "Mobile",
    checked: "MOBILE",
  },
  {
    id: "categoryMonitor",
    value: "Monitor",
    checked: "MONITOR",
  },
  {
    id: "categoryPersonalComputer",
    value: "Personal Computer",
    checked: "PERSONAL_COMPUTER",
  },
  {
    id: "categoryTablet",
    value: "Tablet",
    checked: "TABLET",
  },
];

const tableHead = [
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
  {
    id: "state",
    name: "State",
    isDropdown: true,
  },
];

const tableBody = [
  {
    assetCode: "LA100001",
    assetName: "Laptop",
    category: "Laptop",
    installedDate: "2020-01-01",
    state: "Available",
    location: "HCM",
    specification: "Core i7",
    history: [
      {
        date: "2020-01-01",
        assignedTo: "Vo Nhu",
        assignedBy: "Nguyen Thi Nga",
        returnedDate: "2021-01-01",
      },
      {
        date: "2020-01-01",
        assignedTo: "Nguyen Thi A",
        assignedBy: "Ho Ngoc Ha",
        returnedDate: "2021-01-01",
      },
    ],
  },
  {
    assetCode: "LA100002",
    assetName: "Mobile",
    category: "Mobile",
    installedDate: "2021-01-01",
    state: "Not available",
    location: "HCM",
    specification: "Nokia",
    history: [
      {
        date: "2020-01-01",
        assignedTo: "Vo Nhu",
        assignedBy: "Nguyen Thi Nga",
        returnedDate: "2021-01-01",
      },
      {
        date: "2020-01-01",
        assignedTo: "Nguyen Thi A",
        assignedBy: "Ho Ngoc Ha",
        returnedDate: "2021-01-01",
      },
    ],
  },
];

const ManageAsset = () => {
  const navigate = useNavigate();


  return (
    <>
      <div className="user-list">
        <div className="title">
          <h3>Asset List</h3>
        </div>
        {/* start Toolbar */}
        <div className="table-board">
          <div className="left-board">
            <div className="filter">
              {/* start filter State */}
              <div className="dropdown">
                <button
                  className="btn btn-outline-secondary dropdown-toggle"
                  type="button"
                  id="dropMenuFilterType"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  State
                  <FilterAltIcon />
                </button>
                <ul
                  className="dropdown-menu form-check"
                  aria-labelledby="dropMenuFilterType"
                >
                  {filterState.map((type) => (
                    <li key={type.id}>
                      <div>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={type.value}
                          id={type.id}
                          // checked={filterBy === type.checked}
                          // onChange={() => handleFilter(type.checked)}
                        />
                        <label className="form-check-label" htmlFor={type.id}>
                          {type.value}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {/* end filter State*/}

              {/* start filter Category*/}
              <div className="dropdown">
                <button
                  className="btn btn-outline-secondary dropdown-toggle"
                  type="button"
                  id="dropMenuFilterType"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                  <FilterAltIcon />
                </button>
                <ul
                  className="dropdown-menu form-check"
                  aria-labelledby="dropMenuFilterType"
                >
                  {filterCategory.map((type) => (
                    <li key={type.id}>
                      <div>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={type.value}
                          id={type.id}
                          // checked={filterBy === type.checked}
                          // onChange={() => handleFilter(type.checked)}
                        />
                        <label className="form-check-label" htmlFor={type.id}>
                          {type.value}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {/* end filter Category*/}
            </div>
          </div>

          <div className="right-board">
            {/* start Search */}
            <div className="search">
              <div className="input">
                <input
                  type="text"
                  // value={content}
                  // onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div>
                <button
                  className="btn border-0"
                  // onClick={handleSearch}
                >
                  <SearchIcon />
                </button>
              </div>
            </div>
            {/* end Search */}

            {/* start Create */}
            <div className="button">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  navigate("/create-asset");
                }}
              >
                Create new asset
              </button>
            </div>
            {/* end Create */}
          </div>
        </div>
        {/* end Toolbar */}

        {/* start Table list */}
        <div className="table-user-list">
          <table>
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
              {(tableBody || []).map((ele) => (
                <>
                  <tr
                    data-bs-toggle="modal"
                    data-bs-target={"#detailUserViewModal" + ele.assetCode}
                    key={ele.assetCode}
                  >
                    <td className="border-bottom">{ele.assetCode}</td>
                    <td className="border-bottom">{ele.assetName}</td>
                    <td className="border-bottom">{ele.category}</td>
                    <td className="border-bottom">{ele.state}</td>
                    <td>
                      <button className="btn btn-outline-secondary border-0">
                        <EditIcon
                        // onClick={() => editUser(ele.staffCode)}
                        />
                      </button>
                      <button
                        className="btn btn-outline-danger border-0"
                        // onClick={() => deleteUser(ele.staffCode)}
                      >
                        <HighlightOffIcon />
                      </button>{" "}
                    </td>
                  </tr>

                  <div
                    className="modal fade"
                    id={"detailUserViewModal" + ele.assetCode}
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                      <div className="modal-content ">
                        <div className="modal-header">
                          <h5
                            className="modal-title text-danger"
                            id="exampleModalLabel"
                          >
                            Detailed Asset Information
                          </h5>
                          <button
                            type="button"
                            className="btn btn-outline-danger border-4"
                            data-bs-dismiss="modal"
                          >
                            <CloseIcon />
                          </button>
                        </div>
                        <div className="modal-body">
                          <div className="detail">
                            <div className="detail-item">
                              <div className="label">Asset Code</div>
                              <div className="value">{ele.assetCode}</div>
                            </div>
                            <div className="detail-item">
                              <div className="label">Asset Name</div>
                              <div className="value">{ele.assetName}</div>
                            </div>
                            <div className="detail-item">
                              <div className="label">Category</div>
                              <div className="value">{ele.category}</div>
                            </div>
                            <div className="detail-item">
                              <div className="label">Installed Date</div>
                              <div className="value">
                                {moment(ele.installedDate).format("L")}
                              </div>
                            </div>
                            <div className="detail-item">
                              <div className="label">State</div>
                              <div className="value">{ele.state}</div>
                            </div>
                            <div className="detail-item">
                              <div className="label">Location</div>
                              <div className="value">
                                {moment(ele.location).format("L")}
                              </div>
                            </div>
                            <div className="detail-item">
                              <div className="label">Specification</div>
                              <div className="value">{ele.specification}</div>
                            </div>
                            <div className="detail-item">
                              <div className="label">History</div>
                              <div className="value">
                                <SubTable history={ele.history}></SubTable>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </tbody>
          </table>
        </div>
        {/* end Table list */}

        {/* start Pagination */}
        {/* <div className="paging">
        {numPage > 1 ? (
          <div className="paging text-end">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handlePre}
            >
              Previous
            </button>
            {Array.from({ length: numPage }, (_, i) => (
              <button
                type="button"
                onClick={() => setPage(i + 1)}
                className={
                  page === i + 1 ? "btn btn-danger" : "btn btn-outline-danger"
                }
              >
                {i + 1}
              </button>
            ))}
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        ) : (
          <></>
        )}
      </div> */}
        {/* end Pagination */}
      </div>
    </>
  );
};

export default ManageAsset;
