import { auth } from '../firebase.js';

import { sendPasswordResetEmail } from 'firebase/auth';
const recovery = (navigateTo) => {
  const template = `
  <div class="recovery">
      <header>
      <div class="imgLogo">
        <img src="./img/logo2.png" alt="logo">
      </div>
    </header>

    <main>
      <div class="container">
        <form id="logInForm">
        <h3>Ingresa tu correo</h3>
          <input type="email" id="recoveryInput" class="formControl" placeholder="email@correo.com" required>
          <p class="emailError"></p>
          <button type="button" class="forgotButton">recuperar contraseña</button>
          <button type="button" class="returnLogIn">Volver al inicio</button>
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

  // document.addEventListener('DOMContentLoaded', () => {
  //   const returnLogIn = document.querySelector('.returnLogIn');
  //   returnLogIn.addEventListener('click', async () => {
  //     navigateTo('/');
  //   })
  // });


  const resetPassword = element.querySelector('.forgotButton');
  const mailField = element.querySelector('#recoveryInput');
  const returnLogIn = document.querySelector('.returnLogIn');
    

  resetPassword.addEventListener('click', async () => {
    const emailError = document.querySelector('.emailError');
    const email = mailField.value;
    if (email !== "") {
      try {
        const result = await sendPasswordResetEmail(auth, email);
        emailError.style.display = 'block';
        emailError.textContent = '¡El correo electrónico se ha restablecido correctamente!'
        resetPassword.style.display = 'none';
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('IngreseEmail')
      emailError.style.display = 'block';
      emailError.textContent = 'Debe ingresar un email válido'
    }

  });

  



  // Retorna el elemento del DOM creado a partir de la plantilla
  return element.firstChild;
};

export default recovery;
