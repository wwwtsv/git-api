import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Layout from "@app/components/layout/index.vue";
import LayoutNavigation from "@app/components/layout/layout-navigation/index.vue";

export enum RoutesMap {
  FileList = `file-list/:repository?/:category?/:path*`,
  FileDetails = `file-details/:repository?/:category?/:path*`,
}

const routes: Array<RouteRecordRaw> = [
  {
    name: "repositories",
    path: "/",
    redirect: "/file-navigation/file-list",
    component: Layout,
    children: [
      {
        name: "file-navigation",
        path: "file-navigation",
        component: LayoutNavigation,
        children: [
          {
            name: "file-list",
            path: RoutesMap.FileList,
            component: () => import("@app/views/file-list/index.vue"),
          },
          {
            name: "file-details",
            path: RoutesMap.FileDetails,
            component: () => import("@app/views/file-details/index.vue"),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
