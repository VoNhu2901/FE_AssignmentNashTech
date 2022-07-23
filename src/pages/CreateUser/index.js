import React, { Fragment, useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import './createUser.scss'
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import Toast from '../../components/Toast';

const CreateUser = () => {

  const navigate = useNavigate();

  const POST_USER_URL = "http://localhost:8080/api/users/register"
  const [firstname, setfirstName] = useState("")
  const [lastname, setlastName] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [gender, setGender] = useState("true")
  const [joinedDate, setJoinedDate] = useState("")
  const [role, setRole] = useState("")
  const [openLocation, setOpenLocation] = useState(true)
  const [location, setLocation] = useState("")
  const payload = { firstname, lastname, dateOfBirth, gender, joinedDate, role }

  function handleCreateNewUser() {
    console.log(payload)
    axios.post(POST_USER_URL, payload)
      .then(res => {
        if (res.status === 201) {
          Toast('success', 'Successfully added!!')
          navigate('/manage-user')
        }
      })
      .catch((error) =>{
        console.log(error)
        if (error.response.data.validationErrors){
          if(error.response.data.validationErrors.firstname && error.response.data.validationErrors.lastname){
            Toast('error','ERROR: ' + error.response.data.validationErrors.firstname);
            Toast('error','ERROR: ' + error.response.data.validationErrors.lastname);
          }
          else if(error.response.data.validationErrors.firstname){
            Toast('error','ERROR: ' + error.response.data.validationErrors.firstname);
          }
          else if(error.response.data.validationErrors.lastname){
            Toast('error','ERROR: ' + error.response.data.validationErrors.lastname);
          }
        }        
        else if(error.response.data){
          Toast('error','ERROR: ' + error.response.data.message);
        }
        else {
          Toast('error','Create User Fail!');
        }
      });
  }

  function handleCancel() {
    navigate('/manage-user')
  }

  const handleRole = (e)=>{
    const value = e.target.value
    setRole(value);
    if (value == 1){      
      setOpenLocation(true)
    }
    else if (value == 2){
      setOpenLocation(false)
    }   
  }

  return (
    <>
      <div className='form'>
        <div className='form__container'>
          <h2 className='form__title'>Create New User</h2>
          <div className="form__input-wrapper">

            <label for='firstName'>First Name</label>
            <input type="text" id="firstName" className="form__input" placeholder='First Name'
              value={firstname}
              onChange={(e) => setfirstName(e.target.value)}></input>

            <label for='lastName'>Last Name</label>
            <input type="text" id="lastName" className="form__input" placeholder='Last Name'
              value={lastname}
              onChange={(e) => setlastName(e.target.value)}></input>

            <label for='dateOfBirth'>Date Of Birth</label>
            <input type="date" id="dateOfbirth" className="form__input"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}></input>


            <label for='gender'>Gender</label>
            <div className='form__input--item' >
              <div>
                <input type="radio" id="male" name="fav_language" value="true"
                checked
                onClick={e => setGender(e.target.value)}></input>
                <label htmlFor="male">Male</label>
              </div>

              <div>
                <input type="radio" id="female" name="fav_language" value="false"
                onClick={e => setGender(e.target.value)}></input>
                <label htmlFor="female">Female</label>
              </div>
            </div>

            <label for='joinedDate'>Joinded Date</label>
            <input type="date" id="joinedDate" className="form__input"
              value={joinedDate}
              onChange={(e) => setJoinedDate(e.target.value)}></input>

            <label for='type'>Type</label>
            <select className="form__input" name="cars" id="cars"
              value={role}
              onChange={handleRole}
              >
              <option value={1}>ADMIN</option>
              <option value={2}>STAFF</option>
            </select>

            {openLocation &&
              <>
                <label for='type'>Location</label>
              <select className="form__input" name="cars" id="cars"
                value={location}
                onChange={(e) => setLocation(e.target.value)}>
                <option value={"HCM"}>Ho Chi Minh</option>
                <option value={"DN"}>Da Nang</option>
                <option value={"HN"}>Ha Noi</option>
              </select>
              </>
            }
          </div>

          <div className='form__button-wrapper'>
            <button id="save" className='form__button-item' onClick={handleCreateNewUser}>Save</button>
            <button id="cancel" className='form__button-item' onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
};

export default CreateUser;