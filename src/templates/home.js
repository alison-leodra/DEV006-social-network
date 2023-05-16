import { savePost } from '../firebase.js';


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
    <input class="post" type="text">
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
    publish.addEventListener("click", async (e) => {
      e.preventDefault
      const post = document.querySelector('.post');
      const postError = document.querySelector('.postError');

      if (post.value === '') {
        postError.style.display = 'block';
        postError.textContent = 'Debe ingresar un mensaje.';
      } else { 
        savePost(post.value);
        post.value = '';
        postError.style.display = 'none';
      }


    });
  });

  return element.firstChild;
};

export default home;