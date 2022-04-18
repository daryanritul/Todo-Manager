import React from 'react';
import Todo from '../Todo/Todo';

import sty from './TodoLists.module.css';

const TodoLists = ({ title }) => {
  const dummyTodo = [
    {
      title: 'Create Wireframe',
      uid: '1',
      description:
        'Ipsum amet consectetur occaecat ad consectetur consectetur et ad nulla',
      status: 'pending',
      createdAt: Date.now(),
      dueDate: '2022-01-01',
    },
    {
      title: 'Create Wireframe',
      description: '',
      uid: '2',
      status: 'overdue',
      createdAt: Date.now(),
      dueDate: '2022-04-06',
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
