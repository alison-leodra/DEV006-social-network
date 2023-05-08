import home from './templates/home';
import register from './templates/register';
import registerEmail from './templates/registerEmail';


const routes = [
  { path: '/', component: home },
  { path: '/register', component: register },
  { path: '/registerEmail', component: registerEmail },
];