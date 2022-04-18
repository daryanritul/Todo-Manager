import React, { useContext, useEffect } from 'react';

import s from './Home.module.css';

import Body from '../../Components/Body/Body';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { userContext } from '../../UserContext/store';
import { getWorkspace } from '../../fireabse/workspace';

const Home = () => {
  const { state, dispatch } = useContext(userContext);

  useEffect(() => {
    if (state.user.uid) {
      getWorkspace(state.user.uid, dispatch);
    }
  }, [state.user.uid]);

  console.log('worsk', state.workspace);

  return (
    <div className={s.home}>
      <div className={s.head}>
        <Header />
      </div>
      <div className={s.body}>
        <div className={s.sidebar}>
          <Sidebar />
        </div>
        <div className={s.mainbody}>
          <Body />
        </div>
      </div>
    </div>
  );
};

export default Home;
