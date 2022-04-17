import React from 'react';

import s from './Auth.module.css';

const Auth = () => {
  return (
    <div className={s.auth}>
      <div className={`${s.content} card`}>
        <div className={s.logo}>
          ToDo<span> Manager</span>
        </div>
        <div className={s.subtext}>
          Sign In with Login Credential or Create New Account.
        </div>
      </div>
    </div>
  );
};

export default Auth;
