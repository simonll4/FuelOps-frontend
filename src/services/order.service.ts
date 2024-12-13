import api from '@/services/api.service';
import type { Order } from '@/interfaces/order.interface';
import type { ItemResponse } from '@/interfaces/table-item.interface';

export const getOrderById = async (orderId: number): Promise<Order> => {
  if (!orderId) throw new Error('orderId is required');

  const { data } = await api().get(`/orders/${orderId}`);
  return data;
};

export const getOrders = async (
  page: number = 0,
  size: number = 5,
  sort: string = 'externalReceptionDate'
): Promise<ItemResponse> => {

  const { data } = await api().get('/orders', {
    params: {
      page,
      size,
      sort,
    },
  });

  return {
    items: data.orders,
    pagination: {
      currentPage: data.pagination.pageable.pageNumber,
      totalElements: data.pagination.totalElements,
      totalPages: data.pagination.totalPages,
    },
  };
};