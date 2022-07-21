import React, { useState, useEffect } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";

import "./style.scss";

// mock data to view
const list = [
  {
    id: "SD1901",
    fullname: "An Nguyen Thuy",
    username: "annt",
    joinedDate: "20/06/2019",
    type: "Staff",
  },
  {
    id: "AD1902",
    fullname: "Ban Nguyen Thuy",
    username: "annt",
    joinedDate: "21/06/2019",
    type: "Staff",
  },
  {
    id: "SD1903",
    fullname: "Can Nguyen Thuy",
    username: "annt",
    joinedDate: "20/06/2019",
    type: "Admin",
  },
  {
    id: "SD1904",
    fullname: "Y Nguyen Thuy",
    username: "annt",
    joinedDate: "20/06/2019",
    type: "Admin",
  },
  {
    id: "SD1905",
    fullname: "Z Nguyen Thuy",
    username: "annt",
    joinedDate: "20/06/2019",
    type: "Admin",
  },
  {
    id: "SD1906",
    fullname: "Go Nguyen Thuy",
    username: "annt",
    joinedDate: "20/06/2019",
    type: "Admin",
  },
  {
    id: "SD1907",
    fullname: "An Nguyen Thuy",
    username: "annt",
    joinedDate: "20/05/2019",
    type: "Admin",
  },
  {
    id: "SD1908",
    fullname: "",
    username: "annt",
    joinedDate: "20/06/2019",
    type: "Admin",
  },
  {
    id: "SD1909",
    fullname: "B",
    username: "annt",
    joinedDate: "20/06/2019",
    type: "Admin",
  },
  {
    id: "SD1910",
    fullname: "A",
    username: "annt",
    joinedDate: "18/06/2019",
    type: "Admin",
  },
  {
    id: "SD1911",
    fullname: "An Nguyen Thuy",
    username: "annt",
    joinedDate: "19/06/2019",
    type: "Staff",
  },
];

const ManageUser = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [userList, setUserList] = useState([]);
  const [data, setData] = useState([]);
  const [filterBy, setFilterBy] = useState("All");
  const [numPage, setNumPage] = useState(0);
  const [currentCol, setCurrentCol] = useState("");
  const userPerPage = 20;

  /**
   * Handle when init page and when page change
   */
  useEffect(() => {
    // todo: get data from backend
    setData(list);

    let len = data.length;
    let _numPage = Math.ceil(len / userPerPage); // calculate a number of page
    setNumPage(_numPage);

    // sort name ascending by default
    data.sort((a, b) => a.fullname.localeCompare(b.fullname));

    //paging
    const _data = data.slice((page - 1) * userPerPage, page * userPerPage);
    setUserList(_data);
  }, [data, page]);

  /**
   * Handle for filter
   */
  useEffect(() => {
    if (filterBy === "All") {
      const _data = data.slice((page - 1) * userPerPage, page * userPerPage);
      setUserList(_data);
    } else {
      const _data = data.filter((user) => user.type === filterBy);
      const result = _data.slice((page - 1) * userPerPage, page * userPerPage);

      let len = _data.length;
      let _numPage = Math.ceil(len / 20);
      setNumPage(_numPage);

      setUserList(result);
    }
  }, [data, filterBy, page]);

  const searchUserHandle = () => {
    // search function here
    alert(search);
  };

  const sortByCol = (sortBy) => {
    switch (sortBy) {
      case "code":
        sortBy === currentCol
          ? userList.sort((a, b) => a.id.localeCompare(b.id))
          : userList.sort((a, b) => b.id.localeCompare(a.id));
        break;

      case "name":
        sortBy === currentCol
          ? userList.sort((a, b) => a.fullname.localeCompare(b.fullname))
          : userList.sort((a, b) => b.fullname.localeCompare(a.fullname));
        break;

      case "date":
        sortBy === currentCol
          ? userList.sort((a, b) => a.joinedDate.localeCompare(b.joinedDate))
          : userList.sort((a, b) => b.joinedDate.localeCompare(a.joinedDate));
        break;

      case "type":
        sortBy === currentCol
          ? userList.sort((a, b) => a.type.localeCompare(b.type))
          : userList.sort((a, b) => b.type.localeCompare(a.type));
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
    const handleNext = () => {
      let temp = page + 1;
      if (temp <= numPage) {
        setPage(temp);
      }
    };

    const handlePre = () => {
      let temp = page - 1;
      if (temp >= 1) {
        setPage(temp);
      }
    };

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
            onClick={(e) => setPage(i + 1)}
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
  };

  // handle delete user here
  const deleteUser = (code) => {
    alert(code);
  };

  // handle edit user here
  const editUser = (code) => {
    alert(code);
  };

  return (
    <div className="user-list">
      <div className="title">User List</div>

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
                      checked={filterBy === "All"}
                      onClick={() => setFilterBy("All")}
                    />
                    <label className="form-check-label" for="typeAll">
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
                      checked={filterBy === "Admin"}
                      onClick={() => setFilterBy("Admin")}
                    />
                    <label className="form-check-label" for="typeAdmin">
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
                      checked={filterBy === "Staff"}
                      onClick={() => setFilterBy("Staff")}
                    />
                    <label className="form-check-label" for="typeStaff">
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
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </div>

            <div>
              <button className="btn btn-light" onClick={searchUserHandle}>
                <SearchIcon />
              </button>
            </div>
          </div>
          <div className="button">
            <button type="button" className="btn btn-danger">
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
                  onClick={(e) => sortByCol("name")}
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
                  onClick={(e) => sortByCol("type")}
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
                  data-bs-target={"#detailUserViewModal" + ele.id}
                >
                  <td className="border-bottom">{ele.id}</td>
                  <td className="border-bottom">{ele.fullname}</td>
                  <td className="border-bottom">{ele.username}</td>
                  <td className="border-bottom">{ele.joinedDate}</td>
                  <td className="border-bottom">{ele.type}</td>
                  <td>
                    <button className="btn btn-outline-secondary border-0">
                      <EditIcon onClick={(e) => editUser(ele.id)} />
                    </button>
                    <button
                      className="btn btn-outline-danger border-0"
                      onClick={(e) => deleteUser(ele.id)}
                    >
                      <HighlightOffIcon />
                    </button>{" "}
                  </td>
                </tr>

                <div
                  className="modal fade"
                  id={"detailUserViewModal" + ele.id}
                  tabindex="-1"
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
                            <div className="value">{ele.id}</div>
                          </div>
                          <div className="detail-item">
                            <div className="label">Full Name</div>
                            <div className="value">{ele.fullname}</div>
                          </div>
                          <div className="detail-item">
                            <div className="label">Username</div>
                            <div className="value">{ele.username}</div>
                          </div>
                          <div className="detail-item">
                            <div className="label">Date Of Birth</div>
                            {/* TODO: change field below */}
                            <div className="value">{"20/4/2001"}</div>
                          </div>
                          <div className="detail-item">
                            <div className="label">Gender</div>
                            {/* TODO: change field below */}
                            <div className="value">{"Male"}</div>
                          </div>
                          <div className="detail-item">
                            <div className="label">Joined Date</div>
                            <div className="value">{ele.joinedDate}</div>
                          </div>
                          <div className="detail-item">
                            <div className="label">Type</div>
                            <div className="value">{ele.type}</div>
                          </div>
                          <div className="detail-item">
                            <div className="label">Location</div>
                            {/* TODO: change field below */}
                            <div className="value">{"HCM"}</div>
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
