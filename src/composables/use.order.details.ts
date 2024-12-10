import { watch } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';

import { useOrderDetailsStore } from '@/stores/order.details.store';
import { getOrderDetails } from '@/services/order.details.service';

export const useOrderDetails = (idOrder: number) => {

    const store = useOrderDetailsStore();
    const { currentPage, pageSize, sortBy, orderDetails,totalElements, totalPages } = storeToRefs(store);

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
        staleTime: Infinity // cache no se vence nunca, los detalles de la orden no cambian
    });

    watch(data, (result) => {
        if (result) {
            store.setOrderDetails(result.details);
            store.setPaginationData(
                result.pagination.currentPage,
                result.pagination.totalElements,
                result.pagination.totalPages);
        }
    });

    return {
        // Properties
        orderDetails,
        currentPage,
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
