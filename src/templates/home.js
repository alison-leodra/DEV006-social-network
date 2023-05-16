import { auth } from '../firebase.js';



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
    <button type="button" class="publish">publicar</button>
    </form>
  </div>
</main>
</div>
`;
  const user = auth.currentUser;
  const element = document.createElement('div');
  element.innerHTML = template.trim();



  document.addEventListener('DOMContentLoaded', () => {
    // Call the home function here
    const publish = document.querySelector(".publish");
    publish.addEventListener("click", (e) => {
      e.preventDefault
  
  
    });
  });

  return element.firstChild;
};

export default home;