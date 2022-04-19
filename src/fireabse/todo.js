import {
  addDoc,
  collection,
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
  ADD_TODO_IN_PROGRESS,
  ADD_TODO_PENDING,
  SET_IS_LOADING,
} from '../UserContext/actions.type';
import { db } from './config';

export const addTodo = async data => {
  const {
    uid,
    activeWorkSpaceId,
    title,
    id,
    description,
    status,
    dueDate,
    dispatch,
  } = data;

  dispatch({ type: SET_IS_LOADING, payload: true });
  console.log('HEEE');
  let todoRef = null;
  if (id == null) {
    todoRef = await addDoc(
      collection(db, 'users', uid, 'workspaces', activeWorkSpaceId, 'todos'),
      {
        title,
        description,
        dueDate,
        status,
        createdAt: Timestamp.now(),
      }
    );

    updateDoc(todoRef, {
      id: todoRef.id,
    }).then(() => {
      console.log('Document Writtes with ID: ', todoRef.id);
      dispatch({ type: SET_IS_LOADING, payload: false });
    });
  } else {
    todoRef = doc(
      db,
      'users',
      uid,
      'workspaces',
      activeWorkSpaceId,
      'todos',
      id
    );
    updateDoc(todoRef, {
      title,
      description,
      dueDate,
      status,
      createdAt: Timestamp.now(),
    }).then(() => {
      console.log('Document UPDATE with ID: ', todoRef.id);
      dispatch({ type: SET_IS_LOADING, payload: false });
    });
  }
};

export const getTodoPending = async ({ uid, activeWorkSpaceId, dispatch }) => {
  const todos = query(
    collection(db, 'users', uid, 'workspaces', activeWorkSpaceId, 'todos'),
    where('status', '==', 'pending'),
    orderBy('createdAt')
  );

  const querySnapshot = await getDocs(todos);
  const temptodos = [];
  querySnapshot.forEach(doc => {
    temptodos.push(doc.data());
  });

  dispatch({ type: ADD_TODO_PENDING, payload: temptodos });
};
export const getTodoInProgress = async ({
  uid,
  activeWorkSpaceId,
  dispatch,
}) => {
  const todos = query(
    collection(db, 'users', uid, 'workspaces', activeWorkSpaceId, 'todos'),
    where('status', '==', 'inProgress'),
    orderBy('createdAt')
  );

  const querySnapshot = await getDocs(todos);
  const temptodos = [];
  querySnapshot.forEach(doc => {
    temptodos.push(doc.data());
  });

  dispatch({ type: ADD_TODO_IN_PROGRESS, payload: temptodos });
};
export const getTodoCompleted = async ({
  uid,
  activeWorkSpaceId,
  dispatch,
}) => {
  const todos = query(
    collection(db, 'users', uid, 'workspaces', activeWorkSpaceId, 'todos'),
    where('status', '==', 'isCompleted'),
    orderBy('createdAt')
  );

  const querySnapshot = await getDocs(todos);
  const temptodos = [];
  querySnapshot.forEach(doc => {
    temptodos.push(doc.data());
  });

  dispatch({ type: ADD_TODO_COMPLETED, payload: temptodos });
};
export const getTodoOverdue = async ({ uid, activeWorkSpaceId, dispatch }) => {
  const todos = query(
    collection(db, 'users', uid, 'workspaces', activeWorkSpaceId, 'todos'),
    where('status', '==', 'overdue'),
    orderBy('createdAt')
  );

  const querySnapshot = await getDocs(todos);
  const temptodos = [];
  querySnapshot.forEach(doc => {
    temptodos.push(doc.data());
  });

  dispatch({ type: ADD_TODO_OVERDUE, payload: temptodos });
};
