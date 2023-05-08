const register = () => {
  return `
  <div class="registroOption">
    <header>
      <div class="imgLogo">
        <img src="./img/logo2.png" alt="logo">
      </div>
    </header>

    <main>
        <div class="container">
          <form id="signInFormFirst">
            <button type="button" class="signInFormEmail">Registrarse con correo</button>
            <button type="button" class="signInFormGoogle">Registrarse con Google</button>
          </form>
        </div>
    </main>
    
    <footer>
        <img src="./img/Sin título-4.png" alt="footer">
    </footer>
  </div>
  `;
}

export default register;