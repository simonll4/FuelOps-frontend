<script setup lang="ts">
import { ref } from "vue";
import type { TableItem } from '@/modules/admin/interfaces/table-item.interface';
import type { OrderStates } from '@/modules/admin/interfaces/order-states.interface';

const orderStates: OrderStates = {
  ORDER_CANCELLED: 'ORDER_CANCELLED',
  ORDER_RECEIVED: 'ORDER_RECEIVED',
  REGISTERED_INITIAL_WEIGHING: 'REGISTERED_INITIAL_WEIGHING',
  ORDER_CLOSED: 'ORDER_CLOSED',
  REGISTERED_FINAL_WEIGHING: 'REGISTERED_FINAL_WEIGHING',
};

// Definición de los encabezados de la tabla
const headers = ref<Array<{ title: string; value: string; align?: "start" | "center" | "end" }>>([
  { title: "Camión", value: "truck" },
  { title: "Cliente", value: "client" },
  { title: "Recepción", value: "startingDate" },
  { title: "Carga", value: "endingDate" },
  { title: "Estado", value: "state" },
  { title: "Alarmas", value: "alarms" },
  { title: "Progreso", value: "progress", align: "center" },
]);

// Datos simulados
const items = ref<TableItem[]>([
  {
    id: 1,
    truck: "KJK-678",
    client: "YPF",
    startingDate: "2024-01-01 08:00:00",
    endingDate: "2024-01-01 18:00:00",
    state: "REGISTERED_FINAL_WEIGHING",
    alarms: "Sin alarmas",
    progress: 49,
  },
  {
    id: 2,
    truck: "KJK-678",
    client: "Shell",
    startingDate: "2024-02-15 09:00:00",
    endingDate: "2024-02-15 20:00:00",
    state: "REGISTERED_FINAL_WEIGHING",
    alarms: "Pendiente",
    progress: 24,
  },
  {
    id: 3,
    truck: "KJK-678",
    client: "ExxonMobil",
    startingDate: "2024-03-10 07:30:00",
    endingDate: "2024-03-10 17:30:00",
    state: "REGISTERED_FINAL_WEIGHING",
    alarms: "Problema",
    progress: 75,
  },
  {
    id: 4,
    truck: "KJK-678",
    client: "Repsol",
    startingDate: "2024-04-05 06:00:00",
    endingDate: "2024-04-05 16:00:00",
    state: "REGISTERED_FINAL_WEIGHING",
    alarms: "Sin alarmas",
    progress: 95,
  },
  {
    id: 5,
    truck: "KJK-678",
    client: "Repsol",
    startingDate: "2024-04-05 06:00:00",
    endingDate: "2024-04-05 16:00:00",
    state: "REGISTERED_FINAL_WEIGHING",
    alarms: "Sin alarmas",
    progress: 95,
  },
  {
    id: 6,
    truck: "KJK-678",
    client: "Repsol",
    startingDate: "2024-04-05 06:00:00",
    endingDate: "2024-04-05 16:00:00",
    state: "REGISTERED_FINAL_WEIGHING",
    alarms: "Sin alarmas",
    progress: 95,
  },
  {
    id: 7,
    truck: "KJK-678",
    client: "Repsol",
    startingDate: "2024-04-05 06:00:00",
    endingDate: "2024-04-05 16:00:00",
    state: "REGISTERED_FINAL_WEIGHING",
    alarms: "Sin alarmas",
    progress: 95,
  },
  {
    id: 8,
    truck: "KJK-678",
    client: "Repsol",
    startingDate: "2024-04-05 06:00:00",
    endingDate: "2024-04-05 16:00:00",
    state: "REGISTERED_FINAL_WEIGHING",
    alarms: "Sin alarmas",
    progress: 95,
  },
  {
    id: 9,
    truck: "KJK-678",
    client: "Repsol",
    startingDate: "2024-04-05 06:00:00",
    endingDate: "2024-04-05 16:00:00",
    state: "REGISTERED_FINAL_WEIGHING",
    alarms: "Sin alarmas",
    progress: 95,
  },
  
]);
// Función para aplicar estilos condicionales a las advertencias
const getWarningClass = (warning: string): string => {
  if (warning === "Sin alarmas") return "text-success";
  if (warning === "Problema") return "text-danger";
  if (warning === "Pendiente") return "text-warning";
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
    <!-- Columna de ubicación con ícono -->
    <template #item.truck="{ item }">
      <router-link :to="`/admin/orders/${item.id}`" class="d-flex align-center truck-link">
        <v-icon class="mr-2">mdi-tanker-truck</v-icon>
        <span>{{ item.truck }}</span>
      </router-link>
    </template>

    <!-- Columna de advertencias con estilos -->
    <template #item.alarms="{ item }">
      <span :class="getWarningClass(item.alarms)">
        {{ item.alarms }}
      </span>
    </template>

    <!-- TODO: Que muestre la barra a partir de estado 2 -->
    <!-- Columna de progreso con barra -->
    <template #item.progress="{ item }">
      <v-progress-linear
        :value="item.progress"
        bg-color="white"
        color="#6D40E4"
        rounded
        height="10"
        :model-value="item.progress"
      ></v-progress-linear>
      <span class="ml-2">{{ item.progress }}%</span>
    </template>
  </v-data-table-server>
</template>

<style>
/* TODO: Acomodar esto que está asqueroso */
.text-success {
  color: rgb(0, 255, 0);
  font-weight: bold;
}
.text-danger {
  color: rgb(255, 0, 0);
  font-weight: bold;
}
.text-warning {
  color: rgb(255, 165, 0);
  font-weight: bold;
}
.truck-link {
  color: #fff;
  text-decoration: none;
}
.truck-link:hover {
  color: #6D40E4;
}
</style>
