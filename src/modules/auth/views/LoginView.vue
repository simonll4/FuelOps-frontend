<script setup>
import { ref } from 'vue';
import { useAuth } from '@/modules/auth/composables/use.auth';

const { login, logout, isAuthenticated ,isLoading, isError , isSuccess} = useAuth();

// Estados locales para el formulario
const username = ref('');
const password = ref('');
const errorMessage = ref('');

// Función para manejar el login
const handleLogin = async () => {
  console.log('Iniciando sesión...');
  try {
    const user = { username: username.value, password: password.value };
    await login(user);  // Llamamos a la función login del composable

    errorMessage.value = ''; // Limpiar mensaje de error en caso de éxito
  } catch (error) {
    console.error('Error en el login:', error);
    errorMessage.value = error.message || 'Error en el login';  // Mensaje de error
  }
};

</script>

<template>
  <div v-if="isAuthenticated">
    <h1>Bienvenido</h1>
    <button @click="logout">Cerrar sesión</button>
  </div>

  <div v-else>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="username" type="text" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>

    <div v-if="isError" class="error-message">
      Error: {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped>
.error-message {
  color: red;
}
</style>
