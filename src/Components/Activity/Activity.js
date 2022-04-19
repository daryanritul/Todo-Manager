import React, { useContext } from 'react';
import { userContext } from '../../UserContext/store';

import sty from './Activity.module.css';

const dummyActtivity = [
  {
    title: 'Hooks',
    messsage: 'created',
    actionDate: Date.now(),
  },
];

const Activity = () => {
  const { state } = useContext(userContext);
  const { activity } = state;

  return (
    <div className={sty.act}>
      <p className={sty.title}>My Activity</p>
      {activity.map((activity, index) => (
        <div className={sty.actItem} key={index}>
          <div className={sty.dot}></div>
          <span>
            <p className={sty.actTitle}>
              {activity.title} {activity.messsage}
            </p>
            <div className={sty.actTime}>
              <p>{new Date(activity.actionDate * 1000).toLocaleTimeString()}</p>
              <p>{new Date(activity.actionDate).toLocaleDateString()}</p>
            </div>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Activity;
