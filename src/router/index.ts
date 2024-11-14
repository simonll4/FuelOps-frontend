import { createRouter, createWebHistory } from 'vue-router';

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

export default router;