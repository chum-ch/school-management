import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginForm from '../components/authentications/LoginForm.vue'
import ResetPasswordForm from '../components/authentications/ResetPasswordForm.vue'
// Import other router
import StudentRouter from '../components/students/route';
const routes = [
  ...StudentRouter,
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginForm
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: ResetPasswordForm
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
