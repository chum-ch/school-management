import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginForm from '../components/authentications/LoginForm.vue';
import ResetPasswordForm from '../components/authentications/ResetPasswordForm.vue';
// Import other router
import SchoolsRouter from '../components/schools/route';
import TrainersRouter from '../components/trainers/route';
import RoomssRouter from '../components/rooms/route';
import StudentsRouter from '../components/students/route';
import CleanersRouter from '../components/cleaners/route';
import SchedulesRouter from '../components/schedules/route';

const routes = [
  ...SchoolsRouter,
  ...RoomssRouter,
  ...TrainersRouter,
  ...StudentsRouter,
  ...CleanersRouter,
  ...SchedulesRouter,
  {
    path: '/schools/:schoolId/manages',
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
