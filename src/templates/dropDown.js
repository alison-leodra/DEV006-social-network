

// Obtén una referencia al elemento del ícono de la lista desplegable
const dropdownIcon = document.querySelector(".fa-ellipsis");

// Obtén una referencia al contenedor de la lista desplegable
const dropdownContainer = document.querySelector(".dropdown-container");

// Agrega un controlador de eventos al hacer clic en el ícono de la lista desplegable
dropdownIcon.addEventListener("click", () => {
  // Alternar la clase 'active' para mostrar u ocultar la lista desplegable
  dropdownContainer.classList.toggle("active");
});

export { dropdownIcon, dropdownContainer };