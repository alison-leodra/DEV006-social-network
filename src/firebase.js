/* eslint-disable no-use-before-define */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  onAuthStateChanged,
  getAuth,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  onSnapshot,
  doc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

let currentUserName = ''; // Variable para almacenar el nombre del usuario actual
let currentUserImage = ''; // Variable para almacenar la imagen del usuario actual
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

// se guarda post con datos post, email, tiempo,nombreUsuario y foto de perfil.
export const savePost = (post) => {
  const userEmail = sessionStorage.getItem('userEmail');
  addDoc(collection(db, 'publish'), {
    post,
    userEmail,
    timestamp: serverTimestamp(),
    userName: currentUserName,
    userImage: currentUserImage,
    likes: [], // Agrega el campo 'likes' con valor predeterminado de 0
    comments: 0,
  });
};

// Obtener el nombre e imagen del usuario logeado
export const handleUserAuth = (post) => {
  // onAuthStateChanged se obtiene el usuario actual.
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('Datos del usuario:', user);
      currentUserName = user.displayName;
      currentUserImage = user.photoURL;
      sessionStorage.setItem('userEmail', user.email);
      if (typeof post !== 'undefined') {
        savePost(post);
      }
    } else {
      // coloca foto por deafult.
      currentUserImage = './img/avatarDefault(1).png';
      savePost(post);
    }
  });
};

// obtiene los post de la coleccion "publish".
export const getPost = () => getDocs(collection(db, 'publish'));

// ordena las publicaiones.
export const onGetPost = (callback) => {
  const q = query(collection(db, 'publish'), orderBy('timestamp', 'desc'));
  return onSnapshot(q, callback);
};

// BORRAR POST
export const deleteDocFirebase = (postId) => {
  const docRef = doc(db, 'publish', postId);
  return deleteDoc(docRef);
};

export const refDocLiked = (postID) => {
  const refDoc = doc(db, 'publish', postID);
  return refDoc;
};

export const currentUser = () => {
  const UserLoged = auth.currentUser;
  return UserLoged;
};
export const likesArray = async (postDocRef) => {
  const post = await getDoc(postDocRef);
  const likes = post.data().likes;
  return likes;
};

export const incrementLike = (postDocRef, userLike) => {
  updateDoc(postDocRef, { // sacar esta
    likes: arrayUnion(userLike), // sacar esta
  });
};

export const decrementLike = (postDocRef, userLike) => {
  updateDoc(postDocRef, { // sacar esta
    likes: arrayRemove(userLike), // sacar esta
  });
};

export const updateFirebaseDocument = (postId, postValue) => {
  const docRef = doc(db, 'publish', postId);
  return updateDoc(docRef, {
    post: postValue,
    timestamp: serverTimestamp(),
  });
};
