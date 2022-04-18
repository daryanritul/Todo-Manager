import React from 'react';
import Activity from '../Activity/Activity';
import ProgressBar from '../ProgressBar/ProgressBar';
import TodoLists from '../TodoLists/TodoLists';

import sty from './Body.module.css';
const Body = () => {
  return (
    <div className={sty.body}>
      <div className={sty.todos}>
        <div className={sty.todoHead}>
          <p className={sty.workTitle}>My Workspace-01</p>
          <ProgressBar percentage={'40%'} />
        </div>
        <div className={sty.todoBody}>
          <TodoLists title="Pending" />
          <TodoLists title="In Progress" />
          <TodoLists title="Completed" />
          <TodoLists title="Overdue" />
        </div>
      </div>
      <div className={sty.activity}>
        <Activity />
      </div>
    </div>
  );
};

export default Body;
