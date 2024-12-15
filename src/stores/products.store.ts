import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Product } from '@/interfaces/products.interface';

export const useProductsStore = defineStore('products', () => {
  // Estado
  const products = ref<Product[]>([]);
  const selectedProduct = ref<Product | null>(null);

  // Acciones
  const setProducts = (newProducts: Product[]) => {
    products.value = newProducts;
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = { ...product, id: products.value.length + 1 }; // Generar ID único
    products.value.push(newProduct);
  };

  const updateProduct = (updatedProduct: Product) => {
    const index = products.value.findIndex((p) => p.id === updatedProduct.id);
    if (index !== -1) {
      products.value[index] = updatedProduct;
    }
  };

  const deleteProduct = (productId: number) => {
    products.value = products.value.filter((p) => p.id !== productId);
  };

  const setSelectedProduct = (product: Product | null) => {
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
