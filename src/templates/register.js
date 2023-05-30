import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase.js';

const register = (navigateTo) => {
  const template = `
    <div class="registroOption">
      <header>
        <div class="imgLogo">
          <img src="/assets/img/logo2.png" alt="logo">
        </div>
      </header>

      <main>
        <div class="container">
          <form id="signInFormFirst">
            <button type="button" class="signInFormEmail">Registrarse con correo</button>
            <img src="/assets/img/btn_google_signin_dark_normal_web.png" alt="google btn" id="googleBtn" class="signInFormGoogle">
          </form>
        </div>
      </main>

      <footer>
        <img src="/assets/img/Sin título-4.png" alt="footer">
      </footer>
    </div>
  `;
  const element = document.createElement('div');
  element.innerHTML = template.trim();

  // Obtiene el botón "Registrarse" por su clase
  const signInFormEmail = element.querySelector('.signInFormEmail');

  // Agrega el evento "click" al botón "Registrarse"
  signInFormEmail.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/registerEmail');
  });

  const signInFormGoogle = element.querySelector('.signInFormGoogle');
  // Agrega el evento "click" al botón "Registrarse"
  signInFormGoogle.addEventListener('click', async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    try {
      const credentials = await signInWithPopup(auth, provider);
      console.log(credentials);
      navigateTo('/home');
    } catch (error) {
      console.log(error);
    }
  });

  // Retorna el elemento del DOM creado a partir de la plantilla
  return element.firstChild;
};
export default register;
