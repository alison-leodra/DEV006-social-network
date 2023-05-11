const home = (navigateTo) => {
  const template = `
  <div class="home">
      <header>
      <div class="imgLogo">
        <img src="./img/logo2.png" alt="logo">
      </div>
    </header>

    <main>
      <div class="container">
        <h2 class="tittle">Encuentra a tus compañeros de juego perfectos</h2>
        <form id="logInForm">
          <input type="email" id="logInEmail" class="formControl" placeholder="email@correo.com" required>
          <input type="password" id="logInPassword" class="formControl" placeholder="contraseña" required>
          <div>
            <button type="button" class="logInbtn">Inciar Sesión</button>
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

  const element = document.createElement('div');
  element.innerHTML = template.trim();

  // Obtiene el botón "Registrarse" por su clase
  const signUpButton = element.querySelector('.signUpButton');

  // Agrega el evento "click" al botón "Registrarse"
  signUpButton.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/register');
  });

  // Retorna el elemento del DOM creado a partir de la plantilla
  return element.firstChild;
};

export default home;
