<script setup lang="ts">
import { ref } from "vue";
import type { UserResponse } from "@/interfaces/users.interface";
import { useUsers } from "@/composables/use.user";
import AdminLayout from "../layouts/AdminLayout.vue";
import UserTable from "@/modules/admin/components/users/UsersTable.vue";
import UserFormDialog from "@/modules/admin/components/users/UsersFormDialog.vue";

// Usa el composable de usuarios
const {
  internalUsers,
  externalUsers,
  isLoading,
  createUser,
  updateUser,
  deleteUser,
} = useUsers();

const isDialogOpen = ref(false);
const isEditMode = ref(false);
const selectedUser = ref<UserResponse>({
  id: 0,
  email: "",
  username: "",
  roles: "",
  enabled: true,
});

// Funciones para manejar el diálogo
const closeDialog = () => {
  isDialogOpen.value = false;
};

const addUserDialog = () => {
  isEditMode.value = false;
  selectedUser.value = {
    id: 0,
    email: "",
    username: "",
    roles: "",
    enabled: true,
  };
  isDialogOpen.value = true;
};

const handleEdit = (user: UserResponse) => {
  isEditMode.value = true;
  selectedUser.value = { ...user };
  isDialogOpen.value = true;
};

const handleSubmit = (userData: UserResponse) => {
  try {
    if (isEditMode.value && selectedUser.value?.id) {
      // Editar usuario existente
      updateUser({ ...userData, id: selectedUser.value.id });
    } else {
      // Agregar nuevo usuario
      createUser(userData);
    }
  } catch (error) {
    console.error("Error al guardar usuario:", error);
  } finally {
    closeDialog();
  }
};

const handleDeactivate = (user: UserResponse) => {
  updateUser({ ...user, enabled: !user.enabled });
};

const handleDelete = (user: UserResponse) => {
  deleteUser(user.id);
};
</script>

<template>
  <AdminLayout>
    <h6 class="ma-5 pages-title">Admin / Usuarios</h6>
    <h1 class="ma-5">Usuarios</h1>

    <v-container>
      <!-- Botón Agregar Usuario -->
      <v-row class="mb-4">
        <v-col>
          <v-btn color="primary" @click="addUserDialog">Agregar Usuario</v-btn>

          <UserFormDialog v-model="isDialogOpen" :isEditMode="isEditMode" :userData="selectedUser" @close="closeDialog"
            @submit="handleSubmit" />
        </v-col> 
      </v-row>

      <!-- Tabla de Usuarios Internos -->
      <v-row>
        <v-col cols="12">
          <h2 class="mb-2">Usuarios Internos</h2>
          <UserTable :items="internalUsers" :is-loading="isLoading" @edit="handleEdit" @deactivate="handleDeactivate"
            @delete="handleDelete" />
        </v-col>
      </v-row>

      <!-- Tabla de Usuarios Externos -->
      <v-row class="mt-8">
        <v-col cols="12">
          <h2 class="mb-2">Usuarios Externos</h2>
          <UserTable :items="externalUsers" :is-loading="isLoading" @edit="handleEdit" @deactivate="handleDeactivate"
            @delete="handleDelete" />
        </v-col>
      </v-row>
    </v-container>
  </AdminLayout>
</template>

<style lang="scss" src="/src/styles/global.scss"></style>
