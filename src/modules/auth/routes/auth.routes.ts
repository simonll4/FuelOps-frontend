export default {
  path: '/',
  name: 'auth',
  children: [
    {
      path: '/',
      name: 'Login',
      component: () => import('@/modules/auth/views/LoginView.vue'),
    }
  ],
}