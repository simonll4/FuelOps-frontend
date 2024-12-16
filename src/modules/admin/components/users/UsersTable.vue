<!-- src/components/UserTable.vue -->
<script setup lang="ts">
import { ref } from "vue";
import type { Role, UserResponse } from "@/interfaces/users.interface";

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

const emit = defineEmits(["edit", "deactivate", "delete"]);

const headers = ref<{ title: string; value: string; align?: "center" | "end" | "start" }[]>([
  { title: "ID", value: "id" },
  { title: "Email", value: "email" },
  { title: "Username", value: "username" },
  { title: "Roles", value: "roles" },
  { title: "Estado", value: "status" },
  { title: "Acciones", value: "actions", align: "center" },
]);

const roleDescriptions: Record<string, string> = {
  ROLE_ADMIN: "admin",
  ROLE_OPERATOR: "operador",
  ROLE_CLI1: "cli1",
  ROLE_CLI2: "cli2",
  ROLE_CLI3: "cli3",
};

const mapRoles = (roles: Role[]): string => {
  return roles.map((role) => roleDescriptions[role.name] || role).join(", ");
};

const handleAction = (action: "edit" | "deactivate" | "delete", item: UserResponse) => {
  emit(action, item);
};
</script>


<template>
  <v-data-table-server :headers="headers" :items="items" :items-length="Math.max(totalElements, items.length)"
    item-value="id" class="elevation-1 data-container" :loading="isLoading" hide-default-footer>
    <!-- Columna de Roles -->
    <template #item.roles="{ item }">
      <span>{{ mapRoles(item.roles) }}</span>
    </template>

    <!-- Columna de Estado -->
    <template #item.status="{ item }">
      <v-chip :color="item.enabled === true ? 'green' : 'red'">
        {{ item.enabled === true ? "Habilitada" : "Deshabilitada" }}
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
            <v-list-item-title>{{ item.enabled ? 'Desactivar' : 'Activar' }}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="handleAction('delete', item)">
            <v-list-item-title class="text-red">Borrar</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-data-table-server>
</template>

<style lang="scss" src="/src/styles/global.scss"></style>