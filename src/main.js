import home from './templates/home.js';
import register from './templates/register.js';
// import registerEmail from './templates/registerEmail.js';
// import error from './templates/error.js';

const routes = [
  { path: '/', component: home },
  { path: '/register', component: register },
  // { path: '/registerEmail', component: registerEmail },
  // { path: '/error', component: error },
];

const defaultRoute = '/';
const root = document.getElementById('id');

const navigateTo = (hash) => {
  const route = routes.find((routeFound) => routeFound.path === hash);

  if (route && route.component) {
    window.history.pushState(
      {},
      route.path,
      window.location.origin + route.path,
    );

    if (root.firstChild) {
      root.removeChild(root.firstChild);
    }
    root.appendChild(route.component());
  } else if (hash !== '/error') {
    navigateTo('/error');
  }
};


window.onpopstate = () => {
  navigateTo(window.location.pathname);
};

navigateTo(window.location.pathname || defaultRoute);
