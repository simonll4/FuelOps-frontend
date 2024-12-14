<!-- src/views/UsersView.vue -->
<script setup lang="ts">
import { ref } from "vue";

import type { UserResponse } from "@/interfaces/users.interface";

import AdminLayout from "../layouts/AdminLayout.vue";
import UserTable from "@/modules/admin/components/users/UsersTable.vue";
import UserFormDialog from "@/modules/admin/components/users/UsersFormDialog.vue";

// Datos mock para usuarios internos
const internalUsers = ref<UserResponse[]>([
  {
    id: 1,
    email: "admin@example.com",
    username: "admin1",
    rol: "admin",
    status: "Activa",
  },
  {
    id: 2,
    email: "operator@example.com",
    username: "operator1",
    rol: "operator",
    status: "Desactivada",
  },
]);

// Datos mock para clientes externos
const externalUsers = ref<UserResponse[]>([
  {
    id: 101,
    email: "client1@example.com",
    username: "client1",
    rol: "cli1",
    status: "Activa",
  },
  {
    id: 102,
    email: "client2@example.com",
    username: "client2",
    rol: "cli2",
    status: "Activa",
  },
]);

const isLoading = ref(false);
const isDialogOpen = ref(false);
const isEditMode = ref(false);

// Función para cerrar el diálogo
const closeDialog = () => {
  isDialogOpen.value = false;
};

// Usuario seleccionado para editar o agregar
const selectedUser = ref<UserResponse | null>(null);

// TODO: Implementar las funciones de agregar, editar, desactivar y eliminar usuarios con el back
// Función para agregar un nuevo usuario
const addUser = () => {
  isEditMode.value = false;
  selectedUser.value = { email: "", username: "", rol: "", status: "Activa" };
  isDialogOpen.value = true;
};

// Función para editar un usuario existente
const handleEdit = (user: UserResponse) => {
  isEditMode.value = true;
  selectedUser.value = { ...user };
  isDialogOpen.value = true;
};

// Función para manejar el envío del formulario
const handleSubmit = (userData: UserResponse) => {
  if (isEditMode.value && selectedUser.value?.id) {
    // Editar usuario existente
    const updatedUser = { ...userData };
    delete updatedUser.password; // No enviar la contraseña al editar

    // Actualizar el usuario correspondiente
    if (userData.id < 100) {
      const index = internalUsers.value.findIndex((u) => u.id === userData.id);
      if (index !== -1) internalUsers.value[index] = updatedUser;
    } else {
      const index = externalUsers.value.findIndex((u) => u.id === userData.id);
      if (index !== -1) externalUsers.value[index] = updatedUser;
    }
  } else {
    // Agregar nuevo usuario (incluyendo la contraseña)
    userData.id = Date.now(); // Asignar un ID único
    if (userData.rol === "admin" || userData.rol === "operador") {
      internalUsers.value.push(userData);
    } else {
      externalUsers.value.push(userData);
    }
  }
  closeDialog();
};

// Funciones para manejar las acciones de desactivar y eliminar
const handleDeactivate = (user: UserResponse) => {
  console.log("Desactivar usuario:", user);
};

const handleDelete = (user: UserResponse) => {
  if (user.id < 100) {
    internalUsers.value = internalUsers.value.filter((u) => u.id !== user.id);
  } else {
    externalUsers.value = externalUsers.value.filter((u) => u.id !== user.id);
  }
};
</script>

<template>
  <AdminLayout>
    <h6 class="ma-5 pages-title">Admin / Usuarios</h6>
    <h1 class="ma-5">Usuarios</h1>

    <!-- Botón Agregar Usuario -->
    <v-container>
      <v-row class="mb-4">
        <v-col>
          <v-btn color="primary" @click="addUser">Agregar Usuario</v-btn>

          <UserFormDialog
            v-model="isDialogOpen"
            :isEditMode="isEditMode"
            :userData="selectedUser"
            @close="closeDialog"
            @submit="handleSubmit"
          />
        </v-col>
      </v-row>

      <!-- Tabla de Usuarios Internos -->
      <v-row>
        <v-col cols="12">
          <h2 class="mb-2">Usuarios Internos</h2>
          <UserTable
            :items="internalUsers"
            :total-elements="internalUsers.length"
            :is-loading="isLoading"
            @edit="handleEdit"
            @deactivate="handleDeactivate"
            @delete="handleDelete"
          />
        </v-col>
      </v-row>

      <!-- Tabla de Usuarios Externos -->
      <v-row class="mt-8">
        <v-col cols="12">
          <h2 class="mb-2">Usuarios Externos</h2>
          <UserTable
            :items="externalUsers"
            :total-elements="externalUsers.length"
            :is-loading="isLoading"
            @edit="handleEdit"
            @deactivate="handleDeactivate"
            @delete="handleDelete"
          />
        </v-col>
      </v-row>
    </v-container>
  </AdminLayout>
</template>

<style lang="scss" src="/src/styles/global.scss"></style>
