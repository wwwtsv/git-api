import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Layout from "@app/components/layout/index.vue";

export enum RoutesMap {
  FileList = "file-list",
}

const { FileList } = RoutesMap;

const routes: Array<RouteRecordRaw> = [
  {
    name: "repositories",
    path: "/",
    redirect: "/file-list",
    component: Layout,
    children: [
      {
        name: FileList,
        path: `${FileList}/:repository?/:path*`,
        component: () => import("@app/views/file-list/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
