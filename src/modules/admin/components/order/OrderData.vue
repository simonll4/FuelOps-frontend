<script setup lang="ts">
import { format } from "date-fns";

import type { Order } from "@/interfaces/order.interface";

// Propiedades del componente
defineProps({
  order: {
    type: Object as () => Order,
    required: true,
  },
});

// Función para formatear fechas
const formatDate = (date: string | null): string | null => {
  if (!date) return null;
  return format(new Date(date), "dd/MM/yyyy HH:mm");
};

</script>

<template>
  <v-card class="mb-4 data-container" color="container-color">
    <v-card-text>
      <v-row>
        <!-- Columna 1 -->
        <v-col cols="12" md="6">
          <p><strong>Número de Orden:</strong> {{ order.id }}</p>
          <p><strong>Estado:</strong> {{ order.status }}</p>
          <p><strong>Camión:</strong> {{ order.truck.licensePlate }}</p>
          <p><strong>Fecha de Recepción:</strong> {{ formatDate(order.receptionDate) }}</p>
          <p><strong>Fecha Estimada:</strong> {{ formatDate(order.estimatedDate) }}</p>
        </v-col>

        <!-- Columna 2 -->
        <v-col cols="12" md="6">
          <p><strong>Cliente:</strong> {{ order.customer.businessName }}</p>
          <p><strong>Preset:</strong> {{ order.preset }} kg</p>
          <p><strong>Fecha de Pesaje Inicial:</strong> {{ formatDate(order.initialWeighingDate) || 'No disponible' }}
          </p>
          <p><strong>Inicio de Carga:</strong> {{ formatDate(order.fuelingStartDate) || 'No disponible' }}</p>
          <p><strong>Fin de Carga:</strong> {{ formatDate(order.fuelingEndDate) || 'No disponible' }}</p>
          <p><strong>Fecha de Pesaje Final:</strong> {{ formatDate(order.finalWeighingDate) || 'No disponible' }}</p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.data-container {
  background-color: #111c44;
  border-radius: 12px;
}
</style>

<!-- <script setup lang="ts">
import { ref } from "vue";
const orderNumber = ref("12345");
const status = ref("In Progress");
const truck = ref("ABC-123");
const driver = ref("John Doe");
const client = ref("Acme Corp.");
const product = ref("Liquid Gas");
const preset = ref(5000);
const initialWeight = ref(12000);
const finalWeight = ref(17000);


</script>

<template>
  <v-card class="mb-4 data-container" color="container-color">
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <p><strong>Order Number:</strong> {{ orderNumber }}</p>
          <p><strong>Status:</strong> {{ status }}</p>
          <p><strong>Truck:</strong> {{ truck }}</p>
          <p><strong>Driver:</strong> {{ driver }}</p>
        </v-col>
        <v-col cols="12" md="6">
          <p><strong>Client:</strong> {{ client }}</p>
          <p><strong>Product:</strong> {{ product }}</p>
          <p><strong>Preset:</strong> {{ preset }} kg</p>
          <p><strong>Initial Weight:</strong> {{ initialWeight }} kg</p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template> -->
