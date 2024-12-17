<script setup lang="ts">
import { ref, watch } from "vue";
import { format } from "date-fns";
import type { Alarm } from "@/interfaces/alarm.interface";
import { es } from "date-fns/locale";

// Props
const props = defineProps({
  items: {
    type: Array as () => Alarm[],
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
  setPageA: {
    type: Function,
    required: true,
  },
  isLoading: Boolean,
});

const currentPage = ref(props.currentPage);

const handlePageChange = (page: number) => {
  currentPage.value = page;
  props.setPageA(page - 1);
};

watch(
  () => props.currentPage,
  (newPage) => {
    currentPage.value = newPage;
  }
);

// Encabezados de la tabla
const headers = ref<
  Array<{ title: string; value: string; align?: "start" | "center" | "end" }>
>([
  { title: "ID", value: "id" },
  { title: "Estado", value: "status" },
  { title: "Timestamp", value: "timeStamp" },
  { title: "Temperatura (°C)", value: "temperature", align: "center" },
]);

// Función para formatear la fecha
const formatDate = (timestamp: string) => {
  return format(new Date(timestamp), "dd/MM/yyyy HH:mm:ss");
};

// Mapeo de estados a nombres y clases de estilo
const getStatusInfo = (status: string) => {
  const statusMap: Record<string, { name: string; class: string }> = {
    ACKNOWLEDGED: { name: "RECONOCIDA", class: "text-success" },
    PENDING_REVIEW: { name: "PENDIENTE", class: "text-warning" },
    CONFIRMED_ISSUE: { name: "PROBLEMA", class: "text-danger" },
  };

  return statusMap[status] || { name: "DESCONOCIDO", class: "" };
};

// Función para asignar clases de temperatura
const getTemperatureClass = (temperature: number): string => {
  if (temperature > 50) return "text-danger";
  return "";
};
</script>

<template>
  <v-card>
    <v-card-title>
      Alarmas de Temperatura -
      {{ format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: es }) }}
    </v-card-title>

    <v-data-table-server :headers="headers" :items="items" item-value="id" class="elevation-1 tabla" show-expand
      single-expand :items-per-page="pageSize" :loading="isLoading" :page="currentPage" :items-length="totalElements"
      hide-default-footer @update:page="handlePageChange">
      <!-- Columna ID -->
      <template #item.id="{ item }">
        <transition-group name="fade" tag="span">
          <span :key="`id-${item.id}`">{{ item.id }}</span>
        </transition-group>
      </template>

      <!-- Columna Estado -->
      <template #item.status="{ item }">
        <transition-group name="fade" tag="span">
          <span :key="`status-${item.id}`" :class="getStatusInfo(item.status).class">
            {{ getStatusInfo(item.status).name }}
          </span>
        </transition-group>
      </template>

      <!-- Columna Timestamp -->
      <template #item.timeStamp="{ item }">
        <transition-group name="fade" tag="span">
          <span :key="`timestamp-${item.id}`">{{
            formatDate(item.timeStamp)
          }}</span>
        </transition-group>
      </template>

      <!-- Columna Temperatura -->
      <template #item.temperature="{ item }">
        <transition-group name="fade" tag="span">
          <span :key="`temperature-${item.id}`" :class="getTemperatureClass(item.temperature)">
            {{ item.temperature }} °C
          </span>
        </transition-group>
      </template>

      <!-- Contenido Expandido -->
      <template v-slot:expanded-row="{ columns, item }">
        <tr class="pa-4">
          <td :colspan="columns.length">
            <p>
              <strong>Observación:</strong>
              {{ item.observations || "Sin observaciones" }}
            </p>
            <p>
              <strong>Operador Responsable:</strong>
              {{ item.user || "Sin asignar" }}
            </p>
          </td>
        </tr>
      </template>

      <!-- Footer personalizado -->
      <template #bottom>
        <v-container class="d-flex justify-center">
          <v-pagination :model-value="currentPage" :length="totalPages" :total-visible="5"
            @update:modelValue="handlePageChange" />
        </v-container>
      </template>
    </v-data-table-server>
  </v-card>
</template>

<style lang="scss" src="/src/styles/global.scss"></style>
