import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase.js';
import error from './error.js';

const home = (navigateTo) => {
  const template = `
  <div class="home">
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
          <input type="password" id="logInPassword" class="formControl" placeholder="contraseña" required>
          <div>
            <button type="button" class="logInbtn">Inciar con correo</button>
            <button type="button" class="logInGoogle">Inciar con Google</button>
            <p>
              <a href="#" class="forgotButton">¿Olvidaste tu contraseña?</a>
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

  const logIn = document.querySelector('.logInbtn');
  logIn.addEventListener('click', () => {
    navigateTo('/register');
  });

  // const logInUser = document.querySelector(".logInbtn");
  // logInUser.addEventListener('click', async (e) => {
  //   e.preventDefault();
  //   const email = document.querySelector('#logInEmail').value;
  //   const password = document.querySelector('#logInPassword').value;

  //   try {
  //     const userCredential = await signInWithEmailAndPassword(auth, email, password);
  //     console.log(userCredential);
      
  //   } catch (error) {
  //     console.log(error.message);
  //     console.log(error.code);
  //   }
  // })



  // Retorna el elemento del DOM creado a partir de la plantilla
  return element.firstChild;
};

export default home;
