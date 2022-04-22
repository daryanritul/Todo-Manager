import React, { useContext, useEffect, useState } from 'react';
import Activity from '../Activity/Activity';
import ProgressBar from '../ProgressBar/ProgressBar';
import TodoLists from '../TodoLists/TodoLists';
import TodoModal from '../TodoModal/TodoModal';
import { userContext } from '../../UserContext/store';

import sty from './Body.module.css';
import { getTodos } from '../../fireabse/todo';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getActivity } from '../../fireabse/activity';

const Body = () => {
  const { state, dispatch } = useContext(userContext);
  const [toogleTodo, setToogleTodo] = useState(false);

  const setToggle = status => {
    setToogleTodo(status);
  };

  useEffect(() => {
    if (state.user.uid && state.activeWorkspace) {
      getTodos({
        uid: state.user.uid,
        workSpaceId: state.activeWorkspace[0],
        dispatch,
        status: 'pending',
      });
      getTodos({
        uid: state.user.uid,
        workSpaceId: state.activeWorkspace[0],
        dispatch,
        status: 'progress',
      });
      getTodos({
        uid: state.user.uid,
        workSpaceId: state.activeWorkspace[0],
        dispatch,
        status: 'completed',
      });
      getTodos({
        uid: state.user.uid,
        workSpaceId: state.activeWorkspace[0],
        dispatch,
        status: 'overdue',
      });

      getActivity({
        uid: state.user.uid,
        workSpaceId: state.activeWorkspace[0],
        dispatch,
      });
    }
  }, [state.user.uid, state.activeWorkspace]);

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
          <ProgressBar
            percentage={`${
              (state.todos.completed?.length /
                (state.todos.pending?.length +
                  state.todos.completed?.length +
                  state.todos.overdue?.length +
                  state.todos.progress?.length)) *
              100
            }%`}
          />
        </div>
        <DndProvider backend={HTML5Backend}>
          <div className={sty.todoBody}>
            <TodoLists title="Pending" data={state.todos.pending} dnd />
            <TodoLists title="In Progress" data={state.todos.progress} dnd />
            <TodoLists title="Completed" data={state.todos.completed} dnd />
            <TodoLists title="Overdue" data={state.todos.overdue} />
          </div>
        </DndProvider>
      </div>
      <div className={sty.activity}>
        <Activity />
      </div>
      {toogleTodo && <TodoModal todo={false} setToggle={setToggle} />}
    </div>
  );
};

export default Body;
