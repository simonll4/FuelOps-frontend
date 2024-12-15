<script setup lang="ts">
import AdminLayout from "../layouts/AdminLayout.vue";
import { ref } from "vue";
import ProductsTable from "@/modules/admin/components/products/ProductsTable.vue";
import ProductFormDialog from "@/modules/admin/components/products/ProductsFormDialog.vue";
import { useProducts } from "@/composables/use.product";
import type { Product } from "@/interfaces/products.interface";

const { products, isLoading, createProduct, updateProduct, deleteProduct, setSelectedProduct } = useProducts();

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
</script>

<template>
  <AdminLayout>
    <h6 class="ma-5 pages-title">Admin / Productos</h6>
    <h1 class="ma-5">Productos</h1>

    <v-container>
      <v-btn color="primary" class="mb-4" @click="addProduct">Agregar Producto</v-btn>

      <ProductsTable
        :products="products"
        :is-loading="isLoading"
        @edit="editProduct"
        @delete="handleDeleteProduct"
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
