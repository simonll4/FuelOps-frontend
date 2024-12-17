<script setup lang="ts">
import { format, differenceInSeconds } from "date-fns";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

import type { Order } from "@/interfaces/order.interface";
import type { OrderDetail } from "@/interfaces/order-details.interface";

// Propiedades del componente
const props = defineProps({
  order: {
    type: Object as () => Order,
    required: true,
  },
  detail: {
    type: Object as () => OrderDetail | null,
    required: false,
  },
});

// Función para formatear fechas
const formatDate = (date: string | null): string | null => {
  if (!date) return null;
  return format(new Date(date), "dd/MM/yyyy HH:mm");
};

const formatDuration = (seconds: number): string => {
  const days = Math.floor(seconds / 86400); // Un día tiene 86400 segundos
  const remainingSecondsAfterDays = seconds % 86400;
  const hours = Math.floor(remainingSecondsAfterDays / 3600);
  const remainingSecondsAfterHours = remainingSecondsAfterDays % 3600;
  const minutes = Math.floor(remainingSecondsAfterHours / 60);
  const secs = remainingSecondsAfterHours % 60;

  const formattedDays = days > 0 ? `${days}d ` : ""; // Agregar días solo si existen
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(secs).padStart(2, "0");

  return `${formattedDays}${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

// Ref para el tiempo transcurrido
const elapsedTime = ref<string | null>(null);

// Temporizador para actualizar el tiempo transcurrido
let timer: ReturnType<typeof setInterval> | null = null;

const updateElapsedTime = () => {
  if (!props.order.fuelingStartDate && !props.order.fuelingEndDate) {
    elapsedTime.value = null;
    return;
  }
  const start = new Date(props.order.fuelingStartDate);
  const now = new Date(props.detail?.timeStamp ?? new Date());
  const seconds = differenceInSeconds(now, start);
  elapsedTime.value = formatDuration(seconds);
};

// Configurar el temporizador cuando se monta el componente
onMounted(() => {
  updateElapsedTime();
});

// Limpiar el temporizador cuando se desmonta el componente
onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});

// Watch para recalcular tiempo cuando cambia `detail`
watch(() => props.detail, () => {
  updateElapsedTime();
});

// Computed para calcular el tiempo de finalización
const completionTime = computed(() => {
  if (!props.order.fuelingStartDate || !props.order.fuelingEndDate) return null;
  const start = new Date(props.order.fuelingStartDate);
  const end = new Date(props.order.fuelingEndDate);
  const seconds = differenceInSeconds(end, start);
  return formatDuration(seconds);
});

// Equivalencia de nombres para los OrderStates
const orderStates = [
  { key: "ORDER_RECEIVED", label: "RECIBIDA"},
  { key: "REGISTERED_INITIAL_WEIGHING", label: "PESAJE INICIAL" },
  { key: "ORDER_CLOSED", label: "CERRADA"},
  { key: "REGISTERED_FINAL_WEIGHING", label: "PESAJE FINAL" },
  { key: "ORDER_CANCELLED", label: "CANCELADA" },
];

const getOrderState = (status: string) => {
  return orderStates.find((state) => state.key === status) || { label: status}; // Color gris por defecto
};


</script>

<template>
  <v-card class="mb-4 data-container" color="container-color">
    <v-card-text>
      <v-row>
        <!-- Columna 1 -->
        <v-col cols="12" md="6">
          <p><strong>Número de Orden:</strong> {{ order.id }}</p>
          <p><strong>Camión:</strong> {{ order.truck.licensePlate }}</p>
          <p>
            <strong>Fecha de Recepción:</strong>
            {{ formatDate(order.receptionDate) }}
          </p>
          <p>
            <strong>Fecha Estimada:</strong>
            {{ formatDate(order.estimatedDate) }}
          </p>
        </v-col>

        <!-- Columna 2 -->
        <v-col cols="12" md="6">
          <p><strong>Cliente:</strong> {{ order.customer.businessName }}</p>
          <p><strong>Preset:</strong> {{ order.preset }} kg</p>
          <p>
            <strong>Fecha de Pesaje Inicial:</strong>
            {{ formatDate(order.initialWeighingDate) || "No disponible" }}
          </p>
          <p>
            <strong>Inicio de Carga:</strong>
            {{ formatDate(order.fuelingStartDate) || "No disponible" }}
          </p>
          <p>
            <strong>Fin de Carga:</strong>
            {{ formatDate(order.fuelingEndDate) || "No disponible" }}
          </p>
          <p>
            <strong>Fecha de Pesaje Final:</strong>
            {{ formatDate(order.finalWeighingDate) || "No disponible" }}
          </p>
        </v-col>
      </v-row>

      <!-- Tiempo transcurrido o tiempo de finalización -->
      <v-row>
        <v-col cols="6">
          <v-chip color="red" class="mt-2" v-if="order.status">
            {{ getOrderState(order.status).label }}
          </v-chip>
        </v-col>
        <v-col cols="6">
          <v-chip color="info" class="mt-2" v-if="
            order.status == 'REGISTERED_INITIAL_WEIGHING' &&
            order.fuelingStartDate
          ">
            Tiempo Transcurrido: {{ elapsedTime }}
          </v-chip>

          <v-chip color="success" class="mt-2" v-else-if="
            order.status == 'ORDER_CLOSED' ||
            order.status == 'REGISTERED_FINAL_WEIGHING'
          ">
            Tiempo de Carga: {{ completionTime }}
          </v-chip>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style lang="scss" src="/src/styles/global.scss"></style>