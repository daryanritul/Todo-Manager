import React from 'react';
import Todo from '../Todo/Todo';

import sty from './TodoLists.module.css';

const TodoLists = ({ title }) => {
  const dummyTodo = [
    {
      title: 'Create Wireframe',
      description:
        'Ipsum amet consectetur occaecat ad consectetur consectetur et ad nulla',
      status: 'pending',
      createdAt: Date.now(),
      dueDate: Date.now(),
    },
    {
      title: 'Create Wireframe',
      description: 'P',
      status: 'overdue',
      createdAt: Date.now(),
      dueDate: Date.now(),
    },
  ];
  return (
    <div className={sty.todoList}>
      <div className={sty.listHead}>
        <div className={sty.title}>{title}</div>
        <div className={sty.title}>10</div>
      </div>
      <div className={sty.listBody}>
        {dummyTodo.map((todo, index) => (
          <Todo key={index} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default TodoLists;
