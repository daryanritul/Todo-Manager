import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAAwwDLJVaWYJOFh-48Kjqpo0w_VNcBBsM',
  authDomain: 'todo-manager-7f5f0.firebaseapp.com',
  projectId: 'todo-manager-7f5f0',
  storageBucket: 'todo-manager-7f5f0.appspot.com',
  messagingSenderId: '791624646656',
  appId: '1:791624646656:web:25842d5334f5cf974bd8e5',
  measurementId: 'G-ZTS9E43KLL',
};

const fireApp = initializeApp(firebaseConfig);
export const db = getFirestore(fireApp);
export const auth = getAuth(fireApp);
