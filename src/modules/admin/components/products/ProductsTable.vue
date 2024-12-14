<script setup lang="ts">
import { ref, defineEmits } from "vue";
import type { Product } from "@/interfaces/products.interface";

const props = defineProps({
  products: {
    type: Array as () => Product[],
    required: true,
  },
  isLoading: Boolean,
});

const emit = defineEmits(["edit", "delete"]);

// Headers de la tabla
const headers = ref([
  { title: "ID", value: "id" },
  { title: "Descripción", value: "description" },
  { title: "Producto", value: "product" },
  { title: "Stock", value: "stock" },
  { title: "Temperatura Umbral (°C)", value: "thresholdTemperature" },
  { title: "Densidad (kg/m³)", value: "density" },
  { title: "Acciones", value: "actions", align: "center" as const },
]);

// Función para manejar acciones del menú
const handleAction = (action: string, product: Product) => {
  if (action === "edit") {
    emit("edit", product);
  } else if (action === "delete") {
    emit("delete", product);
  }
};
</script>

<template>
  <v-data-table :headers="headers" :items="products" item-value="id" class="elevation-1 data-container"
    :loading="isLoading">
    <!-- Columna de Acciones -->
    <template #item.actions="{ item }">
      <v-menu>
        <template #activator="{ props }">
          <v-btn icon v-bind="props" class="btn-menu" flat>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list class="menu-list" bg-color="#111C44">
          <v-list-item @click="handleAction('edit', item)">
            <v-list-item-title>Editar</v-list-item-title>
          </v-list-item>
          <v-list-item @click="handleAction('delete', item)">
            <v-list-item-title class="text-red">Eliminar</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-data-table>
</template>
