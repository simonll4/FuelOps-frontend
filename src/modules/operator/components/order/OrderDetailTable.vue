<script setup lang="ts">
import { ref, watch } from "vue";
import { format } from "date-fns";

import type { OrderDetail } from "@/interfaces/order-details.interface";
import { es } from "date-fns/locale";

const props = defineProps({
  items: {
    type: Array as () => OrderDetail[],
    default: () => [],
  },
  totalElements: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  setPageD: {
    type: Function,
    required: true,
  },
  isLoading: Boolean,

});

//const emit = defineEmits(["update:page"]);
const currentPage = ref(props.currentPage);

const handlePageChange = (page: number) => {
  currentPage.value = page;
  props.setPageD(page - 1);
};

watch(() => props.currentPage, (newPage) => {
  currentPage.value = newPage;
});

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
  //if (temperature <= -5) return "text-cool";
  if (temperature < -0.5 && temperature <= 0.5) return "text-normal";
  if (temperature > -0.5) return "text-warm";
  return "";
};

const formatDate = (timestamp: string) => {
  return format(new Date(timestamp), "dd/MM/yyyy HH:mm:ss");
};

// Función para formatear la fecha para el título
const formatTitleDate = (timestamp: string) => {
  return format(new Date(timestamp), "dd 'de' MMMM 'de' yyyy", { locale: es }); // Puedes usar el idioma deseado.
};

</script>

<template>

  <v-card class="data-container full-card mb-4" outlined>
    <v-card-title class="mt-2 mb-2">
     <strong>Detalles de Carga - {{ formatTitleDate(new Date().toISOString()) }}</strong>
    </v-card-title>
    <v-data-table-server :headers="headers" :items="items" item-value="id" class="elevation-1 tabla"
      :items-per-page="pageSize" :loading="isLoading" :page="currentPage" :items-length="totalElements"
      hide-default-footer @update:page="handlePageChange">

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

      <!-- Footer personalizado -->
      <template #bottom>
        <v-container class="d-flex justify-center">
          <v-pagination :model-value="currentPage" :length="totalPages" :total-visible="5"
            @update:modelValue="handlePageChange"></v-pagination>
        </v-container>
      </template>

    </v-data-table-server>
  </v-card>

</template>

<style lang="scss" src="/src/styles/global.scss"></style>