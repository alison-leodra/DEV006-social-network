import { signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../firebase.js';
import error from './error.js';

const login = (navigateTo) => {
  const template = `
  <div class="login">
      <header>
      <div class="imgLogo">
        <img src="./img/logo2.png" alt="logo">
        <h2 class="tittle">Encuentra a tus compañeros de juego perfectos</h2>
      </div>
    </header>

    <main>
      <div class="container">
        <form id="logInForm">
          <input type="email" id="logInEmail" class="formControl" placeholder="email@correo.com" required>
          <p class="emailError"></p>
          <input type="password" id="logInPassword" class="formControl" placeholder="contraseña" required>
          <p class="passwordError"></p>
          <div>
            <button type="button" class="logInbtn">Inciar con correo</button>
            <button type="button" class="logInGoogle">Inciar con Google</button>
            <p>
              <a href="#" class="forgotBtn">¿Olvidaste tu contraseña?</a>
            </p>
            
          </div>
        </form>
      </div>
    </main>

    <footer>
      <img src="./img/Sin título-4.png" alt="footer">
        <a href="" class="signUpButton registerHome">¿Aún no tienes cuenta? Registrate aquí</a>
    </footer>
    </div>
  `;

  const element = document.createElement('div');
  element.innerHTML = template.trim();

  // Obtiene el botón "Registrarse" por su clase
  const signUpButton = element.querySelector('.signUpButton');

  // Agrega el evento "click" al botón "Registrarse"
  signUpButton.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/register');
  });

    const forgotBtn = element.querySelector('.forgotBtn');
    forgotBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('/recovery');
    });

  document.addEventListener('DOMContentLoaded', () => {
    // Call the home function here
    const logInbtn = document.querySelector(".logInbtn");
    logInbtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = document.querySelector('#logInEmail').value;
      const password = document.querySelector('#logInPassword').value;
      const passwordError = document.querySelector('.passwordError');
      const emailError = document.querySelector('.emailError');

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredential);
        navigateTo('/home');

      } catch (error) {
        console.log(error.message);
        console.log(error.code);

        if (error.code === 'auth/invalid-email') {
          emailError.style.display = 'block';
          passwordError.style.display = 'none';
          emailError.textContent = 'El correo electrónico ingresado no es válido.';
        } else if (error.code === 'auth/user-not-found') {
          emailError.style.display = 'block';
          passwordError.style.display = 'none';
          emailError.textContent = 'El correo electrónico ingresado no ha sido encontrado';
        } else if (error.code === 'auth/wrong-password') {
          passwordError.style.display = 'block';
          emailError.style.display = 'none';
          passwordError.textContent = 'La contraseña es incorrecta';
        } else if (error.code === 'auth/missing-password') {
          passwordError.style.display = 'block';
          emailError.style.display = 'none';
          passwordError.textContent = 'Debe ingresar una contraseña.';
        }
      }
    })
  });
  const signInFormGoogle = element.querySelector('.logInGoogle');
  // Agrega el evento "click" al botón "Registrarse"
  signInFormGoogle.addEventListener('click', async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    try {
      const credentials = await signInWithPopup(auth, provider);
      console.log(credentials);
      navigateTo('/home');
    }
    catch (error) {
      console.log(error);
    }
  });





  // Retorna el elemento del DOM creado a partir de la plantilla
  return element.firstChild;
};

export default login;
