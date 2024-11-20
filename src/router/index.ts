import { createRouter, createWebHistory } from 'vue-router';

import authRoutes from '@/modules/auth/routes/auth.routes';
import adminRoutes from '@/modules/admin/routes/admin.routes';
import operatorRoutes from '@/modules/operator/routes/operator.routes';

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