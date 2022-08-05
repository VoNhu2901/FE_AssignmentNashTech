import React, { useEffect, useState } from "react";
import { ArrowDropDownIcon } from "../../components/icon";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import reportService from "../../api/reportService";
import { toast } from "react-toastify";
import FileSaver from "file-saver";
import * as XLSX from "xlsx";

const tableHead = [
  {
    id: "category",
    name: "Category",
    isDropdown: true,
  },
  {
    id: "total",
    name: "Total",
    isDropdown: true,
  },
  {
    id: "assigned",
    name: "Assigned",
    isDropdown: true,
  },

  {
    id: "available",
    name: "Available",
    isDropdown: true,
  },
  {
    id: "notAvailable",
    name: "Not Available",
    isDropdown: true,
  },
  {
    id: "waiting",
    name: "Waiting for recycling",
    isDropdown: true,
  },
  {
    id: "recycled",
    name: "Recycled",
    isDropdown: true,
  },
];

const Report = () => {
  const [currentCol, setCurrentCol] = useState("");
  const [reportList, setReportList] = useState([]);

  const loadReportList = () => {
    Loading.standard("Loading...");
    reportService
      .getReportList()
      .then((res) => {
        setReportList(res.data);
        Loading.remove();
      })
      .catch((error) => {
        toast.error("ERROR SERVER");
        Loading.remove();
      });
  };

  const handleExportReport = () => {
    Loading.standard("Loading...");
    reportService
      .getExportReport()
      .then((res) => {
        console.log(res.data);
        toast.success("Export Success!");
        Loading.remove();
      })
      .catch((error) => {
        toast.error("ERROR SERVER");
        Loading.remove();
      });
  };

  const exportToXLSX = () => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const date = new Date();
    const fileName = `Report_AssetsByCategoryAndState-${date.toUTCString()}`;
    const ws = XLSX.utils.json_to_sheet(reportList);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  useEffect(() => {
    loadReportList();
  }, []);

  const sortByCol = (col) => {
    if (col === currentCol) {
      // if click same column
      setCurrentCol(""); // reset currentCol
    } else {
      // if click new column
      setCurrentCol(col); // set currentCol
    }
    const _data = [...reportList];

    switch (col) {
      case "category":
        col === currentCol
          ? setReportList(_data.sort((a, b) => a.name.localeCompare(b.name)))
          : setReportList(_data.sort((a, b) => b.name.localeCompare(a.name)));
        break;
      case "total":
        col === currentCol
          ? setReportList(_data.sort((a, b) => a.total - b.total))
          : setReportList(_data.sort((a, b) => b.total - a.total));
        break;
      case "assigned":
        col === currentCol
          ? setReportList(_data.sort((a, b) => a.assigned - b.assigned))
          : setReportList(_data.sort((a, b) => b.assigned - a.assigned));
        break;
      case "available":
        col === currentCol
          ? setReportList(_data.sort((a, b) => a.available - b.available))
          : setReportList(_data.sort((a, b) => b.available - a.available));
        break;
      case "notAvailable":
        col === currentCol
          ? setReportList(_data.sort((a, b) => a.notAvailable - b.notAvailable))
          : setReportList(
              _data.sort((a, b) => b.notAvailable - a.notAvailable)
            );
        break;
      case "waiting":
        col === currentCol
          ? setReportList(_data.sort((a, b) => a.waiting - b.waiting))
          : setReportList(_data.sort((a, b) => b.waiting - a.waiting));
        break;
      case "recycled":
        col === currentCol
          ? setReportList(_data.sort((a, b) => a.recycled - b.recycled))
          : setReportList(_data.sort((a, b) => b.recycled - a.recycled));
        break;
      default:
        break;
    }
  };

  return (
    <div className="user-list">
      <div className="title">
        <h3>Report</h3>
      </div>

      <div className="button d-flex justify-content-end mb-4">
        <button
          type="button"
          className="btn btn-danger"
          onClick={exportToXLSX}
        >
          Export
        </button>
      </div>

      {/* start Table list */}
      <div className="table-user-list">
        <table>
          <thead>
            <tr>
              {tableHead.map((item, index) => (
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
            {(reportList || []).map((ele, index) => {
              return (
                <>
                  <tr key={ele.index}>
                    <td className="border-bottom">{ele.name}</td>
                    <td className="border-bottom">{ele.total}</td>
                    <td className="border-bottom">{ele.assigned}</td>
                    <td className="border-bottom">{ele.available}</td>
                    <td className="border-bottom">{ele.notAvailable}</td>
                    <td className="border-bottom">{ele.waitingForRecycling}</td>
                    <td className="border-bottom">{ele.recycled}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* end Table list */}
    </div>
  );
};

export default Report;
