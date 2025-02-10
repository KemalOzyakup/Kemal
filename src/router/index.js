import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import Settings from '../views/Settings.vue';
import QuizView from '../views/QuizView.vue';
import History from '../views/History.vue';
import RegisterView from '../views/RegisterView.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/Settings',
    name: 'Settings',
    component: Settings,
  },
  {
    path: '/quiz',
    name: 'quiz',
    component: QuizView,
  },
  {
    path: '/history',
    name: 'history',
    component: History,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;