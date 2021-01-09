import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@app/components/Layout/index.vue';

const routes = [
  {
    name: 'Repositories',
    path: '/',
    redirect: '/file-list',
    component: Layout,
    children: [
      {
        name: 'FileList',
        path: 'file-list',
        component: () => import('@app/views/FileList/index.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router;
