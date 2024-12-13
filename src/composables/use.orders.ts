import { watch } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';

import { useOrdersStore } from '@/stores/order.store';
import { getOrders } from '@/services/order.service';

export const useOrders = () => {

    const store = useOrdersStore();
    const { currentPage, pageSize, sortBy, orders, totalElements, totalPages } = storeToRefs(store);

    const fetchOrders = async () => {
        const { items, pagination } = await getOrders(
            currentPage.value,
            pageSize.value,
            sortBy.value
        );

        return { items, pagination };
    }

    const { isLoading, data, error } = useQuery({
        queryKey: ['items', currentPage, pageSize, sortBy],
        queryFn: fetchOrders,
        staleTime: Infinity,
    });

    watch(data, (result) => {
        console.log('Resultado del query:', result);
        if (result) {
            store.setOrders(result.items);
            store.setPaginationData(
                result.pagination.currentPage,
                result.pagination.totalElements,
                result.pagination.totalPages);
        }
    });

    return {

        // Properties
        orders,
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
}