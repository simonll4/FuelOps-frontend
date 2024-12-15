<script setup lang="ts">
import { ref, defineEmits } from "vue";
import type { Product } from "@/interfaces/products.interface";

// Props para recibir los productos
const props = defineProps({
  products: {
    type: Array as () => Product[],
    required: true,
  },
  isLoading: Boolean,
  totalElements: {
    type: Number,
    default: 0,
  },
  currentPage: Number,
  itemsPerPage: {
    type: Number,
    default: 5,
  },
});

const emit = defineEmits(["edit", "delete", "page-change"]);

// Headers de la tabla
const headers = ref([
  { title: "ID", value: "id" },
  { title: "Descripción", value: "descripcion" },
  { title: "Producto", value: "producto" },
  { title: "Stock", value: "stock" },
  { title: "Temperatura Umbral (°C)", value: "temperaturaUmbral" },
  { title: "Densidad (kg/m³)", value: "densidad" },
  { title: "Acciones", value: "actions", align: "center" as const },
]);

// Función para manejar cambios de página
const handlePageChange = (page: number) => {
  emit("page-change", page);
};

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
  <v-data-table-server
    :headers="headers"
    :items="products"
    :items-length="totalElements"
    item-value="id"
    class="elevation-1 data-container"
    :items-per-page="itemsPerPage"
    :items-per-page-options="[]"
    :loading="isLoading"
    :page="currentPage"
    hide-default-footer
    @update:page="handlePageChange"
  >
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

    <!-- Footer personalizado -->
    <template #bottom>
      <v-container class="d-flex justify-center">
        <v-pagination
          :model-value="currentPage"
          :length="Math.ceil(totalElements / itemsPerPage)"
          :total-visible="5"
          @update:model-value="handlePageChange"
        ></v-pagination>
      </v-container>
    </template>
  </v-data-table-server>
</template>
