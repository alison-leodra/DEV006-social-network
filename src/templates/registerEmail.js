import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.js';

const registerEmail = (navigateTo) => {
  const template = `
  <div class="registerEmail">
    <header>
      <div class="imgLogo">
        <img src="./img/logo2.png" alt="logo">
      </div>
    </header>

    <main>
      <div class="container">
        <form id="signUpFormEmail">
          <input type="email" id="signUpEmail" class="formControl" placeholder="email@correo.com" required>
          <p class="emailError"></p>
          <input type="password" id="signUpPassword" class="formControl" placeholder="contraseña" required>
          <p class="passwordError"></p>
          <button type="button" class="registerUser">Registrarse</button>
        </form>
      </div>
    </main>
  </div>
  `;

  const element = document.createElement('div');
  element.innerHTML = template.trim();

  // Obtiene el botón "Registrarse" por su clase
  const registerUser = element.querySelector('.registerUser');

  registerUser.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.querySelector('#signUpEmail').value;
    const password = document.querySelector('#signUpPassword').value;
    const passwordError = document.querySelector('.passwordError');
    const emailError = document.querySelector('.emailError');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredential);

      passwordError.style.display = 'none';
      emailError.style.display = 'none';

      navigateTo('/userRegister');

      // si se crea el usuario correctamente, no hay errores que mostrar
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        emailError.style.display = 'block';
        emailError.textContent = 'El correo electrónico ingresado no es válido.';
        passwordError.style.display = 'none';
      } else if (error.code === 'auth/email-already-in-use') {
        emailError.style.display = 'block';
        emailError.textContent = 'El correo electrónico ingresado ya está en uso.';
        passwordError.style.display = 'none';
      } else if (error.code === 'auth/weak-password') {
        passwordError.style.display = 'block';
        passwordError.textContent = 'La contraseña debe tener al menos 6 caracteres.';
        emailError.style.display = 'none';
      } else if (error.code === 'auth/missing-password') {
        passwordError.style.display = 'block';
        passwordError.textContent = 'Debe ingresar una contraseña.';
        emailError.style.display = 'none';
      }
    }
  });

  // Retorna el elemento del DOM creado a partir de la plantilla
  return element.firstChild;
};

export default registerEmail;
