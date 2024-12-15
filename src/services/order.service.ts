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
  filter: Array<string> = [],
  sort: string = 'externalReceptionDate'
): Promise<ItemResponse> => {

  const filters = filter.join(",")
  const { data } = await api().get('/orders', {
    params: {
      page,
      size,
      filter: filters,
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


export const getConciliationPdf = async (orderId: number): Promise<void> => {
  if (!orderId) throw new Error("orderId is required");

  const response = await api().get(`/orders/conciliation/${orderId}`, {
    responseType: "blob", // Para manejar el archivo binario (PDF)
    headers: {
      Accept: "application/pdf",
    },
  });

  // Crear un Blob a partir de la respuesta
  const blob = new Blob([response.data], { type: "application/pdf" });

  // Crear un enlace temporal para descargar el archivo
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `conciliation_${orderId}.pdf`;
  link.click();

  // Liberar el objeto URL temporal
  URL.revokeObjectURL(link.href);
};

