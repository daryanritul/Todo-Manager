import React, { useState } from 'react';
import Activity from '../Activity/Activity';
import ProgressBar from '../ProgressBar/ProgressBar';
import TodoLists from '../TodoLists/TodoLists';
import TodoModal from '../TodoModal/TodoModal';

import sty from './Body.module.css';

const Body = () => {
  const [toogleTodo, setToogleTodo] = useState(false);

  const setToggle = status => {
    setToogleTodo(status);
  };

  return (
    <div className={sty.body}>
      <div className={sty.todos}>
        <div className={sty.todoHead}>
          <span>
            <p className={sty.workTitle}>My Workspace-01</p>
            <div className={sty.newTodo} onClick={() => setToggle(true)}>
              add new todo
            </div>
          </span>
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
      {toogleTodo && <TodoModal todo={false} setToggle={setToggle} />}
    </div>
  );
};

export default Body;
