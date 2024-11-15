import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '@/modules/auth/stores/auth.store';

import authRoutes from '@/modules/auth/routes/auth.routes';
import adminRoutes from '@/modules/admin/routes/adminRoutes';
import operatorRoutes from '@/modules/operator/routes/operatorRoutes';

const routes = [
  {
    ...authRoutes
  },
  {
    ...operatorRoutes
  },
  {
    ...adminRoutes
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  await authStore.checkAuthStatus();
  
  const isAuthenticated = authStore.getAuthStatus() === "Authenticated";

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' });
  } else {
    const userRoles = authStore.getUser()?.roles || [];
    const requiredRole = to.meta.role as string;
    if (requiredRole && !userRoles.includes(requiredRole)) {
      next({ name: 'Login' });
    } else {
      next();
    }
  }
});

export default router;