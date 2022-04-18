import React from 'react';

import sty from './Activity.module.css';

const dummyActtivity = [
  {
    todoTitle: 'Hooks',
    type: 'created',
    actionDate: Date.now(),
  },
];

const Activity = () => {
  return (
    <div className={sty.act}>
      <p className={sty.title}>My Activity</p>
      {dummyActtivity.map((activity, index) => (
        <div className={sty.actItem} key={index}>
          <div className={sty.dot}></div>
          <span>
            <p className={sty.actTitle}>
              {activity.todoTitle} {activity.type}
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
