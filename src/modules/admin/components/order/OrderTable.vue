<script setup lang="ts">
import { ref, watch } from "vue";
import type { TableItem } from '@/interfaces/table-item.interface';
import type { OrderStates } from '@/interfaces/order-states.interface';

const orderStates: OrderStates = {
  ORDER_CANCELLED: 'ORDER_CANCELLED',
  ORDER_RECEIVED: 'ORDER_RECEIVED',
  REGISTERED_INITIAL_WEIGHING: 'REGISTERED_INITIAL_WEIGHING',
  ORDER_CLOSED: 'ORDER_CLOSED',
  REGISTERED_FINAL_WEIGHING: 'REGISTERED_FINAL_WEIGHING',
};

const props = defineProps({
  items: {
    type: Array as () => TableItem[],
    default: () => [],
  },
  totalElements: {
    type: Number,
    default: 0,
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
  isLoading: Boolean,
});

const emit = defineEmits(["update:page"]);
const currentPage = ref(props.currentPage);

const handlePageChange = (page: number) => {
  currentPage.value = page;
  emit("update:page", page);
};

watch(() => props.currentPage, (newPage: number) => {
  currentPage.value = newPage;
});

// Definición de los encabezados de la tabla
const headers = ref<Array<{ title: string; value: string; align?: "start" | "center" | "end" }>>([
  { title: "Camión", value: "truck" },
  { title: "Cliente", value: "customer" },
  { title: "Recepción", value: "receptionDate" },
  { title: "Carga", value: "estimatedDate" },
  { title: "Estado", value: "status" },
  { title: "Alarmas", value: "alarmStatus" },
]);

// Función para aplicar estilos condicionales a las advertencias
const getWarningClass = (warning: string): string => {
  console.log(warning);
  if (warning === "Sin alarmas") return "text-success";
  if (warning === "Problema") return "text-danger";
  if (warning === "Pendiente") return "text-warning";
  return "";
};

import { format } from "date-fns";

const formatDate = (timestamp: string) => {
  return format(new Date(timestamp), "dd/MM/yyyy HH:mm:ss");
};
</script>

<template>
  <v-data-table-server :key="items.length" :headers="headers" :items="items" :items-length="totalElements"
    item-value="id" class="elevation-1" :items-per-page="5" :items-per-page-options="[]" :loading="isLoading"
    hide-default-footer @update:page="handlePageChange">
    <!-- Columna de ubicación con ícono -->
    <template #item.truck="{ item }">
      <router-link :to="`/admin/orders/${item.id}`" class="d-flex align-center truck-link">
        <v-icon class="mr-2">mdi-tanker-truck</v-icon>
        <span>{{ item.truck.licensePlate }}</span>
      </router-link>
    </template>

    <template #item.customer="{ item }">
      <span>{{ item.customer.businessName }}</span>
    </template>

    <template #item.receptionDate="{ item }">
      <span>{{ formatDate(item.receptionDate) }}</span>
    </template>

    <template #item.estimatedDate="{ item }">
      <span>{{ formatDate(item.estimatedDate) }}</span>
    </template>

    <!-- Columna de advertencias con estilos -->
    <template #item.alarmStatus="{ item }">
      <span :class="getWarningClass(item.alarmStatus.state)">
        {{ item.alarmStatus.state }}
      </span>
    </template>

    <!-- Footer personalizado -->
    <template #bottom>
      <v-container class="d-flex justify-center">
        <v-pagination :model-value="currentPage" :length="totalPages" :total-visible="pageSize"
          @update:modelValue="handlePageChange"></v-pagination>
      </v-container>
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
