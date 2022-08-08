import React, { useEffect, useState } from "react";
import { SearchIcon, ArrowDropDownIcon } from "../../components/icon";
import userService from "./../../api/userService";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { toast } from "react-toastify";
import Paging from "../../components/paging";

const tableHead = [
  {
    id: "no",
    name: "",
    isDropdown: false,
  },
  {
    id: "staffcode",
    name: "Staff Code",
    isDropdown: true,
  },
  {
    id: "fullname",
    name: "Full Name",
    isDropdown: true,
  },
  {
    id: "type",
    name: "Type",
    isDropdown: true,
  },
];

const SelectUser = (props) => {
  const [userList, setUserList] = useState([]);
  const [numPage, setNumPage] = useState(0);
  const [page, setPage] = useState(1);
  const rowPerPage = 10;

  const [currentCol, setCurrentCol] = useState("");
  const [content, setContent] = useState("");
  const location = localStorage.getItem("location");

  const loadData = () => {
    Loading.standard("Loading...");
    userService
      .getAllUsers(location)
      .then((res) => {
        const resData = res.data;
        if (resData.length === 0) {
          toast.error("No user founded");
        }

        let sorted = resData.sort((a, b) =>
          a.fullName.localeCompare(b.fullName)
        );

        const finalList = [...sorted];
        setUserList(finalList);
        setNumPage(Math.ceil(finalList.length / rowPerPage));
        Loading.remove();
      })
      .catch((err) => {
        Loading.remove();
        console.log(err);
        toast.info("No User Found");
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSearch = () => {
    if (!content) {
      loadData();
    } else {
      Loading.standard("Searching...");
      userService
        .searchUser(location, content)
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
          setUserList(sorted);

          Loading.remove();
        })
        .catch((err) => {
          Loading.remove();
          toast.info(
            `No user match with "${content}". Try again with correct format.`
          );
        });
    }
  };

  const sortByCol = (sortBy) => {
    if (sortBy === currentCol) {
      setCurrentCol("");
    } else {
      setCurrentCol(sortBy);
    }
    const _data = [...userList];
    switch (sortBy) {
      case "staffcode":
        sortBy === currentCol
          ? setUserList(
              _data.sort((a, b) => a.staffCode.localeCompare(b.staffCode))
            )
          : setUserList(
              _data.sort((a, b) => b.staffCode.localeCompare(a.staffCode))
            );

        break;

      case "fullname":
        sortBy === currentCol
          ? setUserList(
              _data.sort((a, b) => a.fullName.localeCompare(b.fullName))
            )
          : setUserList(
              _data.sort((a, b) => b.fullName.localeCompare(a.fullName))
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
  };

  const handleSelect = (username) => {
    props.setUserName(username);
    props.setUserId(
      userList.find((item) => item.username === username).staffCode
    );
  };

  const handleSave = () => {
    alert("Save");
  };

  const handleCancel = () => {
    alert("Cancel");
  };

  return (
    <>
      <div className="container dropdown-menu p-3 border border-dark">
        <div class="d-flex justify-content-between">
          <h4 className="form-create-asset__title">Select User</h4>
          <div className="search">
            <div className="input">
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <button
              className="btn border-dark border-start border-bottom-0 border-end-0 border-top-0 rounded-0 me-1"
              onClick={handleSearch}
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
                userList.slice((page - 1) * rowPerPage, page * rowPerPage) || []
              ).map((ele, index) => {
                return (
                  <>
                    <tr key={index} onClick={() => handleSelect(ele.username)}>
                      <td>
                        <input
                          className="form-check-input"
                          type="radio"
                          id={ele.staffCode}
                          name="state"
                        ></input>
                      </td>
                      <td className="border-bottom">
                        <label htmlFor={ele.staffCode}>{ele.staffCode}</label>
                      </td>
                      <td className="border-bottom">
                        <label htmlFor={ele.staffCode}>{ele.fullName}</label>
                      </td>
                      <td className="border-bottom">
                        <label htmlFor={ele.staffCode}>{ele.role}</label>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>

          <Paging numPage={numPage} setPage={setPage} page={page} />

          <div className="d-flex justify-content-end gap-4">
            <button
              className="form-create-asset__button-item btn btn-danger"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="form-create-asset__button-item btn btn-light border-secondary"
              onClick={handleCancel}
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

export default SelectUser;
