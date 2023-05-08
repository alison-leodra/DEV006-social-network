const home = (navigateTo) => {
  return `
  <div class="inicioTemplate">
    <header>
      <div class="imgLogo">
        <img src="./img/logo2.png" alt="logo">
      </div>
    </header>

    <main>
      <div class="container">
        <h2 class="tittle">Encuentra a tus compañeros de juego perfectos</h2>
        <form id="logInForm">
          <input type="text" id="logInEmail" class="formControl" placeholder="email@correo.com" required>
          <input type="password" id="logInPassword" class="formControl" placeholder="contraseña" required>
          <button type="button" class="logInbtn">Inciar Sesión</button> 
          <button type="button" class="signbtn">Registrarse</button>
        </form>
      </div>
    </main>

    <footer>
      <img src="./img/Sin título-4.png" alt="footer">
    </footer>
  </div>
  `;
}

export default home;
