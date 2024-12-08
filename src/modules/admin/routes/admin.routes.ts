export default {
  path: '/admin',
  name: 'admin',
  children: [
    {
      path: '',
      name: 'AdminDashboard',
      meta: { requiresAuth: true, role: 'ROLE_ADMIN' },
      component: () => import("@/modules/admin/views/DashboardView.vue"),
    },
    {
      path: 'products',
      name: "ProductsManager",
      meta: { requiresAuth: true, role: 'ROLE_ADMIN' },
      component: () => import("@/modules/admin/views/ProductsView.vue"),
    },
    {
      path: 'products/:id',
      name: 'ProductDetailManager',
      meta: { requiresAuth: true, role: 'ROLE_ADMIN' },
      component: () => import("@/modules/admin/views/ProductDetailView.vue"),
    },
    {
      path: 'orders/:id',
      name: 'OrderDetailManager',
      meta: { requiresAuth: true, role: 'ROLE_ADMIN' },
      component: () => import("@/modules/admin/views/ProductDetailView.vue"),
    },
    {
      path: 'users',
      name: 'UserManager',
      meta: { requiresAuth: true, role: 'ROLE_ADMIN' },
      component: () => import("@/modules/admin/views/UsersView.vue"),
    },
    {
      path: 'orders',
      name: 'OrdersManager',
      meta: { requiresAuth: true, role: 'ROLE_ADMIN' },
      component: () => import("@/modules/admin/views/OrdersView.vue"),
    },
  ],
};
