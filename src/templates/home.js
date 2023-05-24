import { deleteDoc, doc, getFirestore, updateDoc, serverTimestamp, arrayUnion, getDoc, arrayRemove } from "firebase/firestore";
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
      const postData = docs.data(); //transformar a un objeto de JS
      console.log('docs', docs.data()); //transformar a un objeto de JS, ya no sera de Firebase

      // Obtener imagen y usuario
      let userImage = postData.userImage;
      let userName = postData.userName;
      let userEmail = sessionStorage.getItem("userEmail");

      let likesCount = postData.likes.length || 0;

      html += `
      <div class="postUsersContainer">
        <div class="postUsersData">
          <img src="${userImage}" alt="profile photo">
          <p class="userName">${userName}</p>
        </div>  
        `;
      if (docs.data().userEmail === userEmail) {
        html += `
          <div class="dropdownPost">
              <i class="fa-solid fa-ellipsis fa-2xl" style="color: #66fcf1;"></i>
            <div class="dropdown-container">
              <div class="option delete" postid="${docs.id}"><i class="fa-solid fa-trash" style="color: #202833;"></i>Eliminar</div>
              <div class="option edit" postid="${docs.id}"><i class="fa-solid fa-pen-to-square" style="color: #202833;"></i>Editar</div>
              <div class="option update" style="display:none;" postid="${docs.id}"><i class="fa-solid fa-floppy-disk" style="color: #202833;"></i>Guardar</div>
            </div>
          </div>`;
      }
      html += `
        <textarea postid="${docs.id}" readOnly>${postData.post}</textarea>
        <p class="editError">Debes ingresar un texto</p>
        <div class="postInfoContainer">
          <div class="likesContainer">
            <p class="likes">
              <i postid="${docs.id}" class="fa-regular fa-heart fa-2xl" style="color: #c5c6c8;"></i>
              <span>${likesCount}</span>
            </p>
          </div>
          <div class="commentsContainer">
            <p class="comments"><i class="fa-regular fa-comment fa-2xl" style="color: #202833;"></i> 0</p>
            <span></span>
          </div>
        </div>`;

      html += `</div>`;

      html += `
        <div id="modal" class="modal">
          <div class="modal-content">
            <h2>¿Desea eliminar?</h2>
              <button id="yesBtn">Sí</button>
              <button id="noBtn">No</button>
            </div>
          </div>
        </div>`;
    });

    html += `
        <div id="modal" class="modal">
          <div class="modal-content">
            <h2>¿Desea eliminar?</h2>
              <button id="yesBtn">Sí</button>
              <button id="noBtn">No</button>
            </div>
          </div>
          </div>`;

    postContainer.innerHTML = html;
    const db = getFirestore();
  
    let deleteBtns = document.querySelectorAll('.delete');
    const modal = document.getElementById('modal');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');

    function showModal(postid) {
      modal.style.display = 'block';
      yesBtn.setAttribute('postid', postid);
    }
    function hideModal() {
      modal.style.display = 'none';
    }

    deleteBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const postid = e.target.getAttribute("postid");
        showModal(postid);
      });
    });
    yesBtn.addEventListener('click', (e) => {
      const docRef = doc(db, 'publish', e.target.getAttribute("postid"))
      deleteDoc(docRef);
      hideModal();
    });
    noBtn.addEventListener('click', () => {
      hideModal();
    });
    let editBtns = document.querySelectorAll('.edit');
    editBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
      
        let textArea = document.querySelector("textArea[postid=" + e.target.getAttribute("postid") + "]");
        textArea.removeAttribute('readOnly');
        const end = textArea.value.length;
        textArea.setSelectionRange(end, end);
        textArea.focus();
        e.target.style = "display:none;"
        let updateBtn = e.target.nextElementSibling;
        updateBtn.style = "display:block;"
      })
    });

    let updateBtns = document.querySelectorAll('.update');
    updateBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        let textArea = document.querySelector("textArea[postid=" + e.target.getAttribute("postid") + "]");
        const docRef = doc(db, 'publish', e.target.getAttribute("postid"))
        const editError = document.querySelector('.editError');

        // Validar si el campo de texto está vacío
        if (textArea.value.trim() === "") {
          editError.style.display = "block"
          return; // Evitar la actualización si el campo de texto está vacío
        }

        updateDoc(docRef, {
          post: textArea.value,
          timestamp: serverTimestamp()
        });
        editError.style.display = "none"
        e.target.style = "display:none;"
        let editBtn = e.target.previousElementSibling;
        editBtn.style = "display:block;"
      });
    })

    let likeIcons = document.querySelectorAll('.fa-heart');
    likeIcons.forEach((icon) => {
      icon.addEventListener('click', async (e) => {
        const postID = e.target.getAttribute('postid');
        const userLike = auth.currentUser.uid;
        // Accede al documento correspondiente en la colección 'publish'
        const postDocRef = doc(db, 'publish', postID);

        // Incrementa el valor del campo 'likes' en 1
        const postDoc = await getDoc(postDocRef);
        const likes = postDoc.data().likes;
        console.log(likes);
        if (!likes.includes(userLike)) {
          updateDoc(postDocRef, {
            likes: arrayUnion(userLike),
          });
        } else {
          updateDoc(postDocRef, {
            likes: arrayRemove(userLike),
          });
        }
      });
    });

    // ELIMINAR Y EDITAR
    const dropdownIcon = document.querySelector(".fa-ellipsis");
    const dropdownContainer = document.querySelector(".dropdown-container");

    // Agrega un controlador de eventos al hacer clic en el ícono de la lista desplegable
    dropdownIcon.addEventListener("click", () => {
      // Alternar la clase 'active' para mostrar u ocultar la lista desplegable
      dropdownContainer.classList.toggle("active");
    });

  });


  return element;
};

export default home;

