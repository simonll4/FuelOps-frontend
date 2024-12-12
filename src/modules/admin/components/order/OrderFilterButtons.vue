<script setup lang="ts">
import { ref, defineEmits } from "vue";

// Estados de las órdenes con nombres abreviados y colores asignados
const orderStates = ref([
  { key: "ORDER_RECEIVED", label: "Recibida", color: "#2196F3" }, // Azul
  {
    key: "REGISTERED_INITIAL_WEIGHING",
    label: "Pesaje Inicial",
    color: "#FFC107",
  }, // Amarillo
  { key: "REGISTERED_FINAL_WEIGHING", label: "Pesaje Final", color: "#9C27B0" }, // Púrpura
  { key: "ORDER_CLOSED", label: "Cerrada", color: "#4CAF50" }, // Verde
  { key: "ORDER_CANCELLED", label: "Cancelada", color: "#FF5252" }, // Rojo
]);

// Estado para el filtro activo
const activeFilter = ref<string | null>(null);

// Emitir evento cuando se selecciona o deselecciona un filtro
const emit = defineEmits(["filterOrders"]);

const handleFilter = (stateKey: string) => {
  if (activeFilter.value === stateKey) {
    // Deseleccionar filtro
    activeFilter.value = null;
    emit("filterOrders", null);
  } else {
    // Seleccionar nuevo filtro
    activeFilter.value = stateKey;
    emit("filterOrders", stateKey);
  }
};
</script>

<template>
  <v-row class="ps-2">
    <v-card
      v-for="state in orderStates"
      :key="state.key"
      class="mx-2 mb-2"
      outlined
      width="150"
      :style="{
        border: `1px solid ${state.color}`,
        backgroundColor:
          activeFilter === state.key ? state.color : 'transparent',
        color: activeFilter === state.key ? 'white' : state.color,
      }"
      @click="handleFilter(state.key)"
    >
      <v-card-text class="d-flex align-center justify-center">
        <v-icon
          class="mr-2"
          :style="{ color: activeFilter === state.key ? 'white' : state.color }"
        >
          mdi-tanker-truck
        </v-icon>
        <span>{{ state.label }}</span>
      </v-card-text>
    </v-card>
  </v-row>
</template>

<style scoped>
.v-card {
  cursor: pointer;
  transition: transform 0.2s;
}

.v-card:hover {
  transform: scale(1.05);
}
</style>
