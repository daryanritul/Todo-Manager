import React from 'react';
import Todo from '../Todo/Todo';

import sty from './TodoLists.module.css';

const TodoLists = ({ title, data }) => {
  const todos = data ? data.data : [];
  return (
    <div className={sty.todoList}>
      <div className={sty.listHead}>
        <div className={sty.title}>{title}</div>
        <div className={sty.title}>{todos.length}</div>
      </div>
      {todos && (
        <div className={sty.listBody}>
          {todos.map((todo, index) => (
            <Todo key={index} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoLists;
