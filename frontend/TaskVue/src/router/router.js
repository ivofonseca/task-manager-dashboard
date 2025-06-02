import { createRouter, createWebHistory } from 'vue-router';
import TaskList from '../components/TaskList.vue';
import Dashboard from '../components/Dashboard.vue';

const routes = [
  { path: '/', component: Dashboard },
  { path: '/tasks', component: TaskList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
