import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowDropDownIcon,
  CloseIcon,
  EditIcon,
  FilterAltIcon,
  HighlightOffIcon,
  RestartAltSharpIcon,
  SearchIcon,
} from "../../components/icon";
import "./style.scss";
import assignmentService from "./../../api/assignmentService";
import { toast } from "react-toastify";
import { Loading } from "notiflix/build/notiflix-loading-aio";

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

const ManageAssignment = () => {
  const navigate = useNavigate();
  const [currentCol, setCurrentCol] = useState("");
  const [assignmentList, setAssignmentList] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState(0);
  const [content, setContent] = useState("");

  const [disable, setDisable] = useState(null);
  const newAssignmentId = localStorage.getItem("newAssignmentId");
  const rowPerPage = 3;
  const location = localStorage.getItem("location");

  const loadData = () => {
    Loading.standard("Loading...");

    assignmentService
      .getAllAssignments(location)
      .then((res) => {
        const resData = res.data;
        if (resData.length === 0) {
          toast.error("No assignment founded");
        }

        let newAssignment = resData.filter(
          (assignment) => assignment.id === newAssignmentId
        );
        let _data = [];
        if (newAssignment) {
          _data = resData.filter(
            (assignment) => assignment.id !== newAssignmentId
          );
        } else {
          _data = [...resData];
        }

        let sorted = _data.sort((a, b) => a.id - b.id);
        setData(resData); // get data to handle

        const finalList = [...newAssignment, ...sorted];
        setAssignmentList(finalList); // get data to display (have change)
        setNumPage(Math.ceil(finalList.length / rowPerPage)); // get number of page
        Loading.remove();
      })
      .catch((err) => {
        Loading.remove();
        console.log(err);
        toast.info("No Assignment Found");
      });
  };

  useEffect(() => {
    loadData();
    localStorage.removeItem("newAssignmentId");
  }, []);

  const sortByCol = (col) => {
    if (col === currentCol) {
      // if click same column
      setCurrentCol(""); // reset currentCol
    } else {
      // if click new column
      setCurrentCol(col); // set currentCol
    }
    const _data = [...assignmentList];

    switch (col) {
      case "no":
        col === currentCol
          ? setAssignmentList(_data.sort((a, b) => a.id - b.id))
          : setAssignmentList(_data.sort((a, b) => b.id - a.id));
        break;
      case "assetcode":
        col === currentCol
          ? setAssignmentList(
              _data.sort((a, b) => a.assetcode.localeCompare(b.assetcode))
            )
          : setAssignmentList(
              _data.sort((a, b) => b.assetcode.localeCompare(a.assetcode))
            );
        break;
      case "assetname":
        col === currentCol
          ? setAssignmentList(
              _data.sort((a, b) => a.assetname.localeCompare(b.assetname))
            )
          : setAssignmentList(
              _data.sort((a, b) => b.assetname.localeCompare(a.assetname))
            );
        break;
      case "assignedto":
        col === currentCol
          ? setAssignmentList(
              _data.sort((a, b) => a.assignedto.localeCompare(b.assignedto))
            )
          : setAssignmentList(
              _data.sort((a, b) => b.assignedto.localeCompare(a.assignedto))
            );
        break;
      case "assignedby":
        col === currentCol
          ? setAssignmentList(
              _data.sort((a, b) => a.assignedby.localeCompare(b.assignedby))
            )
          : setAssignmentList(
              _data.sort((a, b) => b.assignedby.localeCompare(a.assignedby))
            );
        break;
      case "assigneddate":
        col === currentCol
          ? setAssignmentList(
              _data.sort((a, b) => a.assigneddate.localeCompare(b.assigneddate))
            )
          : setAssignmentList(
              _data.sort((a, b) => b.assigneddate.localeCompare(a.assigneddate))
            );
        break;
      case "state":
        col === currentCol
          ? setAssignmentList(
              _data.sort((a, b) => a.state.localeCompare(b.state))
            )
          : setAssignmentList(
              _data.sort((a, b) => b.state.localeCompare(a.state))
            );
        break;
      case "specification":
        col === currentCol
          ? setAssignmentList(
              _data.sort((a, b) =>
                a.specification.localeCompare(b.specification)
              )
            )
          : setAssignmentList(
              _data.sort((a, b) =>
                b.specification.localeCompare(a.specification)
              )
            );
        break;
      case "note":
        col === currentCol
          ? setAssignmentList(
              _data.sort((a, b) => a.note.localeCompare(b.note))
            )
          : setAssignmentList(
              _data.sort((a, b) => b.note.localeCompare(a.note))
            );
        break;
      default:
        break;
    }
  };

  const handleSearch = () => {
    if (!content) {
      loadData();
    } else {
      assignmentService.searchAssignment(location, content).then((res) => {
        const resData = res.data;
        if (resData.length === 0) {
          toast.error(
            `No result match with ${content}. Try again with correct format`
          );
        }
        let sorted = resData.sort((a, b) => a.id - b.id);
        const finalList = [...sorted];
        setData(finalList); // get data to handle
        setAssignmentList(finalList); // get data to display (have change)
        setNumPage(Math.ceil(finalList.length / rowPerPage)); // get number of page
      }).catch((err) => {
        console.log(err);
        toast.info("No Assignment Found");
      });
    }
  };

  const handleNext = () => {
    if (page < numPage) {
      setPage(page + 1);
    }
  };

  const handlePre = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const disableAssignment = () => {
    alert("Disable assignment");
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
                  onClick={disableAssignment}
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
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div>
                <button
                  className="btn border-0"
                  onClick={handleSearch}
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
                      onClick={() => sortByCol(item.id)}
                    >
                      {item.isDropdown ? <ArrowDropDownIcon /> : <></>}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(
                assignmentList.slice(
                  (page - 1) * rowPerPage,
                  page * rowPerPage
                ) || []
              ).map((ele, index) => {
                return (
                  <>
                    <tr key={index}>
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
                        {ele.assetCode}
                      </td>
                      <td
                        className="border-bottom"
                        data-bs-toggle="modal"
                        data-bs-target={"#detailUserViewModal" + ele.id}
                      >
                        {ele.assetName}
                      </td>
                      <td
                        className="border-bottom"
                        data-bs-toggle="modal"
                        data-bs-target={"#detailUserViewModal" + ele.id}
                      >
                        {ele.assignedTo}
                      </td>
                      <td
                        className="border-bottom"
                        data-bs-toggle="modal"
                        data-bs-target={"#detailUserViewModal" + ele.id}
                      >
                        {ele.assignedBy}
                      </td>
                      <td
                        className="border-bottom"
                        data-bs-toggle="modal"
                        data-bs-target={"#detailUserViewModal" + ele.id}
                      >
                        {moment(ele.assignedDate).format("L")}
                      </td>
                      <td
                        className="border-bottom"
                        data-bs-toggle="modal"
                        data-bs-target={"#detailUserViewModal" + ele.id}
                      >
                        {ele.state}
                      </td>

                      <td style={{ width: "10rem" }}>
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
                                onClick={() => editAssignment(ele.id)}
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
        <div className="paging">
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
        </div>
        {/* end Pagination */}
      </div>
    </>
  );
};

export default ManageAssignment;
