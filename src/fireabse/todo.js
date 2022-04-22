import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore/lite';

import {
  ADD_TODO_COMPLETED,
  ADD_TODO_OVERDUE,
  ADD_TODO_PROGRESS,
  ADD_TODO_PENDING,
  SET_IS_LOADING,
} from '../UserContext/actions.type';
import { addActivity } from './activity';
import { db } from './config';

export const addTodo = async (data) => {
  const {
    uid,
    workSpaceId,
    title,
    id,
    description,
    status,
    dueDate,
    dispatch,
  } = data;

  dispatch({ type: SET_IS_LOADING, payload: true });

  if (id == null) {
    await addDoc(
      collection(db, 'users', uid, 'workspaces', workSpaceId, 'todos'),
      {
        title,
        description,
        dueDate,
        status,
        createdAt: Timestamp.now(),
        workSpaceId,
      }
    ).then(() => {
      getTodos({ uid, workSpaceId, dispatch, status: 'pending' });
      getTodos({ uid, workSpaceId, dispatch, status: 'overdue' });

      dispatch({ type: SET_IS_LOADING, payload: false });
      addActivity({
        uid,
        workSpaceId,
        title,
        messsage: `Added`,
        dispatch,
      });
    });
  } else {
    const todoRef = doc(
      db,
      'users',
      uid,
      'workspaces',
      workSpaceId,
      'todos',
      id
    );
    updateDoc(todoRef, {
      title,
      description,
      dueDate,
      createdAt: Timestamp.now(),
    }).then(() => {
      dispatch({ type: SET_IS_LOADING, payload: false });
      getTodos({ uid, workSpaceId, dispatch, status });
      getTodos({ uid, workSpaceId, dispatch, status: 'overdue' });
      addActivity({
        uid,
        workSpaceId,
        title,
        messsage: `Updated`,
        dispatch,
      });
    });
  }
};

export const updateStatus = async ({
  uid,
  workSpaceId,
  id,
  dispatch,
  newStatus,
  prevStatus,
  title,
}) => {
  if (newStatus !== prevStatus) {
    dispatch({ type: SET_IS_LOADING, payload: true });
    const todoRef = doc(
      db,
      'users',
      uid,
      'workspaces',
      workSpaceId,
      'todos',
      id
    );
    updateDoc(todoRef, {
      status: newStatus,
      createdAt: Timestamp.now(),
    }).then(() => {
      dispatch({ type: SET_IS_LOADING, payload: false });
      getTodos({ uid, workSpaceId, dispatch, status: newStatus });
      getTodos({ uid, workSpaceId, dispatch, status: prevStatus });
      addActivity({
        uid,
        workSpaceId,
        title,
        messsage: `Move to ${newStatus}`,
        dispatch,
      });
    });
  }
};

export const getTodos = async ({ uid, workSpaceId, dispatch, status }) => {
  let todos = null;
  if (status == 'overdue') {
    todos = query(
      collection(db, 'users', uid, 'workspaces', workSpaceId, 'todos'),
      where('dueDate', '<', Timestamp.now().toMillis()),
      orderBy('dueDate'),
      orderBy('createdAt')
    );
  } else if (status == 'completed') {
    todos = query(
      collection(db, 'users', uid, 'workspaces', workSpaceId, 'todos'),
      where('status', '==', 'completed'),
      orderBy('createdAt')
    );
  } else {
    todos = query(
      collection(db, 'users', uid, 'workspaces', workSpaceId, 'todos'),
      where('status', '==', status),
      where('dueDate', '>', Timestamp.now().toMillis()),
      orderBy('dueDate'),
      orderBy('createdAt')
    );
  }

  const querySnapshot = await getDocs(todos);
  const temptodos = [];
  querySnapshot.forEach((doc) => {
    temptodos.push({ ...doc.data(), id: doc.id });
  });

  switch (status) {
    case 'pending':
      dispatch({ type: ADD_TODO_PENDING, payload: temptodos });

      break;
    case 'progress':
      dispatch({ type: ADD_TODO_PROGRESS, payload: temptodos });

      break;
    case 'completed':
      dispatch({ type: ADD_TODO_COMPLETED, payload: temptodos });

      break;
    case 'overdue':
      dispatch({ type: ADD_TODO_OVERDUE, payload: temptodos });

      break;
    default:
      break;
  }
};

export const deleteTodo = async ({
  uid,
  workSpaceId,
  id,
  dispatch,
  status,
  title,
}) => {
  dispatch({ type: SET_IS_LOADING, payload: true });
  const todoRef = doc(db, 'users', uid, 'workspaces', workSpaceId, 'todos', id);
  deleteDoc(todoRef).then(() => {
    dispatch({ type: SET_IS_LOADING, payload: false });
    getTodos({ uid, workSpaceId, dispatch, status });
    getTodos({ uid, workSpaceId, dispatch, status: 'overdue' });
    addActivity({
      uid,
      workSpaceId,
      title,
      messsage: `Deleted`,
      dispatch,
    });
  });
};
