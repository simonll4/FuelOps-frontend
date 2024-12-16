import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Order } from '@/interfaces/order.interface';
import type { TableItem } from '@/interfaces/table-item.interface';

export const useOrdersStore = defineStore('orders', () => {

  // Manage pagination data
  const pageSize = ref<number>(10);
  const sortBy = ref<string>('externalReceptionDate');
  const filter = ref<Array<string>>([]);
  const currentPage = ref<number>(0);
  const totalElements = ref<number>(0);
  const totalPages = ref<number>(0);

  // Orders to show in the table
  const orders = ref<TableItem[]>([]);
  
  // Order to show in the details page
  const order = ref<Order | null>(null);

  const setOrders = (newOrders: TableItem[]) => {
    orders.value = newOrders;
  };

  const setOrder = (newOrder: Order) => {
    order.value = newOrder;
  };

  const setPaginationData = (page: number, totalElement: number, totalPage: number) => {
    currentPage.value = page;
    totalElements.value = totalElement;
    totalPages.value = totalPage;
  };

  const setPage = (page: number) => {
    if (page !== currentPage.value && page >= 0 && page <= totalPages.value) {
      currentPage.value = page;
    }
  };

  const setPageSize = (size: number) => {
    pageSize.value = size;
  };

  const setSortBy = (sort: string) => {
    sortBy.value = sort;
  };

  const setFilter = (newFilter: Array<string> | null) => {
    if(newFilter){
      filter.value = newFilter
    }    
  }

  return {
    // Estado
    currentPage,
    pageSize,
    sortBy,
    filter,
    totalElements,
    totalPages,
    orders,
    order,

    // Acciones
    setOrders,
    setOrder,
    setPaginationData,
    setPage,
    setPageSize,
    setSortBy,
    setFilter
  };
});
