export default {
  path: '/operator',
  name: 'operator',
  children: [
    {
      path: '',
      name: 'OperatorDashboard',
      component: () => import('@/modules/operator/views/DashboardView.vue'),
    },
    {
      path: 'orders',
      name: 'OrdersView',
      component: () => import('@/modules/operator/views/OrdersView.vue')
    },
    {
      path: 'orders/:id',
      name: 'OrderDetailView',
      component: () => import('@/modules/operator/views/OrderDetailView.vue')
    },
  ],
}