import api from '@/services/api.service';
import type { Order } from '@/interfaces/order.interface';

export const getOrderById = async (orderId: number): Promise<Order> => {
  if (!orderId) throw new Error('orderId is required');

  const { data } = await api().get(`/orders/${orderId}`);
  return data;
};