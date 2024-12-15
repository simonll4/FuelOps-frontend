import { watch } from 'vue';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';

import { useProductsStore } from '@/stores/products.store';
import { fetchProducts, createProduct, updateProductById, deleteProductById } from '@/services/product.service';

export const useProducts = () => {
  const store = useProductsStore();
  const { products, selectedProduct } = storeToRefs(store);
  const queryClient = useQueryClient();

  // Fetch products
  const { isLoading, data, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: Infinity,
  });

  // Sincronizar el resultado con el store
  watch(data, (result) => {
    if (Array.isArray(result)) {
      store.setProducts(result);
    } else {
      console.warn('Data is not an array, skipping store update:', result);
    }
  });

  // Create product mutation
  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (newProduct) => {
      store.addProduct(newProduct);
      queryClient.invalidateQueries({
        queryKey: ['products'], // Clave de consulta que deseas invalidar
      });
    },
  });

  // Update product mutation
  const updateMutation = useMutation({
    mutationFn: updateProductById,
    onSuccess: (updatedProduct) => {
      store.updateProduct(updatedProduct);
      queryClient.invalidateQueries({
        queryKey: ['products'], // Clave de consulta que deseas invalidar
      });
    },
  });

  // Delete product mutation
  const deleteMutation = useMutation({
    mutationFn: deleteProductById,
    onSuccess: (_, productId) => {
      store.deleteProduct(productId as number);
      queryClient.invalidateQueries({
        queryKey: ['products'], // Clave de consulta que deseas invalidar
      });
    },
  });

  return {
    // Estado
    products,
    selectedProduct,
    isLoading,
    error,

    // Métodos
    setSelectedProduct: store.setSelectedProduct,
    createProduct: createMutation.mutate,
    updateProduct: updateMutation.mutate,
    deleteProduct: deleteMutation.mutate,
  };
};
