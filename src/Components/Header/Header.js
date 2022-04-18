import React from 'react';
import { fireSignOut } from '../../fireabse/auth';

import sty from './Header.module.css';

/*
TODO:
    Display Email from Firebase
    create Sign Out Function:
*/

const Header = () => {
  return (
    <div className={sty.header}>
      <div className={sty.logo}>
        ToDo<span> Manager</span>
      </div>
      <div className={sty.user}>
        <div className={sty.email}>daryanritul@gmail.com</div>
        <button className={sty.button} onClick={fireSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Header;
