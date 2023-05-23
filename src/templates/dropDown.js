

// Obtén una referencia al elemento del ícono de la lista desplegable
const dropdownIcon = document.querySelector(".fa-ellipsis");
setTimeout(() => {

}, 0);
// // Obtén una referencia al contenedor de la lista desplegable
// const dropdownContainer = document.querySelector(".dropdown-container");

// // Agrega un controlador de eventos al hacer clic en el ícono de la lista desplegable
// dropdownIcon.addEventListener("click", () => {
//   // Alternar la clase 'active' para mostrar u ocultar la lista desplegable
//   dropdownContainer.classList.toggle("active");
// });
console.log('****');
window.addEventListener('DOMContentLoaded', () => {
  const dropdownContainer = document.querySelector(".dropdown-container");
  console.log(dropdownContainer, '****');
  // Agrega un controlador de eventos al hacer clic en el ícono de la lista desplegable
  dropdownIcon.addEventListener("click", () => {
    console.log(dropdownContainer);
    // Alternar la clase 'active' para mostrar u ocultar la lista desplegable
    dropdownContainer.classList.toggle("active");
  });
})

// export {dropdownContainer };