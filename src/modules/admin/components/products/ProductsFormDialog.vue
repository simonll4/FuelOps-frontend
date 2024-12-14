<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from "vue";
import type { Product } from "@/interfaces/products.interface";

// Props
const props = defineProps<{
  isOpen: boolean;
  isEditMode: boolean;
  productData: Product | null;
}>();

const emit = defineEmits(["close", "submit"]);

// Datos del formulario
const formData = ref<Omit<Product, "id">>({
  descripcion: "",
  producto: "",
  stock: 0,
  temperaturaUmbral: 0,
  densidad: 0,
});

// Sincronizar datos en modo edición
watch(
  () => props.productData,
  (newData) => {
    if (newData) {
      formData.value = { ...newData };
    }
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
    @update:model-value="closeDialog"
    max-width="500px"
  >
    <v-card class="data-container">
      <v-card-title class="headline">
        {{ isEditMode ? "Editar Producto" : "Agregar Producto" }}
      </v-card-title>

      <v-card-text>
        <v-text-field
          v-model="formData.descripcion"
          label="Descripción"
          required
        ></v-text-field>
        <v-text-field
          v-model="formData.producto"
          label="Producto"
          required
        ></v-text-field>
        <v-text-field
          v-model="formData.stock"
          label="Stock"
          type="number"
          required
        ></v-text-field>
        <v-text-field
          v-model="formData.temperaturaUmbral"
          label="Temperatura Umbral (°C)"
          type="number"
          required
        ></v-text-field>
        <v-text-field
          v-model="formData.densidad"
          label="Densidad (kg/m³)"
          type="number"
          required
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" @click="closeDialog">Cancelar</v-btn>
        <v-btn color="primary" @click="submitForm">
          {{ isEditMode ? "Guardar Cambios" : "Agregar Producto" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
