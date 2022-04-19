import React, { useContext, useState } from 'react';
import { useDrop } from 'react-dnd';
import { addTodo } from '../../fireabse/todo';
import { userContext } from '../../UserContext/store';
import Todo from '../Todo/Todo';

import sty from './TodoLists.module.css';

const TodoLists = ({ title, data }) => {
  const todos = data ? data : [];
  const { state, dispatch } = useContext(userContext);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['overdue', 'pending', 'inProgress', 'isCompleted'],
    drop: item => dropHandler(item),
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  }));
  const dropHandler = ({ todoTitle, id, description, dueDate, status }) => {
    console.log({
      uid: state.user.uid,
      title: todoTitle,
      id: id,
      description: description,
      status:
        title === 'Pending'
          ? 'pending'
          : title === 'Completed'
          ? 'isCompleted'
          : title === 'In Progress'
          ? 'inProgress'
          : 'overdue',
      dueDate: dueDate,
      activeWorkSpaceId: state.activeWorkspace[0], //TODO: activeWorkspace
      dispatch,
    });
  };
  return (
    <div className={sty.todoList}>
      <div className={sty.listHead}>
        <div className={sty.title}>{title}</div>
        <div className={sty.title}>{todos ? todos.length : 0}</div>
      </div>
      {todos && (
        <div className={sty.listBody} ref={drop}>
          {todos.map((todo, index) => (
            <Todo key={index} todo={todo} />
          ))}
          {isOver && <div className={sty.todoSkleton}></div>}
        </div>
      )}
    </div>
  );
};

export default TodoLists;
