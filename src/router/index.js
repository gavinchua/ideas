import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/Home';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/new',
      name: 'new',
      component: () => import('@/views/New')
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

export default router;
