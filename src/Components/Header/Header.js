import React, { useContext } from 'react';
import { fireSignOut } from '../../fireabse/auth';
import { userContext } from '../../UserContext/store';

import sty from './Header.module.css';

const Header = () => {
  const { state } = useContext(userContext);
  return (
    <div className={sty.header}>
      <div className={sty.logo}>
        ToDo<span> Manager</span>
      </div>
      <div className={sty.user}>
        <div className={sty.email}>{state.user.email}</div>
        <button className={sty.button} onClick={fireSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Header;
