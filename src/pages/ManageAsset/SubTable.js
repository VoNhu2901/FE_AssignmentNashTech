import React from "react";

const tableHead = [
  {
    id: "date",
    name: "Date",
  },
  {
    id: "assignedTo",
    name: "Assigned To",
  },
  {
    id: "assignedBy",
    name: "Assigned By",
    isDropdown: true,
  },
  {
    id: "returnedDate",
    name: "Returned Date",
  },
];

const SubTable = ({ history }) => {
  return (
    <div className="table-user-list">
      <table>
        <thead>
          <tr>
            {tableHead.map((item) => (
              <th className="border-bottom border-3" key={item.id}>
                {item.name}
                <button
                  className="btn border-0"
                // onClick={() => sortByCol(item.id)}
                >
                  {/* {item.isDropdown ? <ArrowDropDownIcon /> : <></>} */}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(history || []).map((ele) => (
            <>
              <tr>
                <td className="border-bottom">{ele.date}</td>
                <td className="border-bottom">{ele.assignedTo}</td>
                <td className="border-bottom">{ele.assignedBy}</td>
                <td className="border-bottom">{ele.returnedDate}</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubTable;
