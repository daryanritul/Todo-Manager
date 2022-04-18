import React, { useState } from 'react';
import Spinner from '../../Components/Spinner/Spinner';

import sty from './Auth.module.css';

// TODO: Form Validations + States for Email password and Errors
// Function of Login and Create new Account
// IsLlaoding  when submit form
// Clear and refresh errors when submit formss.

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className={sty.auth}>
      <div className={`${sty.content} card`}>
        {isLoading && (
          <div className={sty.spinnerBox}>
            <Spinner />
          </div>
        )}
        <div className={sty.logo}>
          ToDo<span> Manager</span>
        </div>
        <div className={sty.subtext}>
          Sign In with Login Credential or Create New Account.
        </div>
        <form>
          <div className={sty.input}>
            <div className={sty.inputlabel}>Email</div>
            <input
              type={'email'}
              placeholder={'Enter Email Address'}
              className={sty.inputField}
            />
            <div className={sty.error}>Invalid email address!</div>
          </div>
          <div className={sty.input}>
            <div className={sty.inputlabel}>Password</div>
            <input
              type={'password'}
              placeholder={'Enter Password'}
              className={sty.inputField}
            />
            <div className={sty.error}>Password too Short</div>
          </div>
          <div className={`${sty.error} ${sty.center}`}>
            Firebase Errors Here
          </div>
          <div className={sty.buttonBox}>
            <button
              className={sty.btn}
              onClick={() => {
                setIsLoading(!isLoading);
              }}
            >
              Login
            </button>
            <button className={sty.btn}>Create New Account</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
