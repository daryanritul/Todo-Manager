import React, { useState, useContext } from 'react';
import { addWorkspace } from '../../fireabse/workspace';
import { userContext } from '../../UserContext/store';
import sty from './Sidebar.module.css';

const Sidebar = () => {
  const { state, dispatch } = useContext(userContext);
  const [dummy, setDummy] = useState(['My ToDos']);
  const [selectedItem, setSelectedItem] = useState('My ToDos'); //defaul selected Item is Always ONE
  const [item, setItem] = useState({
    value: '',
    status: false,
  });

  /* 
TODO:

 replace Dummy data and Import Workspace list from firebase
  Push New Workspace to Firebase
  Check State for input and Selected Item are OK or NOT, 
  use uuid indead of key in list of workspace
*/

  return (
    <div className={sty.sidebar}>
      <p className={sty.title}>My Workspaces</p>
      <div className={sty.worklist}>
        {state.workspace.map(([index, workspace]) => (
          <div
            key={index}
            className={`${sty.workitem} ${
              workspace === selectedItem ? sty.active : ''
            }`}
            onClick={() => setSelectedItem(workspace)}
          >
            {workspace}
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
            onChange={(event) =>
              setItem({
                ...item,
                value: event.target.value,
              })
            }
            value={item.value}
            placeholder={'Enter Workspace Name'}
            onKeyDown={(event) => {
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
  );
};

export default Sidebar;
