const register = (navigateTo) => {
  const template = `
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
  const element = document.createElement('div');
  element.innerHTML = template.trim();

  // Obtiene el botón "Registrarse" por su clase
  const signInFormEmail = element.querySelector('.signInFormEmail');

  // Agrega el evento "click" al botón "Registrarse"
  signInFormEmail.addEventListener('click', () => {
    navigateTo('/registerEmail');
  });

  // Retorna el elemento del DOM creado a partir de la plantilla
  return element.firstChild;
};
export default register;
