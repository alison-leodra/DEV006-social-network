const registerEmail = () => {
  return `
  <div class="registroEmail">
    <header>
      <div class="imgLogo">
        <img src="./img/logo2.png" alt="logo">
      </div>
    </header>

    <main>
      <div class="container">
        <form id="signInFormEmail">
          <input type="text" id="sigInName" class="formControl" placeholder="nombre de usuario" required>
          <input type="text" id="sigInEmail" class="formControl" placeholder="email@correo.com" required>
          <input type="password" id="sigInPassword" class="formControl" placeholder="contraseña" required>
          <input type="password" id="sigInPasswordConfirm" class="formControl" placeholder="confirmar contraseña"
              required>
          <textarea readonly>
            ${terminosYCondiciones()}
          </textarea>
          <p class="check">
            <input type="checkbox" id="sigInTerminos">
            <label class="terminos"> Aceptar los términos y condiciones.</label>
          </p>
          <button type="button" class="registerEmail">Registrarse</button>
        </form>
      </div>
    </main>
    
  </div>
  `;
}

const terminosYCondiciones = () => {
  return `
Términos y Condiciones

    1.1. Bienvenido a Playmates, una aplicación móvil que te permite encontrar compañeros de juego para tus juegos favoritos.
    1.2. Estos Términos y condiciones (“Términos”) regulan el uso de la aplicación Playmates (“App”) y los servicios proporcionados por ella.
    1.3. La utilización de la App implica la aceptación plena y sin reservas de todos los Términos.


Aceptación y cambios de los Términos

    2.1. Al acceder a la App, el usuario acepta expresamente estos Términos.
    2.2. Playmates se reserva el derecho de cambiar, modificar, añadir o eliminar partes de los Términos en cualquier momento y sin previo aviso. Las modificaciones serán efectivas inmediatamente después de su publicación en la App. La continuación del uso de la App después de cualquier cambio implica la aceptación de los nuevos Términos.


Uso de la App

    3.1. El usuario se compromete a utilizar la App de forma diligente, correcta y lícita y a no utilizarla para fines contrarios a la ley, la moral o el orden público.
    3.2. El usuario se compromete a proporcionar información veraz, completa y actualizada en todo momento y a no suplantar la identidad de terceros o utilizar identidades falsas.
    3.3. Playmates se reserva el derecho a suspender o cancelar el acceso a la App a aquellos usuarios que incumplan estos Términos.


Privacidad y protección de datos personales

    4.1. El uso de los datos personales de los usuarios de la App se rige por la Política de Privacidad, disponible en la App.


Propiedad intelectual

    5.1. Playmates es titular de todos los derechos de propiedad intelectual sobre la App y los servicios proporcionados a través de ella.
    5.2. Queda prohibido reproducir, distribuir, modificar o copiar cualquier contenido o información de la App sin autorización expresa de Playmates.


Exclusión de garantías y responsabilidades

    6.1. Playmates no garantiza la disponibilidad y continuidad del funcionamiento de la App y no será responsable por cualquier daño o perjuicio derivado de la falta de disponibilidad o continuidad del funcionamiento de la App.
    6.2. Playmates no se hace responsable de los contenidos y servicios prestados por terceros a través de la App. 
    6.3. El usuario reconoce y acepta que utiliza la App y los servicios proporcionados a través de ella bajo su exclusiva responsabilidad.
  `;
}

export default registerEmail;
