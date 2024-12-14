import { watch } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';

import { useOrdersStore } from '@/stores/orders.store';
import { getOrders } from '@/services/order.service';

export const useOrders = () => {

    const store = useOrdersStore();
    const { currentPage, pageSize, sortBy, filter, orders, totalElements, totalPages } = storeToRefs(store);

    const fetchOrders = async () => {
        const { items, pagination } = await getOrders(
            currentPage.value,
            pageSize.value,
            filter.value,
            sortBy.value
        );

        return { items, pagination };
    }

    const { isLoading, data, error } = useQuery({
        queryKey: ['items', currentPage, pageSize, sortBy, filter],
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
        filter,
        totalElements,
        totalPages,
        isLoading,
        error,

        // Methods
        setPage: store.setPage,
        setPageSize: store.setPageSize,
        setSortBy: store.setSortBy,
        setFilter: store.setFilter
        
    };
}