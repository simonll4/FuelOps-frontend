import { ref } from 'vue';
import { defineStore } from 'pinia';

import type { OrderDetail } from '@/interfaces/order-details.interface';

export const useOrderDetailsStore = defineStore('orderDetails', () => {

  // Manage pagination data
  const pageSizeD = ref<number>(5);
  const sortByD = ref<string>('timeStamp');
  const currentPageD = ref<number>(0);
  const totalElementsD = ref<number>(0);
  const totalPagesD = ref<number>(0);

  // Order details for the current order (used for tables with pagination)
  const orderDetails = ref<OrderDetail[]>([]);

  // Almacena nueva alarma ws de una orden
  const newDetailByOrden = ref<OrderDetail>();

  // All order details (used for graphs)
  const allOrderDetails = ref<OrderDetail[]>([]);

  const setOrderDetails = (details: OrderDetail[]) => {
    orderDetails.value = details;
  }

  const addNewOrderDetail = (detail: OrderDetail) => {

    if (currentPageD.value !== 0) return;

    if (orderDetails.value.length === 5) {
      // Si hay 5 elementos, eliminamos el último y agregamos el nuevo
      orderDetails.value = [...[detail], ...orderDetails.value.slice(0, orderDetails.value.length - 1)];
    } else {
      // Si no, simplemente agregamos el nuevo elemento
      orderDetails.value = [detail, ...orderDetails.value];
    }
    totalElementsD.value += 1;
    totalPagesD.value = Math.ceil(totalElementsD.value / pageSizeD.value);
  }

  const setPaginationData = (page: number, totalElement: number, totalPage: number) => {
    currentPageD.value = page;
    totalElementsD.value = totalElement;
    totalPagesD.value = totalPage;
  }

  const setPage = (page: number) => {
    if (page !== currentPageD.value && page >= 0 && page <= totalPagesD.value) {
      currentPageD.value = page;
    }
  }
  const setPageSize = (size: number) => {
    pageSizeD.value = size;
  }

  const setSortBy = (sort: string) => {
    sortByD.value = sort;
  }

  const setNewDetailByOrden = (detail: OrderDetail) => {
    newDetailByOrden.value = detail;
  }

  const setAllOrderDetails = (details: OrderDetail[]) => {
    allOrderDetails.value = details;
  }

  const addLatestOrderDetailToAll = (detail: OrderDetail) => {
    allOrderDetails.value = [detail, ...allOrderDetails.value];
  }

  return {

    // States
    currentPageD,
    pageSizeD,
    sortByD,
    totalElementsD,
    totalPagesD,
    orderDetails,
    newDetailByOrden,
    allOrderDetails,

    // Actions
    setOrderDetails,
    addNewOrderDetail,
    setPaginationData,
    setPage,
    setPageSize,
    setSortBy,
    setNewDetailByOrden,
    setAllOrderDetails,
    addLatestOrderDetailToAll,

  };

});
