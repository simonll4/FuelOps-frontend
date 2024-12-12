import { ref } from 'vue';
import { defineStore } from 'pinia';

import type { OrderDetail } from '@/interfaces/order-details.interface';

export const useOrderDetailsStore = defineStore('orderDetails', () => {

  // Manage pagination data
  const pageSize = ref<number>(5);
  const sortBy = ref<string>('timeStamp');
  const currentPage = ref<number>(0);
  const totalElements = ref<number>(0);
  const totalPages = ref<number>(0);

  // Order details for the current order (used for tables with pagination)
  const orderDetails = ref<OrderDetail[]>([]);

  // All order details (used for graphs)
  const allOrderDetails = ref<OrderDetail[]>([]);

  return {

    // States
    currentPage,
    pageSize,
    sortBy,
    totalElements,
    totalPages,
    orderDetails,
    allOrderDetails,

    // Actions
    setOrderDetails(details: OrderDetail[]) {
      orderDetails.value = details;
    },
    addNewOrderDetail(detail: OrderDetail) {
      if (orderDetails.value.length === 5) {
        // Si hay 5 elementos, eliminamos el último y agregamos el nuevo
        orderDetails.value = [...[detail], ...orderDetails.value.slice(0, orderDetails.value.length - 1)];
      } else {
        // Si no, simplemente agregamos el nuevo elemento
        orderDetails.value = [detail, ...orderDetails.value];
      }
      totalElements.value += 1;
      totalPages.value = Math.ceil(totalElements.value / pageSize.value);
    },
    setPaginationData(page: number, totalElement: number, totalPage: number) {
      currentPage.value = page;
      totalElements.value = totalElement;
      totalPages.value = totalPage;
    },
    setPage(page: number) {
      if (page !== currentPage.value && page >= 0 && page <= totalPages.value) {
        currentPage.value = page;
      }
    },
    setPageSize(size: number) {
      pageSize.value = size;
    },
    setSortBy(sort: string) {
      sortBy.value = sort;
    },
    setAllOrderDetails(details: OrderDetail[]) {
      allOrderDetails.value = details;
    },
    addLatestOrderDetailToAll(detail: OrderDetail) {
      allOrderDetails.value = [detail, ...allOrderDetails.value];
    },
  };

});
