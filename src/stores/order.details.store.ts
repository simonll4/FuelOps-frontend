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

  // Order details for the current order
  const orderDetails = ref<OrderDetail[]>([]);

  return {
    // States
    currentPage,
    pageSize,
    sortBy,
    totalElements,
    totalPages,
    orderDetails,

    // Actions
    setOrderDetails(details: OrderDetail[]) {
      orderDetails.value = details;
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
    }
  };

});
