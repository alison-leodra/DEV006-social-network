import { savePost } from '../firebase.js';


function autoResize() {
  const textarea = document.getElementById("myTextarea");
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}

const home = (navegateTo) => {

const element = document.createElement('div');

const homeContainer = document.createElement('div');
homeContainer.classList.add('home');

const templateHeader = `
    <header>
    <div class="imgLogo">
      <img src="./img/logo2.png" alt="logo">
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

homeContainer.innerHTML = templateHeader;

const main = document.createElement('main');
const container = document.createElement('div');
container.classList.add('container');

const form = document.createElement('form');
form.setAttribute('id', 'postForm');

const img = document.createElement('img');
img.setAttribute('src', './img/avatarDefault(1).png');
img.setAttribute('alt', 'profile photo')

const pName = document.createElement('p');
pName.classList.add('userName');

const textarea = document.createElement('textarea');
textarea.setAttribute('id', 'myTextarea');
textarea.classList.add('post');
textarea.setAttribute('placeholder', 'Escribe aquí...');

const pError = document.createElement('p');
pError.classList.add('postError');

const publish = document.createElement('button');
publish.classList.add('publish');
publish.innerText = 'Publicar';

form.append(img);
form.append(pName);
form.append(textarea);
form.append(pError);
form.append(publish);

container.appendChild(form);
main.appendChild(container);

homeContainer.append(main);
element.append(homeContainer);

  publish.addEventListener("click", (e) => {
    e.preventDefault();
    const post = textarea.value;
    const postError = document.querySelector('.postError');

    if (post === '') {
      postError.style.display = 'block';
      postError.textContent = 'Debes ingresar un mensaje.';
    } else {
      savePost(post);
      textarea.value = '';
      postError.style.display = 'none';
    }
  });

  // Retorna el elemento del DOM creado a partir de la plantilla
  return element.firstChild;
};

export default home;