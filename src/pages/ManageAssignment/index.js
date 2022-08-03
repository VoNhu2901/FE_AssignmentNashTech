import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowDropDownIcon,
  CloseIcon,
  EditIcon,
  FilterAltIcon,
  HighlightOffIcon,
  SearchIcon,
  EditOffIcon,
  HighlightOffTwoToneIcon,
  RestartAltSharpIcon,
} from "../../components/icon";
import "./style.scss";

const state = ["All", "Accepted", "Waiting for acceptance"];

const tableHead = [
  {
    id: "no",
    name: "No.",
    isDropdown: true,
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
    id: "assignedto",
    name: "Assigned To",
    isDropdown: true,
  },
  {
    id: "assignedby",
    name: "Assigned By",
    isDropdown: true,
  },
  {
    id: "assigneddate",
    name: "Assigned Date",
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
    no: 1,
    assetcode: "A00001",
    assetname: "Asset 1",
    assignedto: "John Doe",
    assignedby: "User 2",
    assigneddate: "2020-01-01",
    state: "Accepted",
    specification: "Specification 1",
    note: "Note 1",
  },
  {
    no: 2,
    assetcode: "A00002",
    assetname: "Asset 2",
    assignedto: "John Doe",
    assignedby: "User 1",
    assigneddate: "2020-01-01",
    state: "Waiting for acceptance",
    specification: "Specification 2",
    note: "Note 2",
  },
];

const ManageAssignment = () => {
  const navigate = useNavigate();

  const [disable, setDisable] = useState(null);

  const disableAsset = () => {
    alert("Disable asset");
  };

  const editAssignment = (code) => {
    navigate(`/edit-assignment/${code}`);
  };
  return (
    <>
      {/* start dialog */}
      <div
        className={
          "modal fade" +
          (disable && disable !== "Error" ? " show d-block" : " d-none")
        }
        // className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-danger">Are you sure?</h5>
            </div>
            <div className="modal-body confirm-disable">
              <div className="modal-subtitle">
                Do you want to delete this assignment?
              </div>
              <div className="button">
                <button
                  className="btn btn-danger"
                  id="disable-button"
                  onClick={disableAsset}
                >
                  Delete
                </button>
                <button
                  className="btn btn-outline-secondary"
                  id="cancel-button"
                  onClick={() => setDisable(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end dialog */}


      <div className="user-list">
        <div className="title">
          <h3>Assignment List</h3>
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
                  style={{ width: "14.8rem" }}
                >
                  State
                  <FilterAltIcon />
                </button>
                <ul
                  className="dropdown-menu form-check"
                  aria-labelledby="dropMenuFilterType"
                >
                  {state.map((type, index) => (
                    <li key={type}>
                      <div>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={type}
                          id={type}
                          // checked={filterByState[index] === 1}
                          // onChange={() => handleFilterByState(index)}
                        />
                        <label className="form-check-label" htmlFor={type}>
                          {type}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {/* end filter State*/}

              {/* start filter Assigned Date*/}

              <input
                type="date"
                id="assignedDate"
                className="form-create-asset__input btn btn-outline-secondary"
                placeholder="Assigned Date"
                // onChange={(e) => setAssignedDate(e.target.value)}
              ></input>
              {/* end filter Assigned Date*/}
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
                  navigate("/create-assignment");
                }}
              >
                Create new assignment
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
              {(tableBody || []).map((ele, index) => {
                return (
                  <>
                    <tr key={ele.index}>
                      <td
                        className="border-bottom"
                        data-bs-toggle="modal"
                        data-bs-target={"#detailUserViewModal" + ele.no}
                      >
                        {ele.no}
                      </td>
                      <td
                        className="border-bottom"
                        data-bs-toggle="modal"
                        data-bs-target={"#detailUserViewModal" + ele.no}
                      >
                        {ele.assetcode}
                      </td>
                      <td
                        className="border-bottom"
                        data-bs-toggle="modal"
                        data-bs-target={"#detailUserViewModal" + ele.no}
                      >
                        {ele.assetname}
                      </td>
                      <td
                        className="border-bottom"
                        data-bs-toggle="modal"
                        data-bs-target={"#detailUserViewModal" + ele.no}
                      >
                        {ele.assignedto}
                      </td>
                      <td
                        className="border-bottom"
                        data-bs-toggle="modal"
                        data-bs-target={"#detailUserViewModal" + ele.no}
                      >
                        {ele.assignedby}
                      </td>
                      <td
                        className="border-bottom"
                        data-bs-toggle="modal"
                        data-bs-target={"#detailUserViewModal" + ele.no}
                      >
                        {moment(ele.assigneddate).format("L")}
                      </td>
                      <td
                        className="border-bottom"
                        data-bs-toggle="modal"
                        data-bs-target={"#detailUserViewModal" + ele.no}
                      >
                        {ele.state}
                      </td>

                      <td>
                        {ele.state !== "Waiting for acceptance" &&
                        ele.state !== "Declined" ? (
                          <>
                            <button
                              className="btn btn-outline-secondary border-0"
                              disabled
                            >
                              <EditIcon />
                            </button>
                            <button
                              className="btn btn-outline-danger border-0"
                              disabled
                            >
                              <HighlightOffIcon />
                            </button>
                            <button className="btn btn-outline-primary border-0">
                              <RestartAltSharpIcon
                              // onClick={() => checkAssetAvailableToDisable(ele.id)}
                              />
                            </button>
                          </>
                        ) : (
                          <>
                            <button className="btn btn-outline-secondary border-0">
                              <EditIcon
                                onClick={() => editAssignment(ele.no)}
                              />
                            </button>
                            <button className="btn btn-outline-danger border-0">
                              <HighlightOffIcon
                              // onClick={() =>
                              //   checkAssetAvailableToDisable(ele.id)
                              // }
                              />
                            </button>
                            <button className="btn btn-outline-secondary border-0">
                              <RestartAltSharpIcon
                              // onClick={() => checkAssetAvailableToDisable(ele.id)}
                              />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>

                    <div
                      className="modal fade"
                      id={"detailUserViewModal" + ele.no}
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
                              Detailed Assignment Information
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
                                <div className="value">{ele.assetcode}</div>
                              </div>
                              <div className="detail-item">
                                <div className="label">Asset Name</div>
                                <div className="value">{ele.assetname}</div>
                              </div>
                              <div className="detail-item">
                                <div className="label">Specification</div>
                                <div className="value">{ele.specification}</div>
                              </div>
                              <div className="detail-item">
                                <div className="label">Assigned to</div>
                                <div className="value">{ele.assignedto}</div>
                              </div>
                              <div className="detail-item">
                                <div className="label">Assigned by</div>
                                <div className="value">{ele.assignedby}</div>
                              </div>
                              <div className="detail-item">
                                <div className="label">Assigned Date</div>
                                <div className="value">
                                  {moment(ele.assigneddate).format("L")}
                                </div>
                              </div>
                              <div className="detail-item">
                                <div className="label">State</div>
                                <div className="value">{ele.state}</div>
                              </div>
                              <div className="detail-item">
                                <div className="label">Note</div>
                                <div className="value">{ele.note} </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
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

export default ManageAssignment;
