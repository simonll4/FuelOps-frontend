<script setup lang="ts">
import AdminLayout from "../layouts/AdminLayout.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import ProductsTable from "@/modules/admin/components/products/ProductsTable.vue";
import ProductFormDialog from "@/modules/admin/components/products/ProductsFormDialog.vue";
import { useProducts } from "@/composables/use.product";
import type { Product } from "@/interfaces/products.interface";

const {
  products,
  isLoading,
  createProduct,
  updateProduct,
  deleteProduct,
  setSelectedProduct,
} = useProducts();

// Estado del diálogo
const isDialogOpen = ref(false);
const isEditMode = ref(false);
const selectedProduct = ref<Product | null>(null);
// Función para abrir el diálogo de agregar producto
const addProduct = () => {
  isEditMode.value = false;
  selectedProduct.value = null;
  setSelectedProduct(null);
  isDialogOpen.value = true;
};

// Función para abrir el diálogo de editar producto
const editProduct = (product: Product) => {
  isEditMode.value = true;
  selectedProduct.value = product;
  setSelectedProduct(product);
  isDialogOpen.value = true;
};

// Función para manejar el envío del formulario
const submitProduct = (formData: Omit<Product, "id">) => {
  if (isEditMode.value && selectedProduct.value) {
    updateProduct({ ...selectedProduct.value, ...formData });
  } else {
    createProduct(formData);
  }
  closeDialog();
};

// Función para eliminar un producto
const handleDeleteProduct = (product: Product) => {
  deleteProduct(product.id);
};

// Función para cerrar el diálogo
const closeDialog = () => {
  isDialogOpen.value = false;
};

const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

<template>
  <AdminLayout>
    <v-container class="d-flex align-center pa-0">
      <!-- Botón para volver atrás -->
      <v-btn icon @click="goBack" class="mr-2" color="transparent" flat>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <h6>Admin / Productos</h6>
    </v-container>

    <v-container>
      <v-row class="mb-4 d-flex align-center">
        <!-- Titulo -->
        <v-col cols="6">
          <h1>Productos</h1>
        </v-col>
        <v-col cols="6" class="text-right">
          <!-- Botón Agregar Producto -->
          <v-btn color="primary" @click="addProduct">Agregar Producto</v-btn>
        </v-col>
      </v-row>

      <ProductsTable :products="products" :is-loading="isLoading" hide-default-footer @edit="editProduct"
        @delete="handleDeleteProduct" />

      <ProductFormDialog :is-open="isDialogOpen" :is-edit-mode="isEditMode" :product-data="selectedProduct"
        @close="closeDialog" @submit="submitProduct" />
    </v-container>
  </AdminLayout>
</template>
