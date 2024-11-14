// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import adminRoutes from '@/modules/admin/routes/adminRoutes';
import operatorRoutes from '@/modules/operator/routes/operatorRoutes';

const routes = [
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