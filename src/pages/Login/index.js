import React from 'react';
import './login.scss';

const index = () => {
  return (
    <div className='form'>
      <div className="form__container">
        <div>
          <img
            src={process.env.PUBLIC_URL + "/assets/logo.jpg"}
            alt="logo"
            className="form__logo"
          />
        </div>
        <div className="form__input-wrapper">
          <input type="text" id="username" className="form__input" placeholder='username'/>
          <input type="password" id="password" className="form__input" placeholder='password'/>
        </div>

        <div className="form__button-wrapper">
          <button className="form__button">Login</button>
        </div>
      </div>
    </div>
  );
};

export default index;