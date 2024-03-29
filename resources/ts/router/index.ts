import { setupLayouts } from 'virtual:generated-layouts';
import { createRouter, createWebHistory } from 'vue-router';
import routes from '~pages';
import { isUserLoggedIn } from './utils';

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory('/'),
  routes: [
    ...setupLayouts(routes),
  ],
})

// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards

router.beforeEach((to, from, next) => {
  
  const isLoggedIn = isUserLoggedIn();
  
  if (!isLoggedIn) {
    if (to.name !== 'login') {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});


export default router
