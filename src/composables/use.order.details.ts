import { watch } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';

import { useOrderDetailsStore } from '@/stores/order.details.store';
import { getOrderDetails } from '@/services/order.details.service';

export const useOrderDetails = (idOrder: number) => {

  const store = useOrderDetailsStore();
  const { currentPage, pageSize, sortBy, orderDetails, totalElements, totalPages } = storeToRefs(store);

  const fetchOrderDetails = async () => {
    if (!idOrder) throw new Error('idOrder is required');

    const { details, pagination } = await getOrderDetails(
      idOrder,
      currentPage.value,
      pageSize.value,
      sortBy.value
    );
    
    return { details, pagination };
  };


  const { isLoading, data, error } = useQuery({
    queryKey: ['orderDetails', idOrder, currentPage, pageSize, sortBy],
    queryFn: fetchOrderDetails,
    staleTime: 0//Infinity,
  });

  watch(data, (result) => {
    if (result) {
      store.setOrderDetails(result.details);
      store.setPaginationData(
        result.pagination.currentPage,
        result.pagination.totalElements,
        result.pagination.totalPages
      );
      // Forzar actualización reactiva
      store.orderDetails = [...result.details];
    }
  });


  return {

    // Properties
    orderDetails,
    currentPage: currentPage.value + 1,
    pageSize,
    sortBy,
    totalElements,
    totalPages,
    isLoading,
    error,

    // Methods
    setPage: store.setPage,
    setPageSize: store.setPageSize,
    setSortBy: store.setSortBy,

  };
};
