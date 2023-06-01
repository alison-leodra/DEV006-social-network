// file error.js
const error = () => {
  const title = document.createElement('h2');
  title.textContent = 'Error 404, pagina no encontrada';
  return title;
};

export default error;
