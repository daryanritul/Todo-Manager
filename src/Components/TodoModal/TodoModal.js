import React, { useContext, useState } from 'react';
import { addTodo } from '../../fireabse/todo';
import { userContext } from '../../UserContext/store';
import sty from './TodoModal.module.css';

const TodoModal = ({ todo, setToggle }) => {
  const { state, dispatch } = useContext(userContext);
  const [title, setTitle] = useState(todo ? todo.title : todo.title);
  const [description, setDescription] = useState(todo ? todo.description : '');
  const [dueDate, setDueDate] = useState(todo ? todo.dueDate : false);
  const submitHandler = () => {
    addTodo({
      uid: state.user.uid,
      title: title,
      id: todo ? todo.id : null,
      description: description,
      status: todo ? todo.status : 'pending',
      dueDate: dueDate ? dueDate : false,
      activeWorkSpaceId: state.activeWorkspace[0],
      dispatch,
    });
    setToggle(false);
  };

  return (
    <div className={sty.modal}>
      <div className={sty.content}>
        <div className={sty.inputBox}>
          <p className={sty.label}>Todo Title</p>
          <input
            value={title}
            onChange={event => setTitle(event.target.value)}
            placeholder="Enter Todo Titile Here"
            className={sty.title}
          />
        </div>
        <div className={sty.inputBox}>
          <p className={sty.label}>Todo Description</p>
          <textarea
            value={description}
            onChange={event => setDescription(event.target.value)}
            placeholder="Enter Todo Titile Here"
          />
        </div>
        <div className={sty.inputBox}>
          <p className={sty.label}>
            Due Date : {!dueDate ? 'No Due Date Added' : dueDate}
          </p>
          <div className={sty.dueDates}>
            {dueDate && (
              <input
                type="date"
                className={sty.date}
                value={dueDate}
                onChange={event => setDueDate(event.target.value)}
              />
            )}
            <button
              className={`${sty.noDate} ${dueDate ? 'active' : ''} `}
              onClick={() => setDueDate(!dueDate)}
            >
              {!dueDate ? 'Add' : 'No'} Due Date
            </button>
          </div>
        </div>
        <div className={sty.buttonBox}>
          <button className={sty.btn} onClick={() => submitHandler()}>
            {todo ? 'Update' : 'Create'} Todo
          </button>
          <button className={sty.btn} onClick={() => setToggle(false)}>
            Cancel & Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoModal;
