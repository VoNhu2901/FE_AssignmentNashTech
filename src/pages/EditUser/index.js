import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userService from "../../api/userService";
import { useParams } from "react-router-dom";
import "./style.scss";
import { Loading } from "notiflix/build/notiflix-loading-aio";


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

  const [validateDOB, setValidateDOB] = useState("");
  const [validateJD, setValidateJD] = useState("");

  // refactor code

  useEffect(() => {
    let _location = localStorage.getItem("location");
    setLocation(_location);
  }, []);

  // get data
  useEffect(() => {
    Loading.standard("Loading...");

    userService
      .getUserByStaffCode(staffCode)
      .then((res) => {
        const [data] = [...res.data];
        console.log(data);
        const isMale = data.gender === "Male";
        const isAdmin = data.role === "ADMIN" ? 1 : 2;

        setFirstName(data.firstName);
        setLastName(data.lastName);
        setDateOfBirth(data.dateOfBirth);
        setGender(isMale);
        setJoinedDate(data.joinedDate);
        setRole(isAdmin);
        setLocation(data.location);

        Loading.remove();
      })
      .catch((error) => {
        Loading.remove();
        console.log(error);
      });
  }, []);

  const handleEditUser = () => {
    if (dateOfBirth && joinedDate && role) {
      const payload = {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        joinedDate,
        role,
        location,
      };

      console.log(payload);

      Loading.hourglass("Editing asset...");

      userService
        .editUser(staffCode, payload)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Successfully edit!!");
            localStorage.setItem("newUser", res.data.userId);
            navigate("/manage-user");
          Loading.remove();
          }
        })
        .catch((error) => {
          Loading.remove();
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
    // if (value === 1) {
    //   setOpenLocation(true);
    // } else if (value === 2) {
    //   setOpenLocation(false);
    // }
  };
  const calculateAge = (date, dob) => {
    let today = new Date(date);
    let dOB = new Date(dob);
    let age = today.getFullYear() - dOB.getFullYear();
    let m = today.getMonth() - dOB.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dOB.getDate())) {
      age = age - 1;
    }
    return age;
  };

  const handleCheckAgeUser = () => {
    const age = calculateAge(new Date(), dateOfBirth);
    if (age < 18) {
      setValidateDOB("User is under 18. Please select a different date");
    }
    if (age >= 65) {
      setValidateDOB("The user has reached the retirement age.");
    }
  };

  const handleCheckJoinedDateUser = () => {
    let date = new Date(joinedDate);
    if (date.getDay() === 6 || date.getDay() === 0) {
      setValidateJD(
        "Joined date is Saturday or Sunday. Please select a different date"
      );
    }

    if (calculateAge(joinedDate, dateOfBirth) <= 0) {
      setValidateJD(
        "Joined date is not later than Date of Birth. Please select a different date"
      );
    }
    if (calculateAge(joinedDate, dateOfBirth) < 16)
      setValidateJD(
        "User joins when under 18 years old. Please select a different date"
      );
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
            <div>
              <input
                type="date"
                id="dateOfBirth"
                className={
                  validateDOB
                    ? "form-create-user__input-error"
                    : "form-create-user__input"
                }
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                onBlur={handleCheckAgeUser}
                onFocus={() => setValidateDOB(null)}
              ></input>
              {validateDOB && <p className="text-danger fs-6">{validateDOB}</p>}
            </div>

            <label for="gender">Gender</label>
            <div className="form-edit-user-information__input--item">
              <div>
                <input
                  type="radio"
                  id="male"
                  name="fav_language"
                  checked={gender}
                  onClick={() => setGender(true)}
                ></input>
                <label htmlFor="male">Male</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="female"
                  name="fav_language"
                  checked={!gender}
                  onClick={() => setGender(false)}
                ></input>
                <label htmlFor="female">Female</label>
              </div>
            </div>

            <label for="joinedDate">Joined Date</label>
            <div>
              <input
                type="date"
                id="joinedDate"
                className={
                  validateJD
                    ? "form-create-user__input-error"
                    : "form-create-user__input"
                }
                value={joinedDate}
                onChange={(e) => setJoinedDate(e.target.value)}
                onBlur={handleCheckJoinedDateUser}
                onFocus={() => setValidateJD(null)}
              ></input>
              {validateJD && <p className="text-danger fs-6">{validateJD}</p>}
            </div>

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

            {/* {openLocation && (
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
            )} */}
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
                  gender !== null &&
                  !validateDOB &&
                  !validateJD
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
