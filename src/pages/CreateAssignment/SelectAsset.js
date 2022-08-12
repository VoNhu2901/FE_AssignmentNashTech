import { Loading } from "notiflix/build/notiflix-loading-aio";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ArrowDropDownIcon, SearchIcon } from "../../components/icon";
import Paging from "../../components/paging";
import assignmentService from "./../../api/assignmentService";
import { Tooltip } from "antd";

const tableHead = [
  {
    id: "no",
    name: "",
    isDropdown: false,
  },
  {
    id: "id",
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
];

const SelectAsset = (props) => {
  const [assetList, setAssetList] = useState([]);
  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState(0);
  const rowPerPage = 10;

  const [currentCol, setCurrentCol] = useState("");
  const [content, setContent] = useState("");
  const [saveId, setSaveId] = useState("");

  const [isChoose, setIsChoose] = useState(false);

  const loadData = () => {
    Loading.standard("Loading...");

    assignmentService
      .getAllAssetsByAvailable()
      .then((res) => {
        const resData = res.data;
        if (resData.length === 0) {
          toast.error("Asset is not available");
        }

        let sorted = resData.sort((a, b) => a.name.localeCompare(b.name));

        const finalList = [...sorted];
        setAssetList(finalList); // get data to display (have change)
        setNumPage(Math.ceil(finalList.length / rowPerPage)); // get number of page

        Loading.remove();
      })
      .catch((err) => {
        Loading.remove();
        console.log(err);
        toast.info("No Asset Found");
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
      assignmentService
        .searchAssetByAvailable(content)
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
          setAssetList(finalList); // get data to display (have change)
          Loading.remove();
        })
        .catch((err) => {
          Loading.remove();
          toast.info(
            `No result match with ${content}. Try again with correct format`
          );
        });
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
    const _data = [...assetList];

    switch (col) {
      case "id":
        col === currentCol
          ? setAssetList(_data.sort((a, b) => a.id.localeCompare(b.id)))
          : setAssetList(_data.sort((a, b) => b.id.localeCompare(a.id)));
        break;
      case "assetname":
        col === currentCol
          ? setAssetList(_data.sort((a, b) => a.name.localeCompare(b.name)))
          : setAssetList(_data.sort((a, b) => b.name.localeCompare(a.name)));
        break;
      case "category":
        col === currentCol
          ? setAssetList(
              _data.sort((a, b) =>
                a.category.name.localeCompare(b.category.name)
              )
            )
          : setAssetList(
              _data.sort((a, b) =>
                b.category.name.localeCompare(a.category.name)
              )
            );
        break;
      default:
        break;
    }
  };

  const handleSelect = (id) => {
    setSaveId(id);
    setIsChoose(true);
    props.setAssetCode(id);
  };

  const handleSave = (id) => {
    props.setAssetCode(id);
    props.setAssetName(assetList.find((item) => item.id === id).name);
    props.setIsModalVisible(false);
  };

  const handleCancel = () => {
    props.setAssetCode(null);
    props.setIsModalVisible(false);
  };

  return (
    <>
      {/* <div className="container dropdown-menu p-3 border border-dark"> */}
      <div class="d-flex justify-content-between">
        <h4 className="form-create-asset__title">Select Asset</h4>
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
            id="btnSearch"
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
                    id={`sortBy${item.name}`}
                  >
                    {item.isDropdown ? <ArrowDropDownIcon /> : <></>}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(
              assetList.slice((page - 1) * rowPerPage, page * rowPerPage) || []
            ).map((ele) => {
              return (
                <>
                  <tr key={ele.id} onClick={() => handleSelect(ele.id)}>
                    <td>
                      <input
                        className="form-check-input"
                        type="radio"
                        id={ele.id}
                        name="state"
                        checked={ele.id === props.assetCode}
                      ></input>
                    </td>
                    <td className="border-bottom">{ele.id}</td>
                    <td className="border-bottom">
                      {ele.name.length > 20 ? (
                        <Tooltip placement="top" title={ele.name}>
                          {ele.name.substring(0, 20) + "..."}
                        </Tooltip>
                      ) : (
                        ele.name
                      )}
                    </td>
                    <td className="border-bottom">
                      {ele.category.name.length > 20 ? (
                        <Tooltip placement="top" title={ele.category.name}>
                          {ele.category.name.substring(0, 20) + "..."}
                        </Tooltip>
                      ) : (
                        ele.category.name
                      )}
                    </td>
                    <td className="border-bottom">{ele.id}</td>
                    <td className="border-bottom">
                      {ele.name.length > 20 ? (
                        <Tooltip placement="top" title={ele.name}>
                          {ele.name.substring(0, 20) + "..."}
                        </Tooltip>
                      ) : (
                        ele.name
                      )}
                    </td>
                    <td className="border-bottom">
                      {ele.category.name.length > 20 ? (
                        <Tooltip placement="top" title={ele.category.name}>
                          {ele.category.name.substring(0, 20) + "..."}
                        </Tooltip>
                      ) : (
                        ele.category.name
                      )}
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
            className={`form-create-asset__button-item btn btn-danger ${isChoose ? "" : "disabled"}`}
            id="btnSave"
            onClick={() => handleSave(saveId)}
          >
            Save
          </button>
          <button
            className="form-create-asset__button-item btn btn-light border-secondary"
            id="btnCancel"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
      {/* end Table list */}
      {/* </div> */}
    </>
  );
};

export default SelectAsset;
