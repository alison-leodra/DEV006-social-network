import { savePost } from '../firebase.js';


function autoResize() {
  const textarea = document.getElementById("myTextarea");
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}

const home = (navegateTo) => {
  const template = `
  <div class="home">
  <header>
  <div class="imgLogo">
    <img src="./img/logo2.png" alt="logo">
  </div>
</header>
  <main>
  <div class="container">
  <form id="postForm">
    <img src="./img/avatarDefault(1).png" alt="profile photo">
    <p class="userName"></p>
    <textarea id="myTextarea" class="post" placeholder="Escribe aquí..."></textarea>
    <p class="postError"></p>
    <button type="button" class="publish">publicar</button>
    </form>
  </div>
</main>
</div>
`;
const element = document.createElement('div');
element.innerHTML = template.trim();

document.addEventListener('DOMContentLoaded', () => {
  const publish = document.querySelector(".publish");
  const textarea = document.getElementById("myTextarea");

  publish.addEventListener("click", async (e) => {
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
  
  textarea.addEventListener("input", autoResize);
});

return element.firstChild;
};

export default home;