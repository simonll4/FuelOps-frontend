export default {
  path: '/',
  name: 'auth',
  children: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/modules/auth/views/LoginView.vue'),
    }
  ],
}