export default {
  path: '/admin',
  name: 'admin',
  children: [
    {
      path: '',
      name: 'AdminDashboard',
      component: () => import("@/modules/admin/views/DashboardView.vue"),
    },
    {
      path: 'products',
      name: "ProductsManager",
      component: () => import("@/modules/admin/views/ProductsView.vue"),
    },
    {
      path: 'products/:id',
      name: 'ProductDetailManager',
      component: () => import("@/modules/admin/views/ProductDetailView.vue"),
    },
    {
      path: 'orders/:id',
      name: 'OrderDetailManager',
      component: () => import("@/modules/admin/views/ProductDetailView.vue"),
    },
    {
      path: 'users',
      name: 'UserManager',
      component: () => import("@/modules/admin/views/UsersView.vue"),
    },
    {
      path: 'orders',
      name: 'OrdersManager',
      component: () => import("@/modules/admin/views/OrdersView.vue"),
    },
  ],
};
