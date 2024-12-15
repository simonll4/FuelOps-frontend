<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
  router.push({ name: 'Login' });
};
</script>

<template>
  <v-container class="text-center">
    <v-row>
      <v-col>
        <h1>404 - Página No Encontrada</h1>
        <p>Lo sentimos, la página que estás buscando no existe.</p>
        <v-btn color="primary" @click="goHome">Volver al Inicio</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
h1 {
  font-size: 3rem;
  margin-top: 2rem;
}

p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}
</style>