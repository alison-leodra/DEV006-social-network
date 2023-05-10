import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../firebase.js';

const signInFormGoogle = document.querySelector(".signInFormGoogle");
const registerGoogle = (navigateTo) => {
    const template = `
    <div>
      <header>
        <div >
         <p>hola</p>
        </div>
      </header>
  
      <main>
        
      </main>
    </div> `;

  
    const element = document.createElement('div');
    element.innerHTML = template.trim();
}
export default registerGoogle;