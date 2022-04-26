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
  ADD_ALL_TODO,
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
  if (newStatus !== prevStatus || prevStatus === 'overdue') {
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
      if (prevStatus === 'completed') {
        getTodos({ uid, workSpaceId, dispatch, status: 'overdue' });
      }
      getTodos({ uid, workSpaceId, dispatch, status: prevStatus });
      getTodos({ uid, workSpaceId, dispatch, status: newStatus });
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

export const markeCompleted = async ({
  uid,
  workSpaceId,
  id,
  dispatch,
  prevStatus,
  title,
}) => {
  const todoRef = doc(db, 'users', uid, 'workspaces', workSpaceId, 'todos', id);
  updateDoc(todoRef, {
    status: 'completed',
    createdAt: Timestamp.now(),
  }).then(() => {
    getTodos({ uid, workSpaceId, dispatch, status: 'completed' });
    getTodos({ uid, workSpaceId, dispatch, status: 'overdue' });
    getTodos({ uid, workSpaceId, dispatch, status: prevStatus });

    addActivity({
      uid,
      workSpaceId,
      title,
      messsage: 'Marks as Completed',
      dispatch,
    });
  });
};

export const getTodos = async ({ uid, workSpaceId, dispatch, status }) => {
  let todos = null;
  if (status === 'overdue') {
    console.log('overdue Called');
    todos = query(
      collection(db, 'users', uid, 'workspaces', workSpaceId, 'todos'),
      where('dueDate', '<', Timestamp.now().toMillis()),
      orderBy('dueDate'),
      orderBy('createdAt')
    );
  } else if (status === 'completed') {
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
    if (status === 'overdue') {
      if (doc.data().status !== 'completed') {
        temptodos.push({ ...doc.data(), id: doc.id });
      }
    } else {
      temptodos.push({ ...doc.data(), id: doc.id });
    }
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
      console.log('overdue Called case', temptodos);
      dispatch({ type: ADD_TODO_OVERDUE, payload: temptodos });

      break;
    default:
      break;
  }
};

export const getAllTodos = async ({ uid, workSpaceId, dispatch }) => {
  let todos = null;
  const temptodos = { pending: [], progress: [], completed: [], overdue: [] };
  let querySnapshot;

  // for fetching overdue todo
  todos = query(
    collection(db, 'users', uid, 'workspaces', workSpaceId, 'todos'),
    where('dueDate', '<', Timestamp.now().toMillis()),
    orderBy('dueDate'),
    orderBy('createdAt')
  );
  querySnapshot = await getDocs(todos);
  querySnapshot.forEach((doc) => {
    if (doc.data().status !== 'completed') {
      temptodos.overdue.push({ ...doc.data(), id: doc.id });
    }
  });

  // for fetching completed todo
  todos = query(
    collection(db, 'users', uid, 'workspaces', workSpaceId, 'todos'),
    where('status', '==', 'completed'),
    orderBy('createdAt')
  );
  querySnapshot = await getDocs(todos);
  querySnapshot.forEach((doc) => {
    temptodos.completed.push({ ...doc.data(), id: doc.id });
  });

  // for fetching pending todo

  todos = query(
    collection(db, 'users', uid, 'workspaces', workSpaceId, 'todos'),
    where('status', '==', 'pending'),
    where('dueDate', '>', Timestamp.now().toMillis()),
    orderBy('dueDate'),
    orderBy('createdAt')
  );
  querySnapshot = await getDocs(todos);
  querySnapshot.forEach((doc) => {
    temptodos.pending.push({ ...doc.data(), id: doc.id });
  });
  // for fetching progress todo

  todos = query(
    collection(db, 'users', uid, 'workspaces', workSpaceId, 'todos'),
    where('status', '==', 'progress'),
    where('dueDate', '>', Timestamp.now().toMillis()),
    orderBy('dueDate'),
    orderBy('createdAt')
  );
  querySnapshot = await getDocs(todos);
  querySnapshot.forEach((doc) => {
    temptodos.progress.push({ ...doc.data(), id: doc.id });
  });

  dispatch({ type: ADD_ALL_TODO, payload: temptodos });
};

export const deleteTodo = async ({
  uid,
  workSpaceId,
  id,
  dispatch,
  status,
  title,
}) => {
  const todoRef = doc(db, 'users', uid, 'workspaces', workSpaceId, 'todos', id);
  deleteDoc(todoRef).then(() => {
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
