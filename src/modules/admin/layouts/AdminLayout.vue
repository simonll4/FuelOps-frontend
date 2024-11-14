<script setup lang="ts">
import SidebarAdmin from "../components/Sidebar.vue";
</script>
<template>
  <v-layout class="rounded rounded-md layout">
    <SidebarAdmin />
    <v-main class="main">
      <slot />
    </v-main>
  </v-layout>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
