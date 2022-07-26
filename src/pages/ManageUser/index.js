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
import { Link } from "react-router-dom";

const ManageUser = () => {
  const [page, setPage] = useState(1);
  const [userList, setUserList] = useState([]);
  const [data, setData] = useState([]);
  const [filterBy, setFilterBy] = useState("ALL");
  const [numPage, setNumPage] = useState(0);
  const [currentCol, setCurrentCol] = useState("");
  const [search, setSearch] = useState("");
  let location = localStorage.getItem("location");
  let userId = localStorage.getItem("userId");

  const [error, setError] = useState(null);
  /**
   * Handle when init page and when page change
   */

  // get data from backend
  useEffect(() => {
    // let location = localStorage.getItem("location");
    // let userId = localStorage.getItem("userId");
    (async () => {
      try {
        const res = await userService.getAllUsers(location, page);

        let _data = res.data.users.filter((ele) => ele.staffCode !== userId);

        setData(_data);
        console.log(_data);

        setNumPage(Math.ceil(res.data.totalRecord / 20));
      } catch (err) {
        console.log(err);
        setError("No User Found");
      }
    })();
  }, []);
  // end get data

  /**
   * Handle for filter
   */
  useEffect(() => {
    if (filterBy === "ALL") {
    let _data = data.sort((a, b) => a.fullName.localeCompare(b.fullName));
      setUserList(_data);
    } else {
      const _data = data.filter((user) => user.role === filterBy);
      let sorted = _data.sort((a, b) => a.fullName.localeCompare(b.fullName));

      setUserList(sorted);
    }
  }, [filterBy, data]);

  const sortByCol = (sortBy) => {
    switch (sortBy) {
      case "code":
        sortBy === currentCol
          ? userList.sort((a, b) => a.staffCode.localeCompare(b.staffCode))
          : userList.sort((a, b) => b.staffCode.localeCompare(a.staffCode));
        break;

      case "name":
        sortBy === currentCol
          ? userList.sort((a, b) => a.fullName.localeCompare(b.fullName))
          : userList.sort((a, b) => b.fullName.localeCompare(a.fullName));
        break;

      case "date":
        sortBy === currentCol
          ? userList.sort((a, b) => a.joinedDate.localeCompare(b.joinedDate))
          : userList.sort((a, b) => b.joinedDate.localeCompare(a.joinedDate));
        break;

      case "type":
        sortBy === currentCol
          ? userList.sort((a, b) => a.role.localeCompare(b.role))
          : userList.sort((a, b) => b.role.localeCompare(a.role));
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

  /**
   * Paging
   * @returns html: code for paging
   */
  const getPaging = () => {
    const getData = (p) => {
      setPage(p)
      userService
        .getAllUsers(location, p)
        .then((res) => {
          let _data = res.data.users.filter((ele) => ele.staffCode !== userId);

          setData(_data);
          setUserList(_data);

          setNumPage(Math.ceil(res.data.totalRecord / 20));
        })
        .catch((err) => console.log(err));
    };
    const handleNext = () => {
      let temp = page + 1;
      if (temp <= numPage) {
      getData(temp);

      }
    };

    const handlePre = () => {
      let temp = page - 1;
      if (temp >= 1) {
      getData(temp);

      }
    };

    if (numPage > 1) {
      return (
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
              onClick={() => getData(i + 1)}
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
      );
    }
  };

  // handle delete user here
  const deleteUser = (code) => {
    alert(code);
  };

  // handle edit user here
  const editUser = (code) => {
    alert(code);
  };

  const searchHandle = (e) => {
    let content = e.target.value;
    setSearch(content);
    if (content) {
      let reg = new RegExp(content, "i");
      let _data = data.filter((user) => {
        return (
          user.staffCode.match(reg) !== null ||
          user.fullName.match(reg) !== null
        );
      });
      setUserList(_data);
      console.log(typeof reg);
    } else {
      setUserList(data);
    }
  };

  const handleSearchGlobal = () => {
    userService
      .searchUser(location, search)
      .then((res) => {
        let _data = res.data.users.filter((ele) => ele.staffCode !== userId);

        setData(_data);

        setNumPage(Math.ceil(res.data.totalRecord / 20));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="user-list">
      <div className="title">
        <h3>User List</h3>
        {error && <small className="text-muted fs-6">{error}</small>}
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
                      onClick={() => setFilterBy("ALL")}
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
                      onClick={() => setFilterBy("ADMIN")}
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
                      onClick={() => setFilterBy("STAFF")}
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
              <input type="text" onChange={searchHandle} />
            </div>

            <div>
              <button className="btn btn-light" onClick={handleSearchGlobal}>
                <SearchIcon />
              </button>
            </div>
          </div>
          <div className="button">
            <button type="button" className="btn btn-danger">
              <Link to="/create-user" className="link-to-create">
                {" "}
                Create new user
              </Link>
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
                  className="btn btn-outline-light"
                  onClick={() => sortByCol("code")}
                >
                  <ArrowDropDownIcon />
                </button>
              </th>
              <th className="border-bottom border-3">
                Full Name{" "}
                <button
                  className="btn btn-outline-light"
                  onClick={() => sortByCol("name")}
                >
                  <ArrowDropDownIcon />
                </button>
              </th>
              <th className="border-bottom border-3">Username</th>
              <th className="border-bottom border-3">
                Joined Date{" "}
                <button
                  className="btn btn-outline-light"
                  onClick={() => sortByCol("date")}
                >
                  <ArrowDropDownIcon />
                </button>
              </th>
              <th className="border-bottom border-3">
                Type{" "}
                <button
                  className="btn btn-outline-light"
                  onClick={() => sortByCol("type")}
                >
                  <ArrowDropDownIcon />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {(userList || []).map((ele) => (
              <>
                <tr
                  data-bs-toggle="modal"
                  data-bs-target={"#detailUserViewModal" + ele.staffCode}
                  key={ele.staffCode}
                >
                  <td className="border-bottom">{ele.staffCode}</td>
                  <td className="border-bottom">{ele.fullName}</td>
                  <td className="border-bottom">{ele.username}</td>
                  <td className="border-bottom">
                    {moment(ele.joinedDate).format("L")}
                  </td>
                  <td className="border-bottom">{ele.role}</td>
                  <td>
                    <button className="btn btn-outline-secondary border-0">
                      <EditIcon onClick={() => editUser(ele.staffCode)} />
                    </button>
                    <button
                      className="btn btn-outline-danger border-0"
                      onClick={() => deleteUser(ele.staffCode)}
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

      <div className="paging">{userList && getPaging()}</div>
    </div>
  );
};

export default ManageUser;
