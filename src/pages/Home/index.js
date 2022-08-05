import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import IconEyeClose from "../../components/icon/IconEyeClose";
import IconEyeOpen from './../../components/icon/IconEyeOpen';
import staffService from "./../../api/staffService";
import moment from "moment";
import "./home.scss";
import {
  ArrowDropDownIcon,
  CloseIcon,
  CheckIcon,
  ReplayIcon,
  ClearIcon
} from "../../components/icon";
import { Loading } from "notiflix";


const HomePage = () => {
  const rowPerPage = 15;
  const [isNew, setIsNew] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);
  const [data, setData] = useState([]);
  const [numPage, setNumPage] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let status = localStorage.getItem("status");
    if (status === "NEW") {
      setIsNew(true);
    }
  }, []);

  const loadData = () => {
    Loading.standard("Loading...");
    staffService.getListAssignments()
      .then((res) => {
        const resData = res.data;
        if (resData.length === 0) {
          toast.error("No assignment found!");
        }
        setData(resData);
        setNumPage(Math.ceil(resData.length / rowPerPage));
        Loading.remove();
      }).catch((err) => {
        Loading.remove();
        console.log(err);
        toast.error("No assignment found");
      });

  }
  useEffect(() => {
    loadData();
  }, []);

  const tableHeader = [
    {
      id: "assetCode",
      name: "Asset Code",
      isDropdown: true,
    },
    {
      id: "assetName",
      name: "Asset Name",
      isDropdown: true,
    },
    {
      id: "specification",
      name: "Specification",
      isDropdown: true,
    },
    {
      id: "assignTo",
      name: "Assigned To",
      isDropdown: true,
    },
    {
      id: "assignBy",
      name: "Assigned By",
      isDropdown: true,
    },
    {
      id: "assignedDate",
      name: "Assigned Date",
      isDropdown: true,
    },
    {
      id: "state",
      name: "State",
      isDropdown: true,
    },

  ];

  const handleSavePassword = () => {
    if (newPassword) {
      // send to backend test
      const userId = localStorage.getItem("userId");

      axios({
        headers: {
          "content-type": "application/json",
        },
        url: `https://backend05.azurewebsites.net/api/auth/user/${userId}/${newPassword}`,
        method: "PUT",
      })
        .then(() => {
          setIsNew(false);
          localStorage.removeItem("status");
          toast.success("Change Password success!!!");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Can change password");
        });
    } else {
      toast.error("New Password not Empty.");
    }
  };

  return (
    <>
      {/* change password for first login */}
      <div
        className={"modal fade " + (isNew ? " show d-block" : " d-none")}
        tabIndex="-1"
        role="dialog"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-danger">Change Password</h5>
            </div>
            <div class="modal-body">
              <div className="text">
                <h6>
                  This is a first time you logged in. <br /> You have to change
                  password to continue.
                </h6>
              </div>
              <div className="change-password">
                <label htmlFor="pass" className="pe-1">
                  New Password
                </label>
                <input
                  type={togglePassword ? "text" : "password"}
                  id="pass"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                {!togglePassword ? (
                  <IconEyeClose
                    className="icon-eye"
                    onClick={() => setTogglePassword(true)}
                  ></IconEyeClose>
                ) : (
                  <IconEyeOpen
                    className="icon-eye"
                    onClick={() => setTogglePassword(false)}
                  ></IconEyeOpen>
                )}
              </div>
              <div className="button-save">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleSavePassword}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table list */}
      <div className="table-assignments">
        <div className="title">
          <h3>My Assignment</h3>
        </div>
        <table>
          <thead>
            <tr>
              {tableHeader.map((item) => (
                <th className="border-bottom border-3" key={item.id}>
                  {item.name}
                  <button
                    className="btn border-0"
                  >
                    {item.isDropdown ? <ArrowDropDownIcon /> : <></>}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(
              data.slice((page - 1) * rowPerPage, page * rowPerPage) || []
            ).map((ele, index) => {
              return (
                <>
                  <tr key={ele.id}>
                    <td
                      className="border-bottom"
                      data-bs-toggle="modal"
                      data-bs-target={"#detailAssignmentModal" + ele.id}
                    >
                      {ele.assetCode}
                    </td>
                    <td
                      className="border-bottom"
                      data-bs-toggle="modal"
                      data-bs-target={"#detailAssignmentModal" + ele.id}
                    >
                      {ele.assetName}
                    </td>
                    <td
                      className="border-bottom"
                      data-bs-toggle="modal"
                      data-bs-target={"#detailAssignmentModal" + ele.id}
                    >
                      {ele.specification}
                    </td>
                    <td
                      className="border-bottom"
                      data-bs-toggle="modal"
                      data-bs-target={"#detailAssignmentModal" + ele.id}
                    >
                      {ele.assignTo}
                    </td>
                    <td
                      className="border-bottom"
                      data-bs-toggle="modal"
                      data-bs-target={"#detailAssignmentModal" + ele.id}
                    >
                      {ele.assignBy}
                    </td>
                    <td
                      className="border-bottom"
                      data-bs-toggle="modal"
                      data-bs-target={"#detailAssignmentModal" + ele.id}
                    >
                      {moment(ele.assignedDate).format("L")}
                    </td>
                    <td
                      className="border-bottom"
                      data-bs-toggle="modal"
                      data-bs-target={"#detailAssignmentModal" + ele.id}
                    >
                      {ele.state}
                    </td>
                    <td className="btn btn-outline-danger border-0">
                      {ele.state === "Waiting for acceptance" ? (
                        <> <CheckIcon /> </>
                      ) : (
                        <> <CheckIcon disabled={true} /> </>
                      )}
                    </td>
                    <td className="btn btn-outline-danger border-0">
                      {ele.state === "Waiting for acceptance" ? (
                        <> <ClearIcon className="btnClear"/> </>
                      ) : (
                        <> <ClearIcon className="btnClear" disabled={true} /> </>
                      )}
                    </td>
                    <td className="btn btn-outline-danger border-0">
                      <ReplayIcon 
                      className="btnReload"
                      onClick={loadData}/>
                    </td>
                  </tr>

                  <div
                    className="modal fade"
                    id={"detailAssignmentModal" + ele.id}
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered modal-md">
                      <div className="modal-content ">
                        <div className="modal-header">
                          <h5
                            className="modal-title text-danger"
                            id="exampleModalLabel"
                          >
                            Detailed Assignment Information
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
                              <div className="value">{ele.assetCode}</div>
                            </div>
                            <div className="detail-item">
                              <div className="label">Asset Name</div>
                              <div className="value">{ele.assetName}</div>
                            </div>
                            <div className="detail-item">
                              <div className="label">Specification</div>
                              <div className="value">{ele.specification}</div>
                            </div>
                            <div className="detail-item">
                              <div className="label">Assigned To</div>
                              <div className="value">{ele.assignTo}</div>
                            </div>
                            <div className="detail-item">
                              <div className="label">Assigned By</div>
                              <div className="value">{ele.assignBy}</div>
                            </div>
                            <div className="detail-item">
                              <div className="label">Assigned Date</div>
                              <div className="value">{moment(ele.assignedDate).format("L")}</div>
                            </div>
                            <div className="detail-item">
                              <div className="label">State</div>
                              <div className="value">{ele.state}</div>
                            </div>
                            <div className="detail-item">
                              <div className="label">Note</div>
                              <div className="value">{ele.note}</div>
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
    </>
  );
};

export default HomePage;
