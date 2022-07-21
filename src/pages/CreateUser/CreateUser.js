import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import './createUser.scss'

const CreateUser = () => {
  return (
    <>
      <div className='form'>
        <div className='form__container'>
          <h2 className='form__title'>Create New User</h2>
          <div className="form__input-wrapper">
            {/* <div className='form__input--item'> */}
            <label for='firstName'>First Name</label>
            <input type="text" id="firstName" className="form__input" placeholder='First Name'></input>
            {/* </div> */}

            {/* <div className='form__input--item'> */}
            <label for='lastName'>Last Name</label>
            <input type="text" id="lastName" className="form__input" placeholder='Last Name'></input>
            {/* </div> */}

            {/* <div className='form__input--item'> */}
            <label for='dateOfBirth'>Date Of Birth</label>
            <input type="date" id="dateOfbirth" className="form__input" ></input>
            {/* </div> */}

            <label for='gender'>Gender</label>
            <div className='form__input--item'>

              <div>
                <input type="radio" id="male" className="t" value="Male"></input>
                <label for="male">Male</label>
              </div>

              <div>
                <input type="radio" id="female" className="" value="Female"></input>
                <label for="female">Female</label>
              </div>
            </div>

            {/* <div className='form__input--item'> */}
            <label for='joinedDate'>Joinded Date</label>
            <input type="date" id="joinedDate" className="form__input"></input>
            {/* </div> */}

            {/* <div className='form__input--item'> */}
            <label for='type'>Type</label>
            {/* <input type="" id="type" className="form__input" placeholder='Tpye'></input> */}
            <select className="form__input" name="cars" id="cars">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            </select>
            {/* </div>           */}
          </div>

          <div className='form__button-wrapper'>
            <button id="save" className='form__button-item'>Save</button>
            <button id="cancel" className='form__button-item'>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateUser;