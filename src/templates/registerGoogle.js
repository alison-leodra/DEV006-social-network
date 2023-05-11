import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../firebase.js';
import { async } from "regenerator-runtime";

//const googleBtn = document.querySelector("#googleBtn");
//googleBtn.addEventListener('click', async(e) => { 
//e.preventDefault();
//const provider = new GoogleAuthProvider ();
//try {
//   const credentials = await signInWithPopup(auth, provider)
//   console.log(credentials)
//}
// catch(error) {
//    console.log(error)
// }
//})



//export default googleBtn;