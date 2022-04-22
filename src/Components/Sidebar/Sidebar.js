import React, { useState, useContext } from 'react';
import { addWorkspace } from '../../fireabse/workspace';
import { SET_ACTIVE_WORKSPACE } from '../../UserContext/actions.type';
import { userContext } from '../../UserContext/store';
import sty from './Sidebar.module.css';

import Delete from '../../Assets/Delete.svg';

const Sidebar = () => {
  const { state, dispatch } = useContext(userContext);
  const [cnfDelete, setCnfDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState('My ToDos'); //defaul selected Item is Always ONE
  const [item, setItem] = useState({
    value: '',
    status: false,
  });

  const deleteSpaceHandler = () => {
    console.log('Workspace 01');
    setCnfDelete(false);
  };

  return (
    <>
      {cnfDelete && (
        <div className={sty.confirm}>
          <p>Deleting a workspace delete all Todos and Progress</p>
          <span>
            <button onClick={() => deleteSpaceHandler()}>Confrim Delete</button>
            <button onClick={() => setCnfDelete(false)}>Cancel Delete</button>
          </span>
        </div>
      )}
      <div className={sty.sidebar}>
        <p className={sty.title}>My Workspaces</p>
        <div className={sty.worklist}>
          {state.workspace.map(([index, workspace]) => (
            <div
              key={index}
              className={`${sty.workitem} ${
                workspace === selectedItem ? sty.active : ''
              }`}
              onClick={() => {
                setSelectedItem(workspace);
                dispatch({
                  type: SET_ACTIVE_WORKSPACE,
                  payload: [index, workspace],
                });
              }}
            >
              {workspace}
              {workspace === selectedItem && (
                <span className={sty.icons} onClick={() => setCnfDelete(true)}>
                  <img src={Delete} />
                </span>
              )}
            </div>
          ))}
        </div>
        <div className={sty.buttonBox}>
          {!item.status ? (
            <button
              className={sty.button}
              onClick={() => {
                setItem({
                  ...item,
                  status: true,
                });
              }}
            >
              Add new Workspace
            </button>
          ) : (
            <input
              type={'text'}
              className={`${sty.button} ${sty.input}`}
              onChange={event =>
                setItem({
                  ...item,
                  value: event.target.value,
                })
              }
              value={item.value}
              placeholder={'Enter Workspace Name'}
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  if (item.value !== '') {
                    addWorkspace(item.value, state.user.uid, dispatch);
                  }
                  setItem({
                    value: '',
                    status: false,
                  });
                }
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
