// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, onSnapshot } from "firebase/firestore";
import { query, orderBy } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBCZiYFNyqm7Dmj1CHtA-QvWph7IpMmc8Y',
  authDomain: 'playmates-79c82.firebaseapp.com',
  projectId: 'playmates-79c82',
  storageBucket: 'playmates-79c82.appspot.com',
  messagingSenderId: '1010530380419',
  appId: '1:1010530380419:web:eca2efbfec7083dcea89b6',
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export const savePost = (post) => {
  addDoc(collection(db, 'publish'), {post})
}

export const getPost = () => getDocs(collection(db, 'publish'));

export const onGetPost = (callback) => {
  const q = query(collection(db, 'publish'), orderBy('post', 'asc'));
  return onSnapshot(q, callback);
};