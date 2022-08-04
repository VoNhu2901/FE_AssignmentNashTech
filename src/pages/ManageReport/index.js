import React, { useState, useEffect } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import "./style.scss";
import userService from "../../api/userService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading } from "notiflix/build/notiflix-loading-aio";

const ManageReport = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [userList, setUserList] = useState([]);
  const [data, setData] = useState([]);
  const [filterBy, setFilterBy] = useState("ALL");
  const [numPage, setNumPage] = useState(0);
  const [currentCol, setCurrentCol] = useState("");
  const [content, setContent] = useState("");
  const rowPerPage = 20;
  const [disable, setDisable] = useState(null);

  /**
   * Handle when init page and when page change
   */

  // get data from backend
   

  return (
    <>
      
      <div className="user-list">
        <div className="title">
          <h3>Report</h3>
        </div>

        <div className="table-board">
          <div className="left-board">
            <div className="filter">
              
            </div>
          </div>

          <div className="right-board">
            
            <div className="button">
              <button
                type="button"
                className="btn btn-danger"
                
              >
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="table-user-list">
          <table>
            <thead>
              <tr>
                <th className="border-bottom border-3">
                  Category{" "}
                  <button
                    className="btn border-0"
                    
                  >
                    <ArrowDropDownIcon />
                  </button>
                </th>
                <th className="border-bottom border-3">
                  Total{" "}
                  <button
                    className="btn border-0"
                    
                  >
                    <ArrowDropDownIcon />
                  </button>
                </th>
                <th className="border-bottom border-3">
                  Assigned{" "}
                  <button
                    className="btn border-0"
                    
                  >
                    <ArrowDropDownIcon />
                  </button>
                </th>
                <th className="border-bottom border-3">
                  Available{" "}
                  <button
                    className="btn border-0"
                    
                  >
                    <ArrowDropDownIcon />
                  </button>
                </th>
                <th className="border-bottom border-3">
                  Not available{" "}
                  <button
                    className="btn border-0"
                    
                  >
                    <ArrowDropDownIcon />
                  </button>
                </th>
                <th className="border-bottom border-3">
                  Waiting for recycling{" "}
                  <button
                    className="btn border-0"
                    
                  >
                    <ArrowDropDownIcon />
                  </button>
                </th>
                <th className="border-bottom border-3">
                  Recycled{" "}
                  <button
                    className="btn border-0"
                    
                  >
                    <ArrowDropDownIcon />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {(
                userList.slice((page - 1) * rowPerPage, page * rowPerPage) || []
              ).map((ele) => (
                <>
                  <tr key={ele.staffCode}>
                    <td
                      className="border-bottom"
                      data-bs-toggle="modal"
                      data-bs-target={"#detailUserViewModal" + ele.staffCode}
                    >
                      {ele.staffCode}
                    </td>
                    <td
                      className="border-bottom"
                      data-bs-toggle="modal"
                      data-bs-target={"#detailUserViewModal" + ele.staffCode}
                    >
                      {ele.fullName}
                    </td>
                    <td
                      className="border-bottom"
                      data-bs-toggle="modal"
                      data-bs-target={"#detailUserViewModal" + ele.staffCode}
                    >
                      {ele.username}
                    </td>
                    <td
                      className="border-bottom"
                      data-bs-toggle="modal"
                      data-bs-target={"#detailUserViewModal" + ele.staffCode}
                    >
                      {moment(ele.joinedDate).format("L")}
                    </td>
                    <td
                      className="border-bottom"
                      data-bs-toggle="modal"
                      data-bs-target={"#detailUserViewModal" + ele.staffCode}
                    >
                      {ele.role}
                    </td>
                    <td>
                      <button className="btn btn-outline-secondary border-0">
                        
                      </button>
                      <button
                        className="btn btn-outline-danger border-0"
                        
                      >
                        
                      </button>{" "}
                    </td>
                  </tr>

                  <div
                    className="modal fade"
                    id={"detailUserViewModal" + ele.staffCode}
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5
                            className="modal-title text-danger"
                            id="exampleModalLabel"
                          >
                            Detailed User Information
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
                              <div className="label">Staff Code</div>
                              <div className="value">{ele.staffCode}</div>
                            </div>
                            <div className="detail-item">
                              <div className="label">Full Name</div>
                              <div className="value">{ele.fullName}</div>
                            </div>
                            <div className="detail-item">
                              <div className="label">Username</div>
                              <div className="value">{ele.username}</div>
                            </div>
                            <div className="detail-item">
                              <div className="label">Date Of Birth</div>
                              <div className="value">
                                {moment(ele.dateOfBirth).format("L")}
                              </div>
                            </div>
                            <div className="detail-item">
                              <div className="label">Gender</div>
                              <div className="value">{ele.gender}</div>
                            </div>
                            <div className="detail-item">
                              <div className="label">Joined Date</div>
                              <div className="value">
                                {moment(ele.joinedDate).format("L")}
                              </div>
                            </div>
                            <div className="detail-item">
                              <div className="label">Type</div>
                              <div className="value">{ele.role}</div>
                            </div>
                            <div className="detail-item">
                              <div className="label">Location</div>
                              <div className="value">{ele.location}</div>
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

        <div className="paging">
          {numPage > 1 ? (
            <div className="paging text-end">
              <button
                type="button"
                className="btn btn-outline-secondary"
                
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
                
              >
                Next
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default ManageReport;
