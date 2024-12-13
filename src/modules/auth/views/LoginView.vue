<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "@/modules/auth/composables/use.auth";

const { login, isLoading, isError, isSuccess } = useAuth();

const loginForm = ref({
  username: "",
  password: "",
});

const errorMessage = ref("");
const showPassword = ref(false); // Para alternar visibilidad de contraseña

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const handleLogin = async () => {
  try {
    await login({
      username: loginForm.value.username,
      password: loginForm.value.password,
    });
    errorMessage.value = "";
  } catch (error: any) {
    errorMessage.value = error.message || "Error en el login";
  }
};
</script>

<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters class="fill-height">
      <!-- Columna de Imagen -->
      <v-col cols="8" class="image-column"> </v-col>

      <!-- Columna del Formulario -->
      <v-col cols="4" class="form-column d-flex justify-center">
        <v-container class="pa-10">
          <h4 class="login-title text-h4 mt-5 mb-8">¡Bienvenido de vuelta! 👋🏻</h4>
          <span class="text-h5 mt-4">Inicia sesión en tu cuenta para continuar</span>
          <v-form @submit.prevent="handleLogin" class="login-form mt-9">
            <!-- Campo de usuario -->
            <v-container class="pa-0 mt-3 mb-5">
              <span class="mt-3">Usuario</span>
            <v-text-field v-model="loginForm.username" placeholder="Ingresa tu usuario" required
              :disabled="isLoading.value" hide-details bg-color="transparent" density="compact" autofocus class="form-input"
              variant="outlined"></v-text-field>
            </v-container>
            <!-- Campo de contraseña -->
            <v-container class="pa-0 mt-3 mb-5">
              <span>Contraseña</span>
              <v-text-field v-model="loginForm.password" :type="showPassword ? 'text' : 'password'"
              placeholder="Ingresa tu contraseña" required :disabled="isLoading.value" hide-details bg-color="transparent"
              density="compact" class="form-input" variant="outlined"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="togglePasswordVisibility"></v-text-field>
            </v-container>  
            <!-- Botón de login -->
            <v-container>
              <v-btn class="login-button mt-8" :loading="isLoading.value" :disabled="isLoading.value" color="#00B0FF"
              type="submit" block>
              <span v-if="!isLoading.value">Ingresar</span>
            </v-btn>
            </v-container>
            <!-- Mensaje de error -->
            <v-alert v-if="isError.value" type="error" class="mt-4" transition="scale-transition" border="start"
              prominent>
              {{ errorMessage }}
            </v-alert>
          </v-form>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.image-column {
  background-image: url("/src/assets/logo_login.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
}

.form-column {
  background-color: #111C44;
}

.login-title {
  color: #fff;
}

.form-input {
  margin-top: 0.5rem;
}

.login-button {
  background-color: #00b0ff !important;
  color: white !important;
}
</style>
