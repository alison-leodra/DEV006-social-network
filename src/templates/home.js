import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { savePost, handleUserAuth, onGetPost } from '../firebase.js';
import { auth } from '../firebase.js';
let currentUserName = ''; // Variable para almacenar el nombre del usuario actual
let currentUserImage = ''; // Variable para almacenar la imagen del usuario actual


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
  const element = document.createElement("div");

  const homeContainer = document.createElement("div");
  homeContainer.classList.add("home");

  const templateHeader = `
    <header>
      <div class="imgLogo">
        <img src="./img/logo2.png" alt="logo">
      </div>
    </header>
  `;

  homeContainer.innerHTML = templateHeader;

  const main = document.createElement("main");
  const container = document.createElement("div");
  container.classList.add("container");

  const form = document.createElement("form");
  form.setAttribute("id", "postForm");


  const pName = document.createElement("p");
  pName.classList.add("userName");

  const textarea = document.createElement("textarea");
  textarea.setAttribute("id", "myTextarea");
  textarea.classList.add("post");
  textarea.setAttribute("placeholder", "Escribe aquí...");

  const pError = document.createElement("p");
  pError.classList.add("postError");

  const publish = document.createElement("button");
  publish.classList.add("publish");
  publish.innerText = "Publicar";

  const postContainer = document.createElement("div");
  postContainer.setAttribute("id", "postContainer");

  const dropdownPost = document.createElement("div");
  dropdownPost.classList.add("dropwnPost");

  const img = document.createElement('img');
  img.setAttribute('alt', 'profile photo');

  // const user = auth.currentUser;
  // img.setAttribute('src', user.photoURL);
  img.setAttribute('src', '../img/avatarDefault(1).png');


  form.appendChild(textarea);
  
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
    const postError = document.querySelector(".postError");

    if (post === "") {
      postError.style.display = "block";
      postError.textContent = "Debes ingresar un mensaje.";
    } else {
      savePost(post);
      textarea.value = "";
      postError.style.display = "none";
    }
  });


  handleUserAuth(); // Invocar handleUserAuth para obtener la imagen y el usuario

  // OBTENER POST DESDE FIRESTORE
  onGetPost((querySnapshot) => {
    console.log('query', querySnapshot);

    let html = '';

    querySnapshot.forEach(docs => {
      const postData = docs.data();
      console.log('docs', docs.data()); //transformar a un objeto de JS, ya no sera de Firebase

      // Obtener imagen y usuario
      let userImage = postData.userImage;
      let userName = postData.userName;
      let userEmail = sessionStorage.getItem("userEmail");

      html += `
      <div class="postUsersContainer">
        <div class="postUsersData">
          <img src="${userImage}" alt="profile photo">
          <p class="userName">${userName}</p>
        </div> `;
        if (docs.data().userEmail === userEmail) {
          html += `
          <div class="dropdownPost">
            <i class="fa-solid fa-ellipsis fa-2xl" style="color: #66fcf1;"></i>
              <div class="dropdown-container">
                <div class="option delete" id="`+ docs.id +`"><i class="fa-solid fa-trash fa-xl" style="color: #202833;"></i>eliminar</div>
                <div class="option" id="edit"><i class="fa-solid fa-pen-to-square fa-xl" style="color: #202833;"></i>edit</div>
              </div>
          </div>`;
        }
        html += `
        <textarea readOnly>${postData.post}</textarea>
        <div class="postInfoContainer">
          <div class="likesContainer">
            <p class="likes"><i class="fa-regular fa-heart fa-2xl" style="color: #c5c6c8;"></i> 1</p>
          </div>
          <div class="comentsContainer">
            <p class="coments"><i class="fa-regular fa-comment fa-2xl" style="color: #c5c6c8;"></i> 1</p>
          </div>
        </div>
        `;
        html += `</div>`;
    });

    postContainer.innerHTML = html;
    const db = getFirestore();

    let deleteBtns = document.querySelectorAll('.delete');
    deleteBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const docRef = doc(db, 'publish', e.target.id)
        deleteDoc(docRef);
      });
    })

  });

  return element;
};

export default home;

