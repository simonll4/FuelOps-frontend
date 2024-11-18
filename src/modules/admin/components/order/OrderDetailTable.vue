<script setup lang="ts">
import { ref } from "vue";

// Definición de encabezados de la tabla
const headers = ref<Array<{ title: string; value: string; align?: "start" | "center" | "end" }>>([
  { title: "Timestamp", value: "timestamp" },
  { title: "Masa Acumulada (kg)", value: "mass" },
  { title: "Densidad (kg/m³)", value: "density" },
  { title: "Temperatura (°C)", value: "temperature" },
  { title: "Caudal (kg/h)", value: "flowRate" },
]);

// Datos simulados de ejemplo
const items = ref<Array<{
  id: number;
  timestamp: string;
  mass: number;
  density: number;
  temperature: number;
  flowRate: number;
}>>([
  {
    id: 1,
    timestamp: "2024-11-17 10:30:00",
    mass: 5000,
    density: 800,
    temperature: 25,
    flowRate: 1500,
  },
  {
    id: 2,
    timestamp: "2024-11-17 10:31:00",
    mass: 6000,
    density: 795,
    temperature: 26,
    flowRate: 1450,
  },
  {
    id: 3,
    timestamp: "2024-11-17 10:32:00",
    mass: 7000,
    density: 790,
    temperature: 27,
    flowRate: 1400,
  },
]);

//TODO: Hacer algo para que esto se aplique con la temperatura que viene del back
// Función para aplicar estilos condicionales a la temperatura
const getTemperatureClass = (temperature: number): string => {
  if (temperature <= 20) return "text-cool";
  if (temperature > 20 && temperature <= 30) return "text-normal";
  if (temperature > 30) return "text-warm";
  return "";
};
</script>

<template>
  <v-data-table-server
    :headers="headers"
    :items="items"
    :items-length="items.length"
    item-value="id"
    class="elevation-1"
  >
    <!-- Formateo del timestamp -->
    <template #item.timestamp="{ item }">
      <span>{{ item.timestamp }}</span>
    </template>

    <!-- Columna de masa acumulada -->
    <template #item.mass="{ item }">
      <span>{{ item.mass }} kg</span>
    </template>

    <!-- Columna de densidad -->
    <template #item.density="{ item }">
      <span>{{ item.density }} kg/m³</span>
    </template>

    <!-- Columna de temperatura con colores condicionales -->
    <template #item.temperature="{ item }">
      <span :class="getTemperatureClass(item.temperature)">
        {{ item.temperature }} °C
      </span>
    </template>

    <!-- Columna de caudal -->
    <template #item.flowRate="{ item }">
      <span class="ml-2">{{ item.flowRate }} kg/h</span>
    </template>
  </v-data-table-server>
</template>

<style scoped>
/* Estilos para valores condicionales de temperatura */
.text-cool {
  color: #00aaff;
  font-weight: bold;
}
.text-normal {
  color: #00ffaa;
  font-weight: bold;
}
.text-warm {
  color: #ff5500;
  font-weight: bold;
}
</style>
