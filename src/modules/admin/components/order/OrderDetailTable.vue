<script setup lang="ts">
import { ref } from "vue";

import type { OrderDetail } from "@/interfaces/order-details.interface";

const props = defineProps({
  items: {
    type: Array as () => OrderDetail[],
    default: () => [],
  },
  totalElements: {
    type: Number,
    default: 0,
  },
  isLoading: Boolean,
});

const emit = defineEmits(["update:page"]);

//TABLA
// Definición de encabezados de la tabla
const headers = ref<Array<{ title: string; value: string; align?: "start" | "center" | "end" }>>([
  { title: "Timestamp", value: "timestamp" },
  { title: "Masa Acumulada (kg)", value: "mass" },
  { title: "Densidad (kg/m³)", value: "density" },
  { title: "Temperatura (°C)", value: "temperature" },
  { title: "Caudal (kg/h)", value: "flowRate" },
]);

//TODO: la temperatura es de acuerdo a la del producto 
// Función para aplicar estilos condicionales a la temperatura
const getTemperatureClass = (temperature: number): string => {
  if (temperature <= -5) return "text-cool";
  if (temperature > -1 && temperature <= 0.5) return "text-normal";
  if (temperature > 0.5) return "text-warm";
  return "";
};

import { format } from "date-fns";

const formatDate = (timestamp: string) => {
  return format(new Date(timestamp), "dd/MM/yyyy HH:mm:ss");
};

</script>

<template>

  <!-- TODO si la cantidad de elementos no llena la pagina se rompe la navegacion
   quizas traer otros props de la paginacion para mejorar el manejo de la tabla -->

  <!-- TODO: Ver el sorteable y que agregue los datos al inicio de la tabla-->

  <v-data-table-server :key="items.length" :headers="headers" :items="items" :items-length="totalElements"
    item-value="id" class="elevation-1" height="320" :items-per-page="5" :items-per-page-options="[]"
    :loading="isLoading" @update:page="emit('update:page', $event)">

    <!-- Formateo del timestamp -->
    <template #item.timestamp="{ item }">
      <span>{{ formatDate(item.timeStamp) }}</span>
    </template>

    <!-- Columna de masa acumulada-->
    <template #item.mass="{ item }">
      <span>{{ item.accumulatedMass }} kg</span>
    </template>

    <!-- Columna de densidad-->
    <template #item.density="{ item }">
      <span>{{ item.density }} kg/m³</span>
    </template>

    <!-- Columna de temperatura con colores condicionales-->
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