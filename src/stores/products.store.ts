import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { ProductRequest } from '@/interfaces/products.interface';

export const useProductsStore = defineStore('products', () => {
  // Estado
  const products = ref<ProductRequest[]>([]);
  const selectedProduct = ref<ProductRequest | null>(null);

  // Acciones
  const setProducts = (newProducts: ProductRequest[]) => {
    products.value = newProducts;
  };

  const addProduct = (product: Omit<ProductRequest, 'id'>) => {
    const newProduct: ProductRequest = { ...product, id: products.value.length + 1 }; // Generar ID único
    products.value.push(newProduct);
  };

  const updateProduct = (updatedProduct: ProductRequest) => {
    const index = products.value.findIndex((p) => p.id === updatedProduct.id);
    if (index !== -1) {
      products.value[index] = updatedProduct;
    }
  };

  const deleteProduct = (productId: number) => {
    products.value = products.value.filter((p) => p.id !== productId);
  };

  const setSelectedProduct = (product: ProductRequest | null) => {
    selectedProduct.value = product;
  };

  return {
    // Estado
    products,
    selectedProduct,

    // Acciones
    setProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    setSelectedProduct,
  };
});
