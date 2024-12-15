import api from '@/services/api.service';
import type { Product } from '@/interfaces/products.interface';

// Obtener todos los productos
export const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await api().get('/products');
  return data;
};

// Crear un producto
export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  const { data } = await api().post('/products', product);
  return data;
};

// Actualizar un producto
export const updateProductById = async (product: Product): Promise<Product> => {
  const { data } = await api().put(`/products`, product);
  return data;
};

// Eliminar un producto
export const deleteProductById = async (productId: number): Promise<void> => {
  await api().delete(`/products/${productId}`);
};
