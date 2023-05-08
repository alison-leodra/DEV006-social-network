const home = (navigateTo) => {
  const inicioTemplate = document.createElement('div');
  inicioTemplate.classList.add('inicioTemplate');

  const header = document.createElement('header');
  const imgLogo = document.createElement('div');
  const logo = document.createElement('img');
  logo.src = './img/logo2.png';
  imgLogo.classList.add('imgLogo');
  imgLogo.appendChild(logo);
  header.appendChild(imgLogo);
  inicioTemplate.appendChild(header);

  const main = document.createElement('main');
  const container = document.createElement('div');
  container.classList.add('container');
  const title = document.createElement('h2');
  title.classList.add('tittle');
  title.textContent = 'Encuentra a tus compañeros de juego perfectos';
  const form = document.createElement('form');
  form.id = 'logInForm';
  const emailInput = document.createElement('input');
  emailInput.type = 'text';
  emailInput.id = 'logInEmail';
  emailInput.classList.add('formControl');
  emailInput.placeholder = 'email@correo.com';
  emailInput.required = true;
  const passwordInput = document.createElement('input');
  passwordInput.type = 'password';
  passwordInput.id = 'logInPassword';
  passwordInput.classList.add('formControl');
  passwordInput.placeholder = 'contraseña';
  passwordInput.required = true;
  const loginBtn = document.createElement('button');
  loginBtn.type = 'button';
  loginBtn.classList.add('logInbtn');
  loginBtn.textContent = 'Iniciar Sesión';
  const signBtn = document.createElement('button');
  signBtn.type = 'button';
  signBtn.classList.add('signbtn');
  signBtn.textContent = 'Registrarse';
  signBtn.onclick = () => {
    navigateTo('/register');
  };
  form.append(emailInput, passwordInput, loginBtn, signBtn);
  container.appendChild(title);
  container.appendChild(form);
  main.appendChild(container);
  inicioTemplate.appendChild(main);

  const footer = document.createElement('footer');
  const footerImg = document.createElement('img');
  footerImg.src = './img/Sin título-4.png';
  footerImg.alt = 'footer';
  footer.appendChild(footerImg);
  inicioTemplate.appendChild(footer);

  return inicioTemplate;
};

export default home;
