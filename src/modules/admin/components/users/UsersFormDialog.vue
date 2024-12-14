<!-- src/modules/admin/components/users/UserFormDialog.vue -->
<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from "vue";

// Props para modo de edición
const props = defineProps({
  isOpen: Boolean,
  isEditMode: Boolean,
  userData: {
    type: Object as () => { email: string; username: string; rol: string },
    default: () => ({ email: "", username: "", rol: "" }),
  },
});

const emit = defineEmits(["close", "submit"]);

// Estado para tipo de usuario (interno/externo)
const isInternal = ref(true);

// Opciones de roles para usuarios internos y externos
const internalRoles = ["admin", "operador"];
const externalRoles = ["cli1", "cli2", "cli3"];

// Form data inicializado con valores vacíos o con datos del usuario a editar
const formData = ref({ email: "", username: "", rol: "", password: "" });

// Sincronizar los datos cuando se recibe `userData` en modo edición
watch(
  () => props.userData,
  (newData) => {
    formData.value = { ...newData, password: "" }; // No asignar contraseña en modo edición
  },
  { immediate: true }
);

// Función para cerrar el diálogo
const closeDialog = () => {
  emit("close");
};

// Función para enviar el formulario
const submitForm = () => {
  emit("submit", formData.value);
};
</script>

<template>
  <v-dialog
    :model-value="isOpen"
    @update:model-value="emit('close')"
    max-width="500px"
  >
    <v-card class="data-container">
      <v-card-title class="headline">
        {{ isEditMode ? "Editar Usuario" : "Agregar Usuario" }}
      </v-card-title>

      <v-card-text>
        <!-- Checkbox para seleccionar tipo de usuario (solo en modo agregar) -->
        <v-checkbox
          v-if="!isEditMode"
          v-model="isInternal"
          label="¿Es usuario interno?"
        ></v-checkbox>

        <!-- Campo Email -->
        <v-text-field
          v-model="formData.email"
          label="Email"
          required
        ></v-text-field>

        <!-- Campo Username -->
        <v-text-field
          v-model="formData.username"
          label="Username"
          required
        ></v-text-field>

        <!-- Campo Contraseña (solo en modo agregar) -->
        <v-text-field
          v-if="!isEditMode"
          v-model="formData.password"
          label="Contraseña"
          type="password"
          required
        ></v-text-field>

        <!-- Toggle para roles según tipo de usuario -->
        <v-select
          v-model="formData.rol"
          :items="isInternal ? internalRoles : externalRoles"
          label="Rol"
          required
        ></v-select>
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