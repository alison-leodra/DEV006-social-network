import { savePost, getPost, onGetPost } from '../firebase.js';

function autoResize() {
  const textareas = document.querySelectorAll("textarea");

  textareas.forEach((textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  });
}

// Llama a autoResize() una vez al cargar el documento para ajustar los textareas existentes
document.addEventListener("DOMContentLoaded", function () {
  autoResize();

  setInterval(autoResize, 100); // Ejecuta autoResize() periódicamente para ajustar nuevos textareas agregados dinámicamente
});


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

  const postContainer = document.createElement('div');
  postContainer.setAttribute('id', 'postContainer');

  form.append(img);
  form.append(pName);
  form.append(textarea);
  form.append(pError);
  form.append(publish);

  container.appendChild(form);
  container.appendChild(postContainer);
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
  
  // OBTENER POST DESDE FIRESTORE
    onGetPost((querySnapshot) => {
      console.log('query', querySnapshot);
  
      let html = '';
  
      querySnapshot.forEach(docs => {
        const postData = docs.data();
        console.log('docs', docs.data()); //transformar a un objeto de JS, ya no sera de Firebase
        html += `
      <div class="postUsersContainer">
        <textarea readOnly>${postData.post}</textarea>
      </div>
      `;
      });
  
      postContainer.innerHTML = html;
  
  });


  return element;
};

export default home;