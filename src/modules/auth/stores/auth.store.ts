import { ref } from 'vue';
import { defineStore } from 'pinia';

import type { AuthUser, LoggedUser } from '@/modules/auth/interfaces/user.interface';
import { AuthStatus } from '@/modules/auth/interfaces/auth.interface';
import { validateToken } from '@/modules/auth/services/auth.service';

import { webSocketService } from '@/services/ws.service';


const wsService = webSocketService();

// Store de autenticación
export const useAuthStore = defineStore('auth', () => {

  // States
  const authUser = ref<AuthUser | undefined>();
  const authToken = ref<string | null>(localStorage.getItem('auth_token'));
  const authStatus = ref<AuthStatus>(AuthStatus.Checking);

  // Getters
  const getToken = () => authToken.value ?? localStorage.getItem('auth_token');
  const getUser = () => authUser.value;
  const getAuthStatus = () => authStatus.value;

  // Actions
  const login = (loggedUser: LoggedUser) => {
    const { token, user } = loggedUser;
    authUser.value = user;
    authToken.value = token;
    authStatus.value = AuthStatus.Authenticated;

    localStorage.setItem('auth_token', token);

    wsService.connect(token);  // Conectar sesion WebSocket
  };

  const logout = () => {
    authUser.value = undefined;
    authToken.value = null;
    authStatus.value = AuthStatus.NotAuthenticated;

    localStorage.removeItem('auth_token');  // Limpiar token de localStorage

    wsService.disconnect(); // Desconectar sesion WebSocket
  };

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('auth_token');

    if (!token) {
      authStatus.value = AuthStatus.NotAuthenticated;
      return;
    }

    try {
      const response = await validateToken();  // Validar token con el servicio correspondiente

      authUser.value = response;
      authToken.value = token;
      authStatus.value = AuthStatus.Authenticated;

      wsService.connect(token); // Conectar sesion WebSocket
    } catch (error) {
      console.error('Token inválido', error);
      logout();  // Si el token es inválido, hacer logout
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