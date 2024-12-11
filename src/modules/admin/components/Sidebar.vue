<script setup lang="ts">
import { useAuthStore } from "@/modules/auth/stores/auth.store";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
  authStore.logout();
  await router.push({ name: "Login" });
};
</script>

<template>
  <v-navigation-drawer class="sidebar" app>
    <div class="d-flex align-center mr-5 pa-7">
      <v-img src="/src/assets/logo.png"></v-img>
      <span class="text-xl"><b>FUEL</b>OPS</span>
    </div>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <router-link to="/admin" class="router-link">
        <v-list-item prepend-icon="mdi-home" title="Inicio"></v-list-item>
      </router-link>
      <router-link to="/admin/orders" class="router-link">
        <v-list-item prepend-icon="mdi-tanker-truck" title="Órdenes"></v-list-item>
      </router-link>
      <router-link to="/admin/users" class="router-link">
        <v-list-item prepend-icon="mdi-account-multiple" title="Usuarios"></v-list-item>
      </router-link>
      <router-link to="/admin/products" class="router-link">
        <v-list-item prepend-icon="mdi-barrel" title="Productos"></v-list-item>
      </router-link>
      <!-- TODO: Implementar el logout -->
      <router-link to="/admin" class="router-link">
        <v-list-item prepend-icon="mdi-logout" title="Cerrar sesión" @click="handleLogout"></v-list-item>
      </router-link>
    </v-list>
  </v-navigation-drawer>
</template>

<style lang="scss" src="/src/styles/global.scss"></style>
