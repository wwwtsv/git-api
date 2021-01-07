import { app } from '@app/index'
import VueRouter, { RouteConfig } from 'vue-router'

app.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '*',
    redirect: '/404',
    meta: { hidden: true }
  }
]

const createRouter = () => new VueRouter({
  routes
})

const appRouter = createRouter();
export default appRouter;
