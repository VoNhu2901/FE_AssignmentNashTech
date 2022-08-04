import React, { useEffect, useState } from "react";
import { ArrowDropDownIcon } from "../../components/icon";

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
const tableBody = [
  {
    category: "Category 1",
    total: "100",
    assigned: "50",
    available: "50",
    notAvailable: "1",
    waiting: "1",
    recycled: "1",
  },
  {
    category: "Category 2",
    total: "200",
    assigned: "450",
    available: "350",
    notAvailable: "2",
    waiting: "2",
    recycled: "2",
  },
];


const Report = () => {
  const [currentCol, setCurrentCol] = useState("");
  const [reportList, setReportList] = useState([]);

  useEffect(() => {
    setReportList(tableBody);
  } , []);

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
           ? setReportList(
               _data.sort((a, b) => a.category.localeCompare(b.category))
             )
           : setReportList(
               _data.sort((a, b) => b.category.localeCompare(a.category))
             );
         break;
       case "total":
         col === currentCol
           ? setReportList(_data.sort((a, b) => a.total.localeCompare(b.total)))
           : setReportList(
               _data.sort((a, b) => b.total.localeCompare(a.total))
             );
         break;
       case "assigned":
         col === currentCol
           ? setReportList(
               _data.sort((a, b) => a.assigned.localeCompare(b.assigned))
             )
           : setReportList(
               _data.sort((a, b) => b.assigned.localeCompare(a.assigned))
             );
         break;
       case "available":
         col === currentCol
           ? setReportList(
               _data.sort((a, b) => a.available.localeCompare(b.available))
             )
           : setReportList(
               _data.sort((a, b) => b.available.localeCompare(a.available))
             );
         break;
       case "notAvailable":
         col === currentCol
           ? setReportList(
               _data.sort((a, b) =>
                 a.notAvailable.localeCompare(b.notAvailable)
               )
             )
           : setReportList(
               _data.sort((a, b) =>
                 b.notAvailable.localeCompare(a.notAvailable)
               )
             );
         break;
       case "waiting":
         col === currentCol
           ? setReportList(
               _data.sort((a, b) => a.waiting.localeCompare(b.waiting))
             )
           : setReportList(
               _data.sort((a, b) => b.waiting.localeCompare(a.waiting))
             );
         break;
       case "recycled":
         col === currentCol
           ? setReportList(
               _data.sort((a, b) => a.recycled.localeCompare(b.recycled))
             )
           : setReportList(
               _data.sort((a, b) => b.recycled.localeCompare(a.recycled))
             );
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
        <button type="button" className="btn btn-danger">
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
                    <td className="border-bottom">{ele.category}</td>
                    <td className="border-bottom">{ele.total}</td>
                    <td className="border-bottom">{ele.assigned}</td>
                    <td className="border-bottom">{ele.available}</td>
                    <td className="border-bottom">{ele.notAvailable}</td>
                    <td className="border-bottom">{ele.waiting}</td>
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
