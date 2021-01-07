import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@app/components/Layout/index.vue';

const routes = [
  {
    name: 'repositories',
    path: '/',
    component: Layout
  },
  {
    path: '/error(.*)*',
    redirect: '/',
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router;
