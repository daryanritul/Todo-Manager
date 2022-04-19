import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore/lite';
import {
  SET_ACTIVE_WORKSPACE,
  SET_ACTIVITY,
  SET_IS_LOADING,
} from '../UserContext/actions.type';
import { db } from './config';

export const addActivity = async ({
  uid,
  workSpaceId,
  title,
  messsage,
  dispatch,
}) => {
  dispatch({ type: SET_IS_LOADING, payload: true });

  await addDoc(
    collection(db, 'users', uid, 'workspaces', workSpaceId, 'activity'),
    {
      title,
      actionDate: Timestamp.now(),
      workSpaceId,
      messsage,
    }
  ).then(() => {
    console.log('ACtivity added');
    dispatch({ type: SET_IS_LOADING, payload: false });
    getActivity({ uid, workSpaceId, dispatch });
  });
};

export const getActivity = async ({ uid, workSpaceId, dispatch }) => {
  const activity = query(
    collection(db, 'users', uid, 'workspaces', workSpaceId, 'activity'),
    orderBy('actionDate', 'desc')
  );

  const querySnapshot = await getDocs(activity);
  const tempactivity = [];
  querySnapshot.forEach((doc) => {
    tempactivity.push({ ...doc.data(), id: doc.id });
  });
  console.log('tempactivity', tempactivity);

  dispatch({ type: SET_ACTIVITY, payload: tempactivity });
};
