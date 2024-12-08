import { ref } from 'vue';
import { defineStore } from 'pinia';

import type { AuthUser, LoggedUser } from '../interfaces/user.interface';
import { AuthStatus } from '../interfaces/auth.interface';
import { validateToken } from '../services/auth.service';

export const useAuthStore = defineStore('auth', () => {

  // States
  const authUser = ref<AuthUser | undefined>()
  const authToken = ref<string | null>(localStorage.getItem('auth_token'));
  const authStatus = ref<AuthStatus>(AuthStatus.Checking)

  // Getters
  const getToken = () => authToken.value ?? localStorage.getItem('auth_token');
  const getUser = () => authUser.value;
  const getAuthStatus = () => authStatus.value;

  // Acctions
  const login = (loggedUser: LoggedUser) => {
    const { token, user } = loggedUser;
    authUser.value = user;
    authToken.value = token;
    authStatus.value = AuthStatus.Authenticated;
    localStorage.setItem('auth_token', token);
  };

  const logout = () => {
    authToken.value = null;
    authStatus.value = AuthStatus.NotAuthenticated;
    localStorage.removeItem('auth_token');
  };

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('auth_token');

    if (!token) {
      authStatus.value = AuthStatus.NotAuthenticated;
      return;
    }

    try {
      const response = await validateToken();
      authUser.value = response;
      authToken.value = token;
      authStatus.value = AuthStatus.Authenticated;
    } catch (error) {
      console.error('Token inválido', error);
      logout();
    }

  };

  return {

    // Getters
    getToken,
    getUser,
    getAuthStatus,

    // Actions
    login,
    logout,
    checkAuthStatus,

  };
});