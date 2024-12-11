import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '@/modules/auth/stores/auth.store';

import authRoutes from '@/modules/auth/routes/auth.routes';
import adminRoutes from '@/modules/admin/routes/admin.routes';
import operatorRoutes from '@/modules/operator/routes/operator.routes';
import { AuthStatus } from '@/modules/auth/interfaces/auth.interface';

const routes = [
  {
    ...authRoutes
  },
  {
    ...operatorRoutes
  },
  {
    ...adminRoutes
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/modules/common/views/NotFoundView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  await authStore.checkAuthStatus();
  const isAuthenticated = authStore.getAuthStatus() === AuthStatus.Authenticated;

  if (to.name === 'Login' && isAuthenticated) {
    const userRoles = authStore.getUser()?.roles || [];
    if (userRoles.includes('ROLE_ADMIN')) {
      next({ name: 'AdminDashboard' });
    } else if (userRoles.includes('ROLE_OPERATOR')) {
      next({ name: 'OperatorDashboard' });
    } else {
      next(false); // Bloquea si el rol no coincide (esto podría depender del caso de uso)
    }
  } else if (to.meta.requiresAuth && !isAuthenticated) {
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