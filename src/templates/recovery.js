
const recovery = (navigateTo) => {
  const template = `
  <div class="recovery">
      <header>
      <div class="imgLogo">
        <img src="./img/logo2.png" alt="logo">
      </div>
    </header>

    <main>
      <div class="container">
        <form id="logInForm">
        <h3>Ingresa tu correo</h3>
          <input type="email" id="recoveryInput" class="formControl" placeholder="email@correo.com" required>
          <p class="emailError"></p>
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


  const resetPassword = element.querySelector('.forgotButton');
  const mailField = element.querySelector('#recoveryInput');

  resetPassword.addEventListener('click', async () => {
    const email = mailField.value;
    if (email !== "") {
      try {
        const result = await sendPasswordResetEmail(auth, email);
        console.log('¡El correo electónico de restablecimiento de la contraseña se ha enviado con éxito!');
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('IngreseEmail')
    }

  });




  // Retorna el elemento del DOM creado a partir de la plantilla
  return element.firstChild;
};

export default recovery;
