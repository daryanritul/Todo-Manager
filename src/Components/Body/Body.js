import React, { useContext, useEffect, useState } from 'react';
import Activity from '../Activity/Activity';
import ProgressBar from '../ProgressBar/ProgressBar';
import TodoLists from '../TodoLists/TodoLists';
import TodoModal from '../TodoModal/TodoModal';
import { userContext } from '../../UserContext/store';

import sty from './Body.module.css';
import {
  getTodoInProgress,
  getTodoPending,
  getTodoOverdue,
  getTodoCompleted,
} from '../../fireabse/todo';

const Body = () => {
  const { state, dispatch } = useContext(userContext);
  const [toogleTodo, setToogleTodo] = useState(false);

  const setToggle = status => {
    setToogleTodo(status);
  };

  useEffect(() => {
    if (state.user.uid && state.activeWorkspace) {
      getTodoPending({
        uid: state.user.uid,
        activeWorkSpaceId: state.activeWorkspace[0],
        dispatch,
      });
      getTodoCompleted({
        uid: state.user.uid,
        activeWorkSpaceId: state.activeWorkspace[0],
        dispatch,
      });
      getTodoInProgress({
        uid: state.user.uid,
        activeWorkSpaceId: state.activeWorkspace[0],
        dispatch,
      });
      getTodoOverdue({
        uid: state.user.uid,
        activeWorkSpaceId: state.activeWorkspace[0],
        dispatch,
      });
    }
  }, [state.user.uid, state.activeWorkspace]);
  console.log(state.todos);
  return (
    <div className={sty.body}>
      <div className={sty.todos}>
        <div className={sty.todoHead}>
          <span>
            <p className={sty.workTitle}>
              {state.activeWorkspace ? state.activeWorkspace[1] : ''}
            </p>
            <div className={sty.newTodo} onClick={() => setToggle(true)}>
              add new todo
            </div>
          </span>
          <ProgressBar percentage={'40%'} />
        </div>
        <div className={sty.todoBody}>
          <TodoLists title="Pending" data={state.todos.pending} />
          <TodoLists title="In Progress" data={state.todos.inProgress} />
          <TodoLists title="Completed" data={state.todos.isCompletd} />
          <TodoLists title="Overdue" data={state.todos.overdue} />
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
