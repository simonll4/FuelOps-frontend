export default {
  path: '/operator',
  name: 'operator',
  children: [
    {
      path: '',
      name: 'OperatorDashboard',
      meta: { requiresAuth: true, role: 'ROLE_OPERATOR' },
      component: () => import('@/modules/operator/views/DashboardView.vue'),
    },
    {
      path: 'orders',
      name: 'OrdersView',
      meta: { requiresAuth: true, role: 'ROLE_OPERATOR' },
      component: () => import('@/modules/operator/views/OrdersView.vue')
    },
    {
      path: 'orders/:id',
      name: 'OrderDetailView',
      meta: { requiresAuth: true, role: 'ROLE_OPERATOR' },
      component: () => import('@/modules/operator/views/OrderDetailView.vue'),
    },
  ],
}