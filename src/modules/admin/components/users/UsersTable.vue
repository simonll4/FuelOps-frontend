<!-- src/components/UserTable.vue -->
<script setup lang="ts">
import { ref } from "vue";
import type { UserResponse } from "@/interfaces/users.interface";

// Props para recibir datos y control de paginación
const props = defineProps({
  items: {
    type: Array as () => UserResponse[],
    default: () => [],
  },
  totalElements: {
    type: Number,
    default: 0,
  },
  isLoading: Boolean,
});

const emit = defineEmits(["update:page", "edit", "deactivate", "delete"]);

// Definición de los encabezados de la tabla
const headers = ref<{ title: string; value: string; align?: "center" | "end" | "start" }[]>([
  { title: "ID", value: "id" },
  { title: "Email", value: "email" },
  { title: "Username", value: "username" },
  { title: "Roles", value: "roles" },
  { title: "Estado", value: "status" },
  { title: "Acciones", value: "actions", align: "center"},
]);

// Paginación
const currentPage = ref(1);
const itemsPerPage = 5;
const totalPages = ref(Math.ceil(props.totalElements / itemsPerPage));

// Maneja el cambio de página
const handlePageChange = (page: number) => {
  currentPage.value = page;
  emit("update:page", page);
};

// Función para emitir eventos de acciones
const handleAction = (action: "edit" | "deactivate" | "delete", item: UserResponse) => {
  emit(action, item);
};
</script>

<template>
  <v-data-table-server
    :headers="headers"
    :items="items"
    :items-length="Math.max(totalElements, items.length)"
    item-value="id"
    class="elevation-1 data-container"
    :items-per-page="itemsPerPage"
    :items-per-page-options="[]"
    :loading="isLoading"
    :page="currentPage"
    hide-default-footer
    @update:page="handlePageChange"
  >
    <!-- Columna de Roles -->
    <template #item.roles="{ item }">
      <span>{{ item.rol }}</span>
    </template>

    <!-- Columna de Estado -->
    <template #item.status="{ item }">
      <v-chip :color="item.status === 'Activa' ? 'green' : 'red'">
        {{ item.status }}
      </v-chip>
    </template>

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
          <v-list-item @click="handleAction('deactivate', item)">
            <v-list-item-title>Desactivar</v-list-item-title>
          </v-list-item>
          <v-list-item @click="handleAction('delete', item)">
            <v-list-item-title class="text-red">Borrar</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>

    <!-- Footer personalizado -->
    <template #bottom>
      <v-container class="d-flex justify-center">
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          :total-visible="5"
          @update:modelValue="handlePageChange"
        ></v-pagination>
      </v-container>
    </template>
  </v-data-table-server>
</template>

<style lang="scss" src="/src/styles/global.scss"></style>