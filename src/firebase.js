// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { onAuthStateChanged } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, onSnapshot } from "firebase/firestore";
import { query, orderBy, serverTimestamp } from "firebase/firestore";

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

// Obtener el nombre e imagen del usuario logeado
export const handleUserAuth = (post) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('Datos del usuario:', user);
      currentUserName = user.displayName;
      currentUserImage = user.photoURL;


      // Guardar el correo electrónico del usuario en sessionStorage
      sessionStorage.setItem('userEmail', user.email);

      // Verificar si 'post' está definido antes de llamar a 'savePost'
      if (typeof post !== 'undefined') {
        savePost(post);
      } 
    } else {
      currentUserImage = './img/avatarDefault(1).png';
      savePost(post);
    }
  });
};








export const savePost = (post) => {
  let userEmail = sessionStorage.getItem('userEmail');
  addDoc(collection(db, 'publish'), {
    post,
    userEmail,
    timestamp: serverTimestamp(),
    userName: currentUserName,
    userImage: currentUserImage
  });
};


export const getPost = () => getDocs(collection(db, 'publish'));

export const onGetPost = (callback) => {
  const q = query(collection(db, 'publish'), orderBy('timestamp', 'desc'));
  return onSnapshot(q, callback);
};


