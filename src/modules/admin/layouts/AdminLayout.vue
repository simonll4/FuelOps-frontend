<script setup lang="ts">
import SidebarAdmin from "../components/Sidebar.vue";
//TODO: Ver por qué corcho el footer no se encaja bien en el layout
import Footer from "@/modules/common/components/Footer.vue";
</script>
<template>
  <v-layout class="rounded rounded-md layout">
    <SidebarAdmin />
    <v-main class="main" app>
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
.main {
  flex-grow: 1;
  overflow-y: auto;
  background-color: inherit;
}
</style>
