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
import DateRangeIcon from "@mui/icons-material/DateRange";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import returningService from "../../api/returningService";

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
  const rowPerPage = 20;

  const [content, setContent] = useState("");
  const [filterByState, setFilterByState] = useState("All");
  const [filterByDate, setFilterByDate] = useState(null);

  const [disable, setDisable] = useState(null);
  const [createReturn, setCreateReturn] = useState();

  const newAssignmentId = localStorage.getItem("newAssignmentId");
  const location = localStorage.getItem("location");

  // TODO: check when action is disable

  const loadData = () => {
    Loading.standard("Loading...");

    assignmentService
      .getAllAssignments(location)
      .then((res) => {
        console.log(res.data);
        const resData = res.data;
        if (resData.length === 0) {
          toast.error("No assignment founded");
        }

        let newAssignment = resData.filter(
          (assignment) => assignment.id === newAssignmentId
        );
        let _data = [];
        if (newAssignmentId) {
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

  const isEqual = (date1, date2) => {
    const d1 = moment(date1).format("L");
    const d2 = moment(date2).format("L");
    return d1.localeCompare(d2) === 0;
  };

  useEffect(() => {
    let list = [...data];
    if (filterByState !== "All" && filterByState !== null) {
      list = list.filter(
        (item) => item.state.localeCompare(filterByState) === 0
      );
    }

    if (filterByDate) {
      list = list.filter((item) => isEqual(filterByDate, item.assignedDate));
    }

    setNumPage(Math.ceil(list.length / rowPerPage));
    setAssignmentList(list);
  }, [filterByDate, filterByState, data]);

  const sortByCol = (col) => {
    if (col === currentCol) {
      setCurrentCol(""); // reset currentCol
    } else {
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
              _data.sort((a, b) => a.assetCode.localeCompare(b.assetCode))
            )
          : setAssignmentList(
              _data.sort((a, b) => b.assetCode.localeCompare(a.assetCode))
            );
        break;
      case "assetname":
        col === currentCol
          ? setAssignmentList(
              _data.sort((a, b) => a.assetName.localeCompare(b.assetName))
            )
          : setAssignmentList(
              _data.sort((a, b) => b.assetName.localeCompare(a.assetName))
            );
        break;
      case "assignedto":
        col === currentCol
          ? setAssignmentList(
              _data.sort((a, b) => a.assignedTo.localeCompare(b.assignedTo))
            )
          : setAssignmentList(
              _data.sort((a, b) => b.assignedTo.localeCompare(a.assignedTo))
            );
        break;
      case "assignedby":
        col === currentCol
          ? setAssignmentList(
              _data.sort((a, b) => a.assignedBy.localeCompare(b.assignedBy))
            )
          : setAssignmentList(
              _data.sort((a, b) => b.assignedBy.localeCompare(a.assignedBy))
            );
        break;
      case "assigneddate":
        col === currentCol
          ? setAssignmentList(
              _data.sort((a, b) => a.assignedDate.localeCompare(b.assignedDate))
            )
          : setAssignmentList(
              _data.sort((a, b) => b.assignedDate.localeCompare(a.assignedDate))
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
      Loading.standard("Searching...");

      assignmentService
        .searchAssignment(location, content)
        .then((res) => {
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

          Loading.remove();
        })
        .catch((err) => {
          Loading.remove();
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

  const editAssignment = (code) => {
    navigate(`/edit-assignment/${code}`);
  };

  //handle delete assignment
  const handleDelete = (code) => {
    setDisable(code);
  };

  const deleteAssignment = () => {
    assignmentService
      .deleteAssignment(disable)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Assignment Deleted");
          loadData();
          setDisable(null);
        }
      })
      .catch((err) => {
        console.log(err);
        setDisable(null);
        toast.error(err.response.data.message);
      });
  };

  const handleCreateReturning = () => {
    const assId = createReturn;
    const requestBy = localStorage.getItem("username");

    returningService
      .createNewReturning(assId, requestBy)
      .then((res) => {
        if (res.status === 201) {
          toast.success(
            "Request for return successfully!. Forward to request for returning tab to view."
          );
          setCreateReturn(null);
          loadData();
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("cannot create request for returning. Try later");
      });
  };

  return (
    <>
      {/* Modal to show confirm  create new request for returning */}
      <div
        className={"modal fade " + (createReturn ? " show d-block" : " d-none")}
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
                Do you want to create a returning request for this asset?
              </div>
              <div className="button">
                <button
                  className="btn btn-danger"
                  id="disable-button"
                  onClick={handleCreateReturning}
                >
                  Yes
                </button>
                <button
                  className="btn btn-outline-secondary"
                  id="cancel-button"
                  onClick={() => setCreateReturn(null)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* start dialog */}
      <div
        className={
          "modal fade" +
          (disable && disable !== "Error" ? " show d-block" : " d-none")
        }
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
                  onClick={deleteAssignment}
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
                          checked={filterByState === type}
                          onChange={() => setFilterByState(type)}
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

              <div className="filterDate border border-secondary">
                <div>
                  <DatePicker
                    placeholderText="Assigned Date"
                    selected={filterByDate}
                    onChange={(date) => setFilterByDate(date)}
                  />
                </div>
                <div className="iconDate border-start border-secondary text-secondary">
                  <DateRangeIcon />
                </div>
                {/* end filter Assigned Date*/}
              </div>
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
                <button className="btn border-0" onClick={handleSearch}>
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
                    {ele.status && (
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
                                <button
                                  className="btn btn-outline-primary border-0"
                                  disabled={
                                    ele.state === "Accepted" || ele.hasReturning
                                  }
                                >
                                  <RestartAltSharpIcon
                                    onClick={() => setCreateReturn(ele.id)}
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
                                  onClick={() =>
                                    handleDelete(ele.id)
                                  }
                                  />
                                </button>
                                <button
                                  className="btn btn-outline-secondary border-0"
                                  disabled={
                                    ele.state === "Accepted" || ele.hasReturning
                                  }
                                >
                                  <RestartAltSharpIcon
                                    onClick={() => setCreateReturn(ele.id)}
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
                                    <div className="value">{ele.assetCode}</div>
                                  </div>
                                  <div className="detail-item">
                                    <div className="label">Asset Name</div>
                                    <div className="value">{ele.assetName}</div>
                                  </div>
                                  <div className="detail-item">
                                    <div className="label">Specification</div>
                                    <div className="value">
                                      {ele.specification}
                                    </div>
                                  </div>
                                  <div className="detail-item">
                                    <div className="label">Assigned to</div>
                                    <div className="value">
                                      {ele.assignedTo}
                                    </div>
                                  </div>
                                  <div className="detail-item">
                                    <div className="label">Assigned by</div>
                                    <div className="value">
                                      {ele.assignedBy}
                                    </div>
                                  </div>
                                  <div className="detail-item">
                                    <div className="label">Assigned Date</div>
                                    <div className="value">
                                      {moment(ele.assignedDate).format("L")}
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
                    )}
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
