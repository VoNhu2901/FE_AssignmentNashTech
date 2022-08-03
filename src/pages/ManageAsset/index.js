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
} from "../../components/icon";
import "./index.scss";
import SubTable from "./SubTable";
import assetService from "./../../api/assetService";
import { toast } from "react-toastify";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import categoryService from "../../api/categoryService";

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

const state = [
  "ALL",
  "Assigned",
  "Available",
  "Not available",
  "Waiting for recycling",
  "Recycled",
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

const ManageAsset = () => {
  const navigate = useNavigate();

  const [categoryPrefix, setCategoryPrefix] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [listCategory, setListCategory] = useState([]);

  const [page, setPage] = useState(1);
  const [userList, setUserList] = useState([]);
  const [data, setData] = useState([]);
  const [numPage, setNumPage] = useState(0);
  const [currentCol, setCurrentCol] = useState("");
  const [content, setContent] = useState("");
  const rowPerPage = 20;

  const [filterByState, setFilterByState] = useState([0, 1, 1, 1, 0, 0]);
  const [filterByCategory, setFilterByCategory] = useState("ALL");

  const location = localStorage.getItem("location");

  const [disable, setDisable] = useState(null);
  const newAssetId = localStorage.getItem("newAsset");

  const loadData = () => {
    Loading.standard("Loading...");

    assetService
      .getAllAssets(location)
      .then((res) => {
        const resData = res.data;
        if (resData.length === 0) {
          toast.error("No asset founded");
        }

        let newAsset = resData.filter((asset) => asset.id === newAssetId);
        let _data = [];
        if (newAssetId) {
          _data = resData.filter((asset) => asset.id !== newAssetId);
        } else {
          _data = [...resData];
        }
        const filterByDefault = _data.filter(isFilter);
        let sorted = filterByDefault.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setData(resData); // get data to handle

        const finalList = [...newAsset, ...sorted];
        setUserList(finalList); // get data to display (have change)
        setNumPage(Math.ceil(finalList.length / rowPerPage)); // get number of page
        Loading.remove();
      })
      .catch((err) => {
        Loading.remove();
        console.log(err);
        toast.info("No Asset Found");
      });

    //category
    categoryService
      .getAllCategory()
      .then((res) => {
        setListCategory(res.data);
      })
      .catch((error) => {
        toast.error("ERROR SERVER");
      });
  };

  // get data from backend
  useEffect(() => {
    loadData();
    localStorage.removeItem("newAsset");
  }, []);

  const isFilter = (asset) => {
    if (state[1].localeCompare(asset.state) === 0) {
      return filterByState[1];
    } else if (state[2].localeCompare(asset.state) === 0) {
      return filterByState[2];
    } else if (state[3].localeCompare(asset.state) === 0) {
      return filterByState[3];
    } else if (state[4].localeCompare(asset.state) === 0) {
      return filterByState[4];
    } else if (state[5].localeCompare(asset.state) === 0) {
      return filterByState[5];
    }
    return false;
  };

  const handleFilterByState = (index) => {
    let temp = filterByState;
    let a = filterByState[index];
    temp[index] = a === 1 ? 0 : 1;
    setFilterByState([...temp]);
    setPage(1);

    const _data = data.filter(
      (asset) =>
        asset.category.id.localeCompare(filterByCategory) === 0 ||
        filterByCategory.localeCompare("ALL") === 0
    );

    if (filterByState[0]) {
      setUserList(_data);
      setNumPage(Math.ceil(_data.length / rowPerPage));
      setFilterByState([1, 1, 1, 1, 1, 1]);
    } else {
      let filtered = _data.filter(isFilter);
      setNumPage(Math.ceil(filtered.length / rowPerPage));
      console.log(filtered.length);
      if (filtered.length === 0) {
        toast.info(
          `No asset in ${location} have state you choose. Choose another state.`
        );
      }
      setUserList(filtered);
    }
  };

  const handleFilterByCategory = (type) => {
    setFilterByCategory(type);
    setPage(1);
    if (type === "ALL") {
      const _data = data.filter(isFilter);
      setNumPage(Math.ceil(_data.length / rowPerPage));
      setUserList(_data);
    } else {
      let filtered = data.filter((asset) => asset.category.id === type);
      const filterState = filtered.filter(isFilter);
      if (filterState.length === 0) {
        toast.info(
          `No asset in ${location} have category you choose. Choose another category.`
        );
      }
      setUserList(filterState);
    }
  };

  const sortByCol = (col) => {
    if (col === currentCol) {
      // if click same column
      setCurrentCol(""); // reset currentCol
    } else {
      // if click new column
      setCurrentCol(col); // set currentCol
    }
    const _data = [...userList];

    switch (col) {
      case "assetcode":
        col === currentCol
          ? setUserList(_data.sort((a, b) => a.id.localeCompare(b.id)))
          : setUserList(_data.sort((a, b) => b.id.localeCompare(a.id)));
        break;
      case "assetname":
        col === currentCol
          ? setUserList(_data.sort((a, b) => a.name.localeCompare(b.name)))
          : setUserList(_data.sort((a, b) => b.name.localeCompare(a.name)));
        break;
      case "category":
        col === currentCol
          ? setUserList(
              _data.sort((a, b) =>
                a.category.name.localeCompare(b.category.name)
              )
            )
          : setUserList(
              _data.sort((a, b) =>
                b.category.name.localeCompare(a.category.name)
              )
            );
        break;
      case "state":
        col === currentCol
          ? setUserList(_data.sort((a, b) => a.state.localeCompare(b.state)))
          : setUserList(_data.sort((a, b) => b.state.localeCompare(a.state)));
        break;
      default:
        break;
    }
  };

  const handleSearch = () => {
    if (!content) {
      loadData();
    } else {
      assetService
        .searchAsset(location, content)
        .then((res) => {
          const resData = res.data;
          if (resData.length === 0) {
            toast.error(
              `No result match with ${content}. Try again with correct format`
            );
          }

          let sorted = resData.sort((a, b) => a.name.localeCompare(b.name));

          const finalList = [...sorted];
          setNumPage(Math.ceil(finalList.length / rowPerPage));
          setData(finalList); // get data to handle
          setUserList(finalList); // get data to display (have change)
        })
        .catch((err) => {
          console.log(err);
          toast.info(
            `No result match with ${content}. Try again with correct format`
          );
        });
    }
  };

  // handle edit asset here
  const editAsset = (code) => {
    navigate(`/edit-asset/${code}`);
  };

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

  // handle delete user here
  const checkAssetAvailableToDisable = (code) => {
    assetService
      .checkAssetHistory(code)
      .then((res) => {
        if (res.data) {
          setDisable(code);
        } else {
          setDisable("Error");
        }
      })
      .catch((err) => {
        console.log(err);
        setDisable("Error");
      });
  };

  const disableAsset = () => {
    Loading.standard("Deleting...");

    assetService
      .deleteAsset(disable)
      .then((res) => {
        if (res.status === 200) {
          setDisable(null);
          loadData();
          toast.success("Asset Deleted");
        }
        Loading.remove();
      })
      .catch((err) => {
        Loading.remove();
        console.log(err);
        toast.error("Cannot delete asset");
      });
  };

  return (
    <>
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
                Do you want to delete this asset?
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

      <div
        className={
          "modal fade " + (disable === "Error" ? " show d-block" : " d-none")
        }
        // className={"modal fade  show d-block"}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-danger">Cannot Delete Asset</h5>
              <button
                type="button"
                className="btn btn-outline-danger border-4"
                onClick={() => setDisable(null)}
              >
                <CloseIcon />
              </button>
            </div>
            <div className="modal-body confirm-disable">
              <div className="modal-subtitle">
                Cannot delete the asset because it belongs to one or more
                historical assignments. <br />
                If the asset is not able to be used anymore, please update its
                state in{" "}
                <Link
                  to={`/edit-asset/${disable}`}
                  className="text-primary"
                  onClick={() => setDisable(null)}
                >
                  Edit Asset page
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end dialog */}

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
                  {filterState.map((type, index) => (
                    <li key={type.id}>
                      <div>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={type.value}
                          id={type.id}
                          checked={filterByState[index] === 1}
                          onChange={() => handleFilterByState(index)}
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
                  <li>
                    <div>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="All"
                        id="typeAll"
                        checked={filterByCategory === "ALL"}
                        onClick={() => handleFilterByCategory("ALL")}
                      />
                      <label className="form-check-label" htmlFor="typeAll">
                        All
                      </label>
                    </div>
                  </li>
                  {listCategory.map((type) => (
                    <li key={type.id}>
                      <div>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={type.id}
                          id={type.id}
                          checked={filterByCategory === type.id}
                          onChange={() => handleFilterByCategory(type.id)}
                        />
                        <label className="form-check-label" htmlFor={type.id}>
                          {type.name}
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
                        {ele.state === "Assigned" ? (
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
                          </>
                        ) : (
                          <>
                            <button className="btn btn-outline-secondary border-0">
                              <EditIcon onClick={() => editAsset(ele.id)} />
                            </button>
                            <button className="btn btn-outline-danger border-0">
                              <HighlightOffIcon
                                onClick={() =>
                                  checkAssetAvailableToDisable(ele.id)
                                }
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

export default ManageAsset;
