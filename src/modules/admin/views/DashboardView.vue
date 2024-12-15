<script setup lang="ts">
import AdminLayout from "../layouts/AdminLayout.vue";
import { useRouter } from "vue-router";

// Instancia del router para la navegación
const router = useRouter();

// Función para navegar a la página de órdenes
const goToOrders = () => {
  router.push("/admin/orders");
};
</script>

<template>
  <AdminLayout>
    <v-container class="landing-container">
      <v-container
        class="landing-content d-flex justify-center flex-column align-center"
      >
        <!-- SVG relacionado con el tema de la aplicación -->
        <img
          src="/src/assets/logo.png"
          alt="FuelOps Icon"
          class="landing-icon"
        />

        <!-- Breve descripción -->
        <h1 class="landing-title">Bienvenido a FuelOps</h1>
        <p class="landing-description">
          Aquí puedes monitorear y gestionar las órdenes de carga de gas líquido
          de manera eficiente y en tiempo real.
        </p>

        <!-- Botón para ir a las órdenes -->
        <v-btn color="primary" class="mt-4" @click="goToOrders">
          Ir a las Órdenes
        </v-btn>
      </v-container>
    </v-container>
  </AdminLayout>
</template>

<style lang="scss" src="/src/styles/global.scss"></style>
