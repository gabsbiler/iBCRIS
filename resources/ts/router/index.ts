import { setupLayouts } from 'virtual:generated-layouts';
import { createRouter, createWebHistory } from 'vue-router';
import routes from '~pages';

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory('/'),
  // history: createWebHistory('/'),
  routes: [
    ...setupLayouts(routes),
  ],
})

// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('accessToken');
  
  if (!isLoggedIn || isLoggedIn === '0') {
    if(to.name == 'register'){
      next()
    }

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
