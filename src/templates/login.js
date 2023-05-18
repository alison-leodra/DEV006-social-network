import { signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase.js";
import error from "./error.js";

const login = (navigateTo) => {

  const element = document.createElement("div");
  const loginContainer = document.createElement("div");
  loginContainer.classList.add("login");

  const templateHeader = ` <header>
  <div class="imgLogo">
    <img src="./img/logo2.png" alt="logo">
    <h2 class="tittle">Encuentra a tus compañeros de juego perfectos</h2>
  </div>
</header> `;

  loginContainer.innerHTML = templateHeader;
  const main = document.createElement("main");

  const container = document.createElement("div");
  container.classList.add("container");

  const form = document.createElement("form");
  form.setAttribute('id', 'logInForm');

  const inputEmail = document.createElement('input');
  inputEmail.setAttribute('type', 'email');
  inputEmail.setAttribute('id','logInEmail');
  inputEmail.classList.add('formControl');
  inputEmail.setAttribute('placeholder','email@correo.com');
  inputEmail.setAttribute('required', '');

  const paragraphEmail = document.createElement('p');
  paragraphEmail.classList.add('emailError');

  const inputPassword = document.createElement('input');
  inputPassword.setAttribute('type', 'password');
  inputPassword.setAttribute('id','logInPassword');
  inputPassword.classList.add('formControl');
  inputPassword.setAttribute('placeholder','contraseña');
  inputPassword.setAttribute('required', '');
  
  const paragraphError = document.createElement('p');
  paragraphError.classList.add('passwordError');
  
  const divLoginBtnContainer = document.createElement('div');
  const logInBtn = document.createElement('button');
  logInBtn.setAttribute('type', 'button');
  logInBtn.classList.add('logInbtn');
  logInBtn.innerText = 'Inciar con correo';

  const loginGoogleBtn = document.createElement('button');
  loginGoogleBtn.setAttribute('type', 'button');
  loginGoogleBtn.classList.add('logInGoogle');
  loginGoogleBtn.innerText = 'Inciar con Google';

  const pContainerForgot = document.createElement('p');
  const forgotBtn = document.createElement('a');
  forgotBtn.setAttribute('href','#');
  forgotBtn.classList.add('forgotBtn');
  forgotBtn.innerText = '¿Olvidaste tu contraseña?';

  const registerFooter = document.createElement('footer');
  const  imgGeneral =document.createElement('img');
  imgGeneral.setAttribute('src', './img/Sin título-4.png');
  imgGeneral.setAttribute('alt', 'dos personas jugando videojuegos');
  
  const signUpButton = document.createElement('a');
  signUpButton.setAttribute('href','');
  signUpButton.classList.add('signUpButton');
  signUpButton.classList.add('registerHome');
  signUpButton.innerText = '¿Aún no tienes cuenta? Registrate aquí';
  
  const postContainer = document.createElement('div');
  postContainer.setAttribute('id', 'postContainer');

  

  pContainerForgot.append(forgotBtn);
  divLoginBtnContainer.append(logInBtn);
  divLoginBtnContainer.append(loginGoogleBtn);
  divLoginBtnContainer.append(pContainerForgot);

  form.append(inputEmail);
  form.append(paragraphEmail);
  form.append(inputPassword);
  form.append(paragraphError);
  form.append(divLoginBtnContainer);

  container.append(form);
  container.appendChild(postContainer);
  main.append(container);

  registerFooter.append(imgGeneral);
  registerFooter.append(signUpButton);

  loginContainer.append(main);
  loginContainer.append(registerFooter);
  element.append(loginContainer);



  // Obtiene el botón "Registrarse" por su clase


  // Agrega el evento "click" al botón "Registrarse"
  signUpButton.addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo("/register");
  });

  
   forgotBtn.addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo("/recovery");
  });

  
     logInBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const email = document.querySelector("#logInEmail").value;
      const password = document.querySelector("#logInPassword").value;
      const passwordError = document.querySelector(".passwordError");
      const emailError = document.querySelector(".emailError");

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(userCredential);
        navigateTo("/home");
      } catch (error) {
        console.log(error.message);
        console.log(error.code);

        if (error.code === "auth/invalid-email") {
          emailError.style.display = "block";
          passwordError.style.display = "none";
          emailError.textContent =
            "El correo electrónico ingresado no es válido.";
        } else if (error.code === "auth/user-not-found") {
          emailError.style.display = "block";
          passwordError.style.display = "none";
          emailError.textContent =
            "El correo electrónico ingresado no ha sido encontrado";
        } else if (error.code === "auth/wrong-password") {
          passwordError.style.display = "block";
          emailError.style.display = "none";
          passwordError.textContent = "La contraseña es incorrecta";
        } else if (error.code === "auth/missing-password") {
          passwordError.style.display = "block";
          emailError.style.display = "none";
          passwordError.textContent = "Debe ingresar una contraseña.";
        }
      }
    });
  ;
  const signInFormGoogle = element.querySelector(".logInGoogle");
  // Agrega el evento "click" al botón "Registrarse"
  signInFormGoogle.addEventListener("click", async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    try {
      const credentials = await signInWithPopup(auth, provider);
      console.log(credentials);
      navigateTo("/home");
    } catch (error) {
      console.log(error);
    }
  });

  // Retorna el elemento del DOM creado a partir de la plantilla
  return element;
};

export default login;
