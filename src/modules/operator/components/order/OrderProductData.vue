<script setup lang="ts">
// Props del componente
defineProps({
  productName: {
    type: String,
    required: true,
  },
  thresholdTemperature: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <v-card class="data-container full-card" outlined>
    <v-card-title class="headline">{{ productName }}</v-card-title>
    <v-card-subtitle>Temperatura Umbral</v-card-subtitle>
    <v-card-text>
      <div class="text-h6">{{ thresholdTemperature }} °C</div>
    </v-card-text>
  </v-card>
</template>

<style lang="scss" src="/src/styles/global.scss"></style>
