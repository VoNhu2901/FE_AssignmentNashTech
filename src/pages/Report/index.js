import React from "react";
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
    notAvailable: "0",
    waiting: "0",
    recycled: "0",
  },
  {
    category: "Category 2",
    total: "100",
    assigned: "450",
    available: "350",
    notAvailable: "0",
    waiting: "0",
    recycled: "0",
  },
];

const Report = () => {
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
                    // onClick={() => sortByCol(item.id)}
                  >
                    {item.isDropdown ? <ArrowDropDownIcon /> : <></>}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(tableBody || []).map((ele, index) => {
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
