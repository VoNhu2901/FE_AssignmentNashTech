import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userService from "../../api/userService";
import { useParams } from 'react-router-dom';
import "./style.scss";

const EditUser = () => {
  const navigate = useNavigate();
  let { staffCode } = useParams();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState(null);
  const [joinedDate, setJoinedDate] = useState("");
  const [role, setRole] = useState("2");
  const [openLocation, setOpenLocation] = useState(false);
  const [location, setLocation] = useState("");

  const [error, setError] = useState()

  // refactor code

  useEffect(() => {
    let _location = localStorage.getItem("location");
    setLocation(_location);
  }, []);


// get data
  useEffect(()=>{
    userService
      .getUserByStaffCode(staffCode)
      .then((res) => {
            const [data] = [...res.data]
            
            setFirstName(data.firstName)
            setLastName(data.lastName)
            setDateOfBirth(data.dateOfBirth)
            setGender(data.gender)
            setJoinedDate(data.joinedDate)
            setRole(data.role)
            setLocation(data.location)
          })
          .catch((error) => {
            console.log(error);          
          });
  },[])

  // handle function
const handleDateOfBrith = (e) =>{
  const value = new Date(e.target.value);
  setError(value)
  setDateOfBirth(value)
  const date = new Date();
  console.log( typeof date.getFullYear())
}

  const handleEditUser = () => {
    if (dateOfBirth && joinedDate && role) {
      const payload = {
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        gender: gender === "Male",
        joinedDate: joinedDate,
        role: role === "ADMIN" ? 1: 2,
        location: location,
      };

      console.log(payload)

      userService.editUser(staffCode, payload)
      .then((res)=>{
        if (res.status === 200) {
          toast.success("Successfully edit!!");
          navigate("/manage-user");
        }
      })
      .catch((error)=>{
        console.log(error);
        toast.error("EDIT FAILED!!");
      });
    }

  };

  function handleCancel() {
    navigate("/manage-user");
  }

  const handleRole = (e) => {
    const value = e.target.value;
    setRole(parseInt(value));
    if (value === "1") {
      setOpenLocation(true);
    } else if (value === "2") {
      setOpenLocation(false);
    }
  };

  return (
    <>
      <div className="form-edit-user-information">
        <div className="form-edit-user-information__container">
          <h2 className="form-edit-user-information__title">Edit User</h2>
          <div className="form-edit-user-information__input-wrapper">
            <label for="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              className="form-edit-user-information__input"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}              
              disabled
            ></input>

            <label for="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              className="form-edit-user-information__input"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled
            ></input>

            <label for="dateOfBirth">Date Of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              className={"form-edit-user-information__input"}
              value={dateOfBirth}
              // onBlur={handleDateOfBrith}
              onChange={(e) => setDateOfBirth(e.target.value)}
              min="1950-01-01"
              max="2022-12-31"
            ></input>
            <label for="gender">Gender</label>
            <div className="form-edit-user-information__input--item">
              <div>
                <input
                  type="radio"
                  id="male"
                  name="fav_language"
                  checked={gender === "Male"}
                  onClick={() => setGender(true)}
                ></input>
                <label htmlFor="male">Male</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="female"
                  name="fav_language"
                  checked={gender === "Female"}
                  onClick={() => setGender(false)}
                ></input>
                <label htmlFor="female">Female</label>
              </div>
            </div>

            <label for="joinedDate">Joined Date</label>
            <input
              type="date"
              id="joinedDate"
              className="form-edit-user-information__input"
              value={joinedDate}
              onChange={(e) => setJoinedDate(e.target.value)}
              min="1950-01-01"
              max="2022-12-31"
            ></input>

            <label for="type">Type</label>
            <select
              className="form-edit-user-information__input"
              name="cars"
              id="cars"
              value={role}
              onChange={handleRole}
            >
              <option value={1} selected={role === 1}>
                ADMIN
              </option>
              <option value={2} selected={role === 2}>
                STAFF
              </option>
            </select>

            {openLocation && (
              <>
                <label for="type">Location</label>
                <select
                  className="form-edit-user-information__input"
                  name="cars"
                  id="cars"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value={"HCM"}>Ho Chi Minh</option>
                  <option value={"DN"}>Da Nang</option>
                  <option value={"HN"}>Ha Noi</option>
                </select>
              </>
            )}
          </div>

          <div className="form-edit-user-information__button-wrapper">
            <button
              id="save"
              className="form-edit-user-information__button-item"
              onClick={handleEditUser}
              disabled={
                !(                  
                  dateOfBirth &&
                  joinedDate &&
                  gender !== null
                )
              }
            >
              Save
            </button>

            <button
              id="cancel"
              className="form-edit-user-information__button-item"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUser;
