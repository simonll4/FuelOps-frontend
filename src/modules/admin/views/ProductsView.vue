<script setup lang="ts">
import AdminLayout from "../layouts/AdminLayout.vue";

import { ref } from "vue";
import ProductsTable from "@/modules/admin/components/products/ProductsTable.vue";
import ProductFormDialog from "@/modules/admin/components/products/ProductsFormDialog.vue";
import type { Product } from "@/interfaces/products.interface";

// Datos mock
const products = ref<Product[]>([
  {
    id: 1,
    descripcion: "Gasolina Premium",
    producto: "Gasolina",
    stock: 15000,
    temperaturaUmbral: 25,
    densidad: 0.75,
  },
  {
    id: 2,
    descripcion: "Diésel Ultra Bajo Azufre",
    producto: "Diésel",
    stock: 20000,
    temperaturaUmbral: 30,
    densidad: 0.85,
  },
]);

const totalElements = ref(2);
const isLoading = ref(false);
const currentPage = ref(1);
const itemsPerPage = 10;

// Estado del diálogo
const isDialogOpen = ref(false);
const isEditMode = ref(false);
const selectedProduct = ref<Product | null>(null);

// TODO: Implementar las funciones de agregar, editar y eliminar productos con el back. Sobre todo el implementar que no està
// Función para abrir el diálogo de agregar producto
const addProduct = () => {
  isEditMode.value = false;
  selectedProduct.value = null;
  isDialogOpen.value = true;
};

// Función para abrir el diálogo de editar producto
const editProduct = (product: Product) => {
  isEditMode.value = true;
  selectedProduct.value = product;
  isDialogOpen.value = true;
};

const deleteProduct = (product: Product) => {
  console.log("Eliminar producto", product);
};

// Función para manejar el envío del formulario
const submitProduct = (formData: Omit<Product, "id">) => {
  if (isEditMode.value && selectedProduct.value) {
    // Simular edición
    const index = products.value.findIndex(
      (p) => p.id === selectedProduct.value?.id
    );
    if (index !== -1) {
      products.value[index] = { ...selectedProduct.value, ...formData };
    }
  } else {
    // Simular adición con ID auto-generado
    const newId = products.value.length + 1;
    products.value.push({ id: newId, ...formData });
  }
  closeDialog();
};

// Función para cerrar el diálogo
const closeDialog = () => {
  isDialogOpen.value = false;
};

// Función para manejar el cambio de página
const handlePageChange = (page: number) => {
  currentPage.value = page;
};
</script>

<template>
  <AdminLayout>
    <h6 class="ma-5 pages-title">Admin / Productos</h6>
    <h1 class="ma-5">Productos</h1>

    <v-container>
      <v-row>
        <v-col cols="12" class="text-right">
          <v-btn color="primary" class="mb-4" @click="addProduct"
            >Agregar Producto</v-btn
          >
        </v-col>
      </v-row>

      <ProductsTable
        :products="products"
        :total-elements="totalElements"
        :is-loading="isLoading"
        :current-page="currentPage"
        :items-per-page="itemsPerPage"
        @edit="editProduct"
        @delete="deleteProduct"
        @page-change="handlePageChange"
      />

      <ProductFormDialog
        :is-open="isDialogOpen"
        :is-edit-mode="isEditMode"
        :product-data="selectedProduct"
        @close="closeDialog"
        @submit="submitProduct"
      />
    </v-container>
  </AdminLayout>
</template>
