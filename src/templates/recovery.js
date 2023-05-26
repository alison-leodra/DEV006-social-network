import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase.js';

const recovery = (navigateTo) => {
  const element = document.createElement('div');
  const recoveryContainer = document.createElement('div');
  recoveryContainer.classList.add('recovery');

  const templateHeader = `
    <header>
      <div class="imgLogo">
        <img src="./img/logo2.png" alt="logo">
      </div>
    </header>
  `;

  recoveryContainer.innerHTML = templateHeader;

  const main = document.createElement('main');
  main.classList.add('container');

  const container = document.createElement('div');

  const form = document.createElement('form');
  form.setAttribute('id', 'logInForm');

  const heading = document.createElement('h3');

  const emailInput = document.createElement('input');
  emailInput.setAttribute('id', 'recoveryInput');
  emailInput.setAttribute('type', 'email');
  emailInput.classList.add('formControl');
  emailInput.setAttribute('placeholder', 'email@correo.com');
  emailInput.setAttribute('required', 'true');

  const emailError = document.createElement('p');
  emailError.classList.add('emailError');

  const forgotButton = document.createElement('button');
  forgotButton.setAttribute('type', 'button');
  forgotButton.classList.add('forgotButton');
  forgotButton.textContent = 'recuperar contraseña';

  const returnLink = document.createElement('a');
  returnLink.setAttribute('href', '#');
  returnLink.classList.add('returnLogIn');
  returnLink.textContent = 'Volver al inicio';

  form.appendChild(heading);
  form.appendChild(emailInput);
  form.appendChild(emailError);
  form.appendChild(forgotButton);
  form.appendChild(returnLink);
  container.appendChild(form);
  main.appendChild(container);

  const returnLogIn = returnLink;
  returnLogIn.addEventListener('click', async () => {
    navigateTo('./');
  });

  const resetPassword = forgotButton;
  const mailField = emailInput;

  resetPassword.addEventListener('click', async () => {
    const email = mailField.value;
    if (email !== '') {
      try {
        const result = await sendPasswordResetEmail(auth, email);
        emailError.style.display = 'block';
        emailError.textContent = '¡El correo electrónico se ha restablecido correctamente!';
        resetPassword.style.display = 'none';
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('IngreseEmail');
      emailError.style.display = 'block';
      emailError.textContent = 'Debe ingresar un email válido';
    }
  });

  element.appendChild(recoveryContainer);
  element.appendChild(main);

  // Retorna el elemento del DOM creado a partir de la plantilla
  return element;
};

export default recovery;
