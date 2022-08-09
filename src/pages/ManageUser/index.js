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
import Paging from "../../components/paging";

const ManageUser = () => {
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
  const initData = () => {
    const location = localStorage.getItem("location");
    const userId = localStorage.getItem("userId");
    const newUserId = localStorage.getItem("newUser");

    Loading.standard("Loading...");
    userService
      .getAllUsers(location)
      .then((res) => {
        const resData = res.data;
        let newUser = resData.filter((user) => user.staffCode === newUserId);
        if (resData.length === 0) {
          toast.error("No user founded");
        }

        let _data = [];

        if (newUserId) {
          _data = resData.filter(
            (user) => user.staffCode !== newUserId || user.staffCode !== userId
          );
        } else {
          _data = resData.filter((user) => user.staffCode !== userId);
        }
        let sorted = _data.sort((a, b) => a.fullName.localeCompare(b.fullName));

        const finalList = [...newUser, ...sorted];
        setNumPage(Math.ceil(finalList.length / rowPerPage));
        setData(finalList);
        setUserList(finalList);
        Loading.remove();
      })
      .catch((err) => {
        Loading.remove();
        console.log(err);
        toast.info("No User Found");
      });

    localStorage.removeItem("newUser");
  };
  useEffect(() => {
    initData();
  }, []);

  const handleFilter = (type) => {
    setFilterBy(type);
    setPage(1);
    if (type === "ALL") {
      setNumPage(Math.ceil(data.length / rowPerPage));
      setUserList(data);
    } else {
      const _data = data.filter((user) => user.role === type);
      setNumPage(Math.ceil(_data.length / rowPerPage));
      setUserList(_data);
    }
  };

  const sortByCol = (sortBy) => {
    const _data = [...userList];
    switch (sortBy) {
      case "code":
        sortBy === currentCol
          ? setUserList(
              _data.sort((a, b) => a.staffCode.localeCompare(b.staffCode))
            )
          : setUserList(
              _data.sort((a, b) => b.staffCode.localeCompare(a.staffCode))
            );

        break;

      case "name":
        sortBy === currentCol
          ? setUserList(
              _data.sort((a, b) => a.fullName.localeCompare(b.fullName))
            )
          : setUserList(
              _data.sort((a, b) => b.fullName.localeCompare(a.fullName))
            );
        break;

      case "date":
        sortBy === currentCol
          ? setUserList(
              _data.sort((a, b) => a.joinedDate.localeCompare(b.joinedDate))
            )
          : setUserList(
              _data.sort((a, b) => b.joinedDate.localeCompare(a.joinedDate))
            );
        break;

      case "type":
        sortBy === currentCol
          ? setUserList(_data.sort((a, b) => a.role.localeCompare(b.role)))
          : setUserList(_data.sort((a, b) => b.role.localeCompare(a.role)));
        break;

      default:
        break;
    }
    if (sortBy === currentCol) {
      setCurrentCol("");
    } else {
      setCurrentCol(sortBy);
    }
  };

  // handle delete user here
  const checkUserAvailableToDisable = (code) => {
    userService
      .checkUserCanDelete(code)
      .then((res) => {
        if (res.data) {
          setDisable(code);
        } else {
          setDisable("Error");
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 403) {
          toast.error(error.response.data.message);
          initData();
        } else {
          setDisable("Error");
        }
      });
  };

  const disableUser = () => {
    userService
      .disableUser(disable)
      .then((res) => {
        if (res.status === 200) {
          toast.info("User is disabled");

          setDisable(null);
          initData();
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 403) {
          toast.error(err.response.data.message);
          setDisable(null);

          initData();
        } else {
          toast.error("Internet interrupt. Try later");
        }
      });
  };

  // handle edit user here
  const editUser = (code) => {
    navigate(`/edit-user/${code}`);
  };

  const handleSearch = () => {
    if (!content) {
      initData();
    } else {
      const loca = localStorage.getItem("location");
      userService
        .searchUser(loca, content)
        .then((res) => {
          console.log(res);
          if (res.data.length === 0) {
            toast.error("No user founded");
          }
          const _data = res.data;
          let sorted = _data.sort((a, b) =>
            a.fullName.localeCompare(b.fullName)
          );

          setNumPage(Math.ceil(sorted.length / rowPerPage));
          setData(sorted);
          setUserList(sorted);
        })
        .catch((err) => {
          console.log(err);
          toast.info(
            `No user match with "${content}". Try again with correct format.`
          );
        });
    }
  };

  return (
    <>
      <div
        className={
          "modal fade " +
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
              <div className="modal-subtitle">Do you want to disable user?</div>
              <div className="button">
                <button
                  className="btn btn-danger"
                  id="disable-button"
                  onClick={disableUser}
                >
                  Disable
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

      <div
        className={
          "modal fade " + (disable === "Error" ? " show d-block" : " d-none")
        }
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-danger">Can not disable user</h5>
              <button
                type="button"
                className="btn btn-outline-danger border-4"
                onClick={() => setDisable(null)}
                id="btnClose"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="modal-body confirm-disable">
              <div className="modal-subtitle">
                There are valid assignments belonging to this user. <br />
                Please close all assignments before disabling user.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="user-list">
        <div className="title">
          <h3>User List</h3>
        </div>

        <div className="table-board">
          <div className="left-board">
            <div className="filter">
              <div className="dropdown">
                <button
                  className="btn btn-outline-secondary dropdown-toggle"
                  type="button"
                  id="dropMenuFilterType"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Type
                  <FilterAltIcon />
                </button>
                <ul
                  className="dropdown-menu form-check"
                  aria-labelledby="dropMenuFilterType"
                >
                  <li>
                    <div>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="All"
                        id="typeAll"
                        checked={filterBy === "ALL"}
                        onClick={() => handleFilter("ALL")}
                      />
                      <label className="form-check-label" htmlFor="typeAll">
                        All
                      </label>
                    </div>
                  </li>
                  <li>
                    <div>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="Admin"
                        id="typeAdmin"
                        checked={filterBy === "ADMIN"}
                        onClick={() => handleFilter("ADMIN")}
                      />
                      <label className="form-check-label" htmlFor="typeAdmin">
                        Admin
                      </label>
                    </div>
                  </li>
                  <li>
                    <div>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="Staff"
                        id="typeStaff"
                        checked={filterBy === "STAFF"}
                        onClick={() => handleFilter("STAFF")}
                      />
                      <label className="form-check-label" htmlFor="typeStaff">
                        Staff
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="right-board">
            <div className="search">
              <div className="input">
                <input
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div>
                <button className="btn border-0" id="btnSearch" onClick={handleSearch}>
                  <SearchIcon />
                </button>
              </div>
            </div>
            <div className="button">
              <button
                type="button"
                className="btn btn-danger"
                id="btnCreateUser"
                onClick={() => {
                  navigate("/create-user");
                }}
              >
                Create new user
              </button>
            </div>
          </div>
        </div>

        <div className="table-user-list">
          <table>
            <thead>
              <tr>
                <th className="border-bottom border-3">
                  Staff Code{" "}
                  <button
                    className="btn border-0"
                    id="sortByCode"
                    onClick={() => sortByCol("code")}
                  >
                    <ArrowDropDownIcon />
                  </button>
                </th>
                <th className="border-bottom border-3">
                  Full Name{" "}
                  <button
                    id="sortByName"
                    className="btn border-0"
                    onClick={() => sortByCol("name")}
                  >
                    <ArrowDropDownIcon />
                  </button>
                </th>
                <th className="border-bottom border-3">Username</th>
                <th className="border-bottom border-3">
                  Joined Date{" "}
                  <button
                    id="sortByDate"
                    className="btn border-0"
                    onClick={() => sortByCol("date")}
                  >
                    <ArrowDropDownIcon />
                  </button>
                </th>
                <th className="border-bottom border-3">
                  Type{" "}
                  <button
                    id="sortByType"
                    className="btn border-0"
                    onClick={() => sortByCol("type")}
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
                      <button className="btn btn-outline-secondary border-0" id="btnEdit">
                        <EditIcon onClick={() => editUser(ele.staffCode)} />
                      </button>
                      <button
                        className="btn btn-outline-danger border-0"
                        id="btnHighlight"
                        onClick={() =>
                          checkUserAvailableToDisable(ele.staffCode)
                        }
                      >
                        <HighlightOffIcon />
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
                            id="btnClose"
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

        <Paging numPage={numPage} setPage={setPage} page={page} />
      </div>
    </>
  );
};

export default ManageUser;
