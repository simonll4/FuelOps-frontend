<script setup lang="ts">
import { ref } from "vue";
import type { Alarm } from "@/interfaces/alarm.interface";

// Umbral de temperatura (puedes configurarlo dinámicamente si lo necesitas)
const thresholdTemperature = ref(50); // °C

//TODO: Configurar el items per page para que no muestre un scroll
// Datos simulados de las alarmas
const alarms = ref<Alarm[]>([
  {
    id: 1,
    orderId: 1,
    state: "Pendiente",
    timestamp: "2024-11-17 08:30:00",
    temperature: 55,
    observation: "Temperatura excedió el umbral",
    operator: null,
  },
  {
    id: 2,
    orderId: 1,
    state: "Aceptada",
    timestamp: "2024-11-17 09:00:00",
    temperature: 48,
    observation: null,
    operator: "John Doe",
  },
  {
    id: 3,
    orderId: 1,
    state: "Pendiente",
    timestamp: "2024-11-17 10:15:00",
    temperature: 52,
    observation: "Monitorear cambios",
    operator: null,
  },
]);

// Encabezados de la tabla
const headers = ref<
  { title: string; value: string; align?: "center" | "start" | "end" }[]
>([
  { title: "ID", value: "id" },
  { title: "Estado", value: "state" },
  { title: "Timestamp", value: "timestamp" },
  { title: "Temperatura (°C)", value: "temperature", align: "center" },
]);

// Clases para el estado
const getStateClass = (state: string): string => {
  if (state === "Pendiente") return "text-warning";
  if (state === "Aceptada") return "text-success";
  return "";
};
</script>

<template>
  <v-card class="mb-4" outlined>
    <v-card-title>Alarmas de Temperatura</v-card-title>
    <v-data-table-server :headers="headers" :items="alarms" :items-length="alarms.length" item-value="id"
      class="elevation-1 tabla" show-expand single-expand height="260">
      <!-- Columna Estado con color -->
      <template #item.state="{ item }">
        <span :class="getStateClass(item.state)">
          {{ item.state }}
        </span>
      </template>

      <!-- Columna Temperatura con advertencia si excede el umbral -->
      <template #item.temperature="{ item }">
        <span :class="{ 'text-danger': item.temperature > thresholdTemperature }">
          {{ item.temperature }}°C
        </span>
      </template>

      <!-- Contenido Expandido -->
      <template v-slot:expanded-row="{ columns, item }">
        <tr class="pa-4">
          <td :colspan="columns.length">
            <p>
              <strong>Observación:</strong>
              {{ item.observation || "Sin observaciones" }}
            </p>
            <p>
              <strong>Operador Responsable:</strong>
              {{ item.operator || "Sin asignar" }}
            </p>
          </td>
        </tr>
      </template>
    </v-data-table-server>
  </v-card>
</template>

<style lang="scss" src="/src/styles/global.scss"></style>
