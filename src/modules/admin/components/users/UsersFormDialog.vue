<!-- src/modules/admin/components/users/UserFormDialog.vue -->
<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from "vue";
import type { UserResponse } from "@/interfaces/users.interface";
import type { Role } from "@/interfaces/users.interface";

// Props para modo de edición
const props = defineProps({
  isOpen: Boolean,
  isEditMode: Boolean,
  userData: {
    type: Object as () => UserResponse,
    default: () => ({ email: "", username: "", roles: [] }),
  },
});

const emit = defineEmits(["close", "submit"]);

// Roles disponibles según tipo
const internalRoles: Role[] = [
  { id: 1, description: "Administrador", name: "ROLE_ADMIN" },
  { id: 2, description: "Operador", name: "ROLE_OPERATOR" },
];

const externalRoles: Role[] = [
  { id: 3, description: "Cliente 1", name: "ROLE_CLI1" },
  { id: 4, description: "Cliente 2", name: "ROLE_CLI2" },
  { id: 5, description: "Cliente 3", name: "ROLE_CLI3" },
];

// Estado para tipo de usuario (interno/externo)
const isInternal = ref(true);

// Form data inicializado con valores vacíos o con datos del usuario a editar
const formData = ref({
  ...props.userData,
  password: "",
  roles: props.userData.roles.map((role: Role) => role.name) || [],
});

// Sincronizar los datos cuando se recibe `userData` en modo edición
watch(
  () => props.userData,
  (newData) => {
    formData.value = { ...newData, password: "", roles: newData.roles.map((role: Role) => role.name) || [] };
  },
  { immediate: true }
);

// Función para cerrar el diálogo
const closeDialog = () => {
  emit("close");
};

// Función para enviar el formulario
const submitForm = () => {
  const transformedRoles = formData.value.roles.map((roleName: string) => {
    return (
      internalRoles.find((role) => role.name === roleName) ||
      externalRoles.find((role) => role.name === roleName)
    );
  }).filter(Boolean) as Role[];

  const payload = { ...formData.value, roles: transformedRoles };

  emit("submit", payload);
};
</script>

<template>
  <v-dialog :model-value="isOpen" @update:model-value="emit('close')" max-width="500px">
    <v-card class="data-container">
      <v-card-title class="headline">
        {{ isEditMode ? "Editar Usuario" : "Agregar Usuario" }}
      </v-card-title>

      <v-card-text>
        <!-- Checkbox para seleccionar tipo de usuario (solo en modo agregar) -->
        <v-checkbox v-if="!isEditMode" v-model="isInternal" label="¿Es usuario interno?"></v-checkbox>

        <!-- Campo Email -->
        <v-text-field v-model="formData.email" label="Email" required></v-text-field>

        <!-- Campo Username -->
        <v-text-field v-model="formData.username" label="Username" required></v-text-field>

        <!-- Campo Contraseña (solo en modo agregar) -->
        <v-text-field v-if="!isEditMode" v-model="formData.password" label="Contraseña" type="password"
          required></v-text-field>

        <!-- Toggle para roles según tipo de usuario -->
        <v-select v-model="formData.roles" :items="isInternal ? internalRoles : externalRoles" item-value="id"
          item-title="description" label="Roles" multiple required></v-select>


      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" @click="closeDialog">Cancelar</v-btn>
        <v-btn color="primary" @click="submitForm">
          {{ isEditMode ? "Guardar Cambios" : "Agregar Usuario" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" src="/src/styles/global.scss"></style>