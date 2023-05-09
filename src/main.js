// file main.js finished
import home from './templates/home.js';
import error from './templates/error.js';
import register from './templates/register.js';
import registerEmail from './templates/registerEmail.js';

const routes = [
  { path: '/', component: home },
  { path: '/error', component: error },
  { path: '/register', component: register },
  { path: '/registerEmail', component: registerEmail },
];

const defaultRoute = '/';
const root = document.getElementById('root');

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
    root.appendChild(route.component(navigateTo));
  } else {
    navigateTo('/error');
  }
};

window.onpopstate = () => {
  navigateTo(window.location.pathname);
};

navigateTo(window.location.pathname || defaultRoute);
