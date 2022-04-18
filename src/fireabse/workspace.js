import {
  collection,
  doc,
  setDoc,
  query,
  getDocs,
  orderBy,
  Timestamp,
} from 'firebase/firestore/lite';
import { SET_WORKSPACE, UPDATE_WORKSPACE } from '../UserContext/actions.type';
import { db } from './config';

export const addWorkspace = async (title, uid, dispatch) => {
  const newWorkSpaceRef = doc(collection(db, 'users', uid, 'workspaces'));

  await setDoc(newWorkSpaceRef, {
    title,
    timeStamp: Timestamp.now(),
  }).then(() => {
    dispatch({ type: UPDATE_WORKSPACE, payload: [newWorkSpaceRef.id, title] });
    console.log('DDDD', [newWorkSpaceRef.id, title]);
  });
};

export const getWorkspace = async (uid, dispatch) => {
  const workspaces = query(
    collection(db, 'users', uid, 'workspaces'),
    orderBy('timeStamp')
  );

  const querySnapshot = await getDocs(workspaces);
  const tempWorkspaces = [];
  querySnapshot.forEach((doc) => {
    tempWorkspaces.push([doc.id, doc.data().title]);
  });

  dispatch({ type: SET_WORKSPACE, payload: tempWorkspaces });
};
