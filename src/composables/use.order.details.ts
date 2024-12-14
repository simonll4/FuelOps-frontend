import { watch } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';

import { useOrderDetailsStore } from '@/stores/order.details.store';
import { getOrderDetails } from '@/services/order.details.service';

export const useOrderDetails = (idOrder: number) => {

  const store = useOrderDetailsStore();
  const { currentPageD, pageSizeD, sortByD, orderDetails, totalElementsD, totalPagesD } = storeToRefs(store);

  const fetchOrderDetails = async () => {
    if (!idOrder) throw new Error('idOrder is required');

    const { details, pagination } = await getOrderDetails(
      idOrder,
      currentPageD.value,
      pageSizeD.value,
      sortByD.value
    );

    return { details, pagination };
  };

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ['orderDetails', idOrder, currentPageD, pageSizeD, sortByD],
    queryFn: fetchOrderDetails,
    staleTime: 0, // TODO ver como manejar cache en ordenes que nunca se van actualizar (de estado 3 en adelante)
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
    currentPageD: currentPageD.value + 1,
    currentPageD1: currentPageD,
    pageSizeD,
    sortByD,
    totalElementsD,
    totalPagesD,
    isLoadingD: isLoading,
    errorD: error,

    // Methods
    refetchD: refetch,
    setPageD: store.setPage,
    setPageSizeD: store.setPageSize,
    setSortByD: store.setSortBy,

  };
};
