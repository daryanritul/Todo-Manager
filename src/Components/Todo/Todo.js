import React from 'react';

import sty from './Todo.module.css';

import Delete from '../../Assets/Delete.svg';

const Todo = ({ todo }) => {
  var date = new Date(todo.dueDate);
  const dotColor =
    todo.status === 'pending'
      ? 'tomato'
      : todo.status === 'inprogress'
      ? 'yellow'
      : todo.status === 'completed'
      ? 'green'
      : 'red';
  return (
    <div className={sty.todo}>
      <div className={sty.todoHead}>
        <p className={sty.title}>{todo.title}</p>
        <div className={sty.icons}>
          <img src={Delete} />
        </div>
      </div>
      <p className={sty.desc}>{todo.description}</p>
      <div className={sty.todoFoot}>
        <div className={sty.status}>
          <div
            className={sty.statusDot}
            style={{
              backgroundColor: dotColor,
            }}
          ></div>
          <p className={sty.text}>{todo.status}</p>
        </div>
        <div className={sty.date}>
          Due{''}
          {date.getDate() +
            '/' +
            (date.getMonth() + 1) +
            '/' +
            date.getFullYear()}
        </div>
      </div>
    </div>
  );
};

export default Todo;
