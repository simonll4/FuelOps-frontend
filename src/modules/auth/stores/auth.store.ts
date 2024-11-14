// auth.store.ts
import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null);

  // Getters
  const getToken = () => token.value ?? localStorage.getItem('auth_token');

  // Acctions
  const login = (newToken: string) => {
    token.value = newToken;
    localStorage.setItem('auth_token', newToken);
  };

  const logout = () => {
    token.value = null;
    localStorage.removeItem('auth_token');
  };

  return {
    // State
    token,

    // Actions
    login,
    logout,

    // Getters
    getToken,
  };

});