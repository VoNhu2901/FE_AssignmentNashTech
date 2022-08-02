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
} from "../../components/icon";
import "./style.scss";

const state = ["All", "Accepted", "Waiting for acceptance"];

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

const ManageAssignment = () => {
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
                type="date"></input>
              <input
                type="date"
                id="installedDate"
                className="form-create-asset__input"
                placeholder="Assigned Date"
                // value={installedDate}
                // onChange={(e) => setInstalledDate(e.target.value)}
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
                // onClick={() => {
                //   navigate("/create-assignment");
                // }}
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
            {/* <tbody>
              {(
                userList.slice((page - 1) * rowPerPage, page * rowPerPage) || []
              ).map((ele, index) => {
                return (
                  <>
                    <tr key={ele.id}>
                      <td
                        className="border-bottom"
                        data-bs-toggle="modal"
                        data-bs-target={"#detailUserViewModal" + ele.id}
                      >
                        {ele.id}
                      </td>
                      <td
                        className="border-bottom"
                        data-bs-toggle="modal"
                        data-bs-target={"#detailUserViewModal" + ele.id}
                      >
                        {ele.name}
                      </td>
                      <td
                        className="border-bottom"
                        data-bs-toggle="modal"
                        data-bs-target={"#detailUserViewModal" + ele.id}
                      >
                        {ele.category.name}
                      </td>
                      <td
                        className="border-bottom"
                        data-bs-toggle="modal"
                        data-bs-target={"#detailUserViewModal" + ele.id}
                      >
                        {ele.state}
                      </td>
                      <td>
                        <button className="btn btn-outline-secondary border-0">
                          {ele.state === "Assigned" ? (
                            <>
                              <EditOffIcon />
                            </>
                          ) : (
                            <>
                              <EditIcon onClick={() => editAsset(ele.id)} />
                            </>
                          )}
                        </button>
                        <button className="btn btn-outline-danger border-0">
                          {ele.state === "Assigned" ? (
                            <>
                              <HighlightOffTwoToneIcon />
                            </>
                          ) : (
                            <>
                              <HighlightOffIcon
                                onClick={() =>
                                  checkAssetAvailableToDisable(ele.id)
                                }
                              />
                            </>
                          )}
                        </button>{" "}
                      </td>
                    </tr>

                    <div
                      className="modal fade"
                      id={"detailUserViewModal" + ele.id}
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
                                <div className="value">{ele.id}</div>
                              </div>
                              <div className="detail-item">
                                <div className="label">Asset Name</div>
                                <div className="value">{ele.name}</div>
                              </div>
                              <div className="detail-item">
                                <div className="label">Category</div>
                                <div className="value">{ele.category.name}</div>
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
                                <div className="value">{location}</div>
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
                );
              })}
            </tbody> */}
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
