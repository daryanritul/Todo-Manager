import React, { useState } from "react";
import Spinner from "../../Components/Spinner/Spinner";

import sty from "./Auth.module.css";

// TODO: Form Validations + States for Email password and Errors
// Function of Login and Create new Account
// IsLaoding  when submit form
// Clear and refresh errors when submit forms.
// Clear and refresh errors when submit forms.

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState({
    value: "",
    err: "",
  });
  const [password, setPassword] = useState({
    value: "",
    err: "",
  });

  const validateEmail = (em) => {
    return String(em)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const checkLogin = () => {
    if (!email.value) {
      setEmail({ ...email, err: "Email field cant be empty" });
      return;
    }

    if (!validateEmail(email.value)) {
      setEmail({ ...email, err: "Please Enter a vailed email address" });
    }

    if (password.value.length <= 8) {
      setPassword({ ...password, err: "Password length should be > 8" });
    }
  };
  const checkSignup = () => {
    if (!email.value) {
      setEmail({ ...email, err: "Email field cant be empty" });
      return;
    }

    if (!validateEmail(email.value)) {
      setEmail({ ...email, err: "Please Enter a vailed email address" });
    }

    if (password.value.length <= 8) {
      setPassword({ ...password, err: "Password length should be > 8" });
    }
  };

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
        <div>
          <div className={sty.input}>
            <div className={sty.inputlabel}>Email</div>
            <input
              type={"email"}
              onChange={(e) => {
                setEmail({
                  ...email,
                  value: e.target.value,
                  err: "",
                });
              }}
              placeholder={"Enter Email Address"}
              className={sty.inputField}
            />
            <div className={sty.error}>{email.err}</div>
          </div>
          <div className={sty.input}>
            <div className={sty.inputlabel}>Password</div>
            <input
              type={"password"}
              placeholder={"Enter Password"}
              className={sty.inputField}
              onChange={(e) => {
                setPassword({
                  ...password,
                  value: e.target.value,
                  err: "",
                });
              }}
            />
            <div className={sty.error}>{password.err}</div>
          </div>
          <div className={`${sty.error} ${sty.center}`}>
            Firebase Errors Here
          </div>
          <div className={sty.buttonBox}>
            <button className={sty.btn} onClick={checkLogin}>
              Login
            </button>
            <button className={sty.btn} onClick={checkSignup}>
              Create New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
