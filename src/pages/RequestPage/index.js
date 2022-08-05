import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import moment from "moment";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckIcon from "@mui/icons-material/Check";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import DateRangeIcon from "@mui/icons-material/DateRange";
import DatePicker from "react-datepicker";

import "./index.scss";
import "react-datepicker/dist/react-datepicker.css";
import returningService from "../../api/returningService";
import { toast } from "react-toastify";

const RequestPage = () => {
  const [filterByState, setFilterByState] = useState("ALL");
  const [filterByDate, setFilterByDate] = useState(null);
  const [searchContent, setSearchContent] = useState("");
  const [rawData, setRawData] = useState([]);
  const [requestList, setRequestList] = useState([]);
  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState(1);
  const [currentCol, setCurrentCol] = useState("");

  const initData = () => {
    const location = localStorage.getItem("location");
    returningService
      .getAllReturning(location)
      .then((res) => {
        const result = [...res.data];

        const filter = result.sort((a, b) => a.id - b.id);

        setRawData(filter);
      })
      .catch((error) => {
        console.log(error);
        toast.info("No request found. Try later");
      });
  };

  useEffect(() => {
    initData();
  }, []);

  const handleSearch = () => {
    const location = localStorage.getItem("location");
    returningService
      .searchReturning(location, searchContent)
      .then((res) => {
        const result = [...res.data];
        if (result.length !== 0) {
          const filter = result.sort((a, b) => a.id - b.id);

          setRawData(filter);
          setRequestList(filter);
          setPage(1);
          setNumPage(Math.ceil(filter.length / 20));
        } else {
          toast.info(
            "Not found. Try again with other text(Asset code, Name, Request User)"
          );
        }
      })
      .catch((err) => {
        console.log(err);
        toast.info("No Request for returning found");
      });
  };

  useEffect(() => {
    setPage(1);
    let list = [...rawData];
    if (filterByState !== "ALL" && filterByState !== null) {
      list = rawData.filter(
        (item) => item.state.localeCompare(filterByState) === 0
      );
    }

    if (filterByDate) {
      list = list.filter((item) => isEqual(filterByDate, item.returnDate));
    }

    setRequestList(list);
    setNumPage(Math.ceil(list.length / 20));
  }, [filterByState, filterByDate, rawData]);

  const isEqual = (date1, date2) => {
    const d1 = moment(date1).format("L");
    const d2 = moment(date2).format("L");
    return d1.localeCompare(d2) === 0;
  };

  const sortByCol = (col) => {
    const _data = [...requestList];
    switch (col) {
      case "No":
        col === currentCol
          ? setRequestList(_data.sort((a, b) => a.id - b.id))
          : setRequestList(_data.sort((a, b) => b.id - a.id));
        break;

      case "assetCode":
        col === currentCol
          ? setRequestList(
              _data.sort((a, b) => a.assetCode.localeCompare(b.assetCode))
            )
          : setRequestList(
              _data.sort((a, b) => b.assetCode.localeCompare(a.assetCode))
            );
        break;

      case "assetName":
        col === currentCol
          ? setRequestList(
              _data.sort((a, b) => a.assetName.localeCompare(b.assetName))
            )
          : setRequestList(
              _data.sort((a, b) => b.assetName.localeCompare(a.assetName))
            );
        break;

      case "requestedBy":
        col === currentCol
          ? setRequestList(
              _data.sort((a, b) => a.requestBy.localeCompare(b.requestBy))
            )
          : setRequestList(
              _data.sort((a, b) => b.requestBy.localeCompare(a.requestBy))
            );
        break;

      case "AssignedDate":
        col === currentCol
          ? setRequestList(
              _data.sort((a, b) => a.assignedDate.localeCompare(b.assignedDate))
            )
          : setRequestList(
              _data.sort((a, b) => b.assignedDate.localeCompare(a.assignedDate))
            );
        break;

      case "acceptedBy":
        col === currentCol
          ? setRequestList(
              _data.sort((a, b) => a.acceptedBy.localeCompare(b.acceptedBy))
            )
          : setRequestList(
              _data.sort((a, b) => b.acceptedBy.localeCompare(a.acceptedBy))
            );
        break;

      case "returnDate":
        col === currentCol
          ? setRequestList(
              _data.sort((a, b) =>
                moment(a.returnDate)
                  .format("L")
                  .localeCompare(moment(b.returnDate).format("L"))
              )
            )
          : setRequestList(
              _data.sort((a, b) =>
                moment(b.returnDate)
                  .format("L")
                  .localeCompare(moment(a.returnDate).format("L"))
              )
            );
        break;

      case "state":
        col === currentCol
          ? setRequestList(_data.sort((a, b) => a.state.localeCompare(b.state)))
          : setRequestList(
              _data.sort((a, b) => b.state.localeCompare(a.state))
            );
        break;

      default:
        break;
    }

    if (col === currentCol) {
      setCurrentCol("");
    } else {
      setCurrentCol(col);
    }
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

  return (
    <div className="request-page">
      <div className="title">
        <h3 className="text-danger">Request List</h3>
      </div>

      <div className="board">
        <div className="board-left">
          <div className="filterByState">
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
                      checked={filterByState === "ALL"}
                      onClick={() => setFilterByState("ALL")}
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
                      value="Completed"
                      id="typeAdmin"
                      checked={filterByState === "Completed"}
                      onClick={() => setFilterByState("Completed")}
                    />
                    <label className="form-check-label" htmlFor="typeAdmin">
                      Completed
                    </label>
                  </div>
                </li>
                <li>
                  <div>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="Waiting for returning"
                      id="typeStaff"
                      checked={filterByState === "Waiting for returning"}
                      onClick={() => setFilterByState("Waiting for returning")}
                    />
                    <label className="form-check-label" htmlFor="typeStaff">
                      Waiting for returning
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="filterByDate rounded">
            <div>
              <DatePicker
                selected={filterByDate}
                onChange={(date) => setFilterByDate(date)}
              />
            </div>
            <div className="iconDate border-start border-dark">
              <DateRangeIcon />
            </div>
          </div>
        </div>

        <div className="board-right">
          <div className="search">
            <div className="input">
              <input
                type="text"
                value={searchContent}
                onChange={(e) => setSearchContent(e.target.value)}
              />
            </div>
            <div>
              <button className="btn border-0" onClick={handleSearch}>
                <SearchIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="show-return w-100">
        <table className="w-100 returningList">
          <thead>
            <tr>
              <th className="border-bottom border-3">
                No.
                <button
                  className="btn border-0"
                  onClick={() => sortByCol("No")}
                >
                  <ArrowDropDownIcon />
                </button>
              </th>

              <th className="border-bottom border-3">
                Asset Code
                <button
                  className="btn border-0"
                  onClick={() => sortByCol("assetCode")}
                >
                  <ArrowDropDownIcon />
                </button>
              </th>

              <th className="border-bottom border-3">
                Asset Name
                <button
                  className="btn border-0"
                  onClick={() => sortByCol("assetName")}
                >
                  <ArrowDropDownIcon />
                </button>
              </th>
              <th className="border-bottom border-3">
                Requested By
                <button
                  className="btn border-0"
                  onClick={() => sortByCol("requestedBy")}
                >
                  <ArrowDropDownIcon />
                </button>
              </th>

              <th className="border-bottom border-3">
                Assigned Date
                <button
                  className="btn border-0"
                  onClick={() => sortByCol("AssignedDate")}
                >
                  <ArrowDropDownIcon />
                </button>
              </th>

              <th className="border-bottom border-3">
                Accepted By
                <button
                  className="btn border-0"
                  onClick={() => sortByCol("acceptedBy")}
                >
                  <ArrowDropDownIcon />
                </button>
              </th>

              <th className="border-bottom border-3">
                Returned Date
                <button
                  className="btn border-0"
                  onClick={() => sortByCol("returnDate")}
                >
                  <ArrowDropDownIcon />
                </button>
              </th>

              <th className="border-bottom border-3">
                State
                <button
                  className="btn border-0"
                  onClick={() => sortByCol("state")}
                >
                  <ArrowDropDownIcon />
                </button>
              </th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {(requestList.slice((page - 1) * 20, page * 20) || []).map(
              (requestItem) => (
                <>
                  <tr key={requestItem.id}>
                    <td className="border-bottom">{requestItem.id}</td>
                    <td className="border-bottom">{requestItem.assetCode}</td>
                    <td className="border-bottom">{requestItem.assetName}</td>
                    <td className="border-bottom">{requestItem.requestBy}</td>
                    <td className="border-bottom">
                      {moment(requestItem.assignedDate).format("L")}
                    </td>
                    <td className="border-bottom">{requestItem.acceptedBy}</td>
                    <td className="border-bottom">
                      {requestItem.returnDate
                        ? moment(requestItem.returnDate).format("L")
                        : ""}
                    </td>
                    <td className="border-bottom">{requestItem.state}</td>
                    <td>
                      <button
                        className="btn btn-outline-secondary border-0"
                        disabled={requestItem.state === "Completed"}
                      >
                        <CheckIcon />
                      </button>
                      <button className="btn btn-outline-danger border-0">
                        <CloseSharpIcon />
                      </button>{" "}
                    </td>
                  </tr>
                </>
              )
            )}
          </tbody>
        </table>
      </div>

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
    </div>
  );
};

export default RequestPage;
