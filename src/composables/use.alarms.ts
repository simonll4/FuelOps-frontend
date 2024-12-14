// Composable para la API de alarmas
import { watch } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';
import { useAlarmsStore } from '@/stores/alarms.store';
import { getAlarms } from '@/services/alarm.service';

export const useAlarms = (idOrder: number) => {
  const store = useAlarmsStore();
  const { currentPageA, pageSizeA, sortByA, alarms, totalElementsA, totalPagesA } = storeToRefs(store);

  const fetchAlarms = async () => {
    if (!idOrder) throw new Error('idOrder is required');

    const { alarms, pagination } = await getAlarms(
      idOrder,
      currentPageA.value,
      pageSizeA.value,
      sortByA.value
    );

    return { alarms, pagination };
  };

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ['alarms', idOrder, currentPageA, pageSizeA, sortByA],
    queryFn: fetchAlarms,
    staleTime: 0, // TODO ver como manejar cache en ordenes que nunca se van actualizar (de estado 3 en adelante)
  });

  watch(data, (result) => {
    if (result) {
      store.setAlarms(result.alarms);
      store.setPaginationData(
        result.pagination.currentPage,
        result.pagination.totalElements,
        result.pagination.totalPages
      );
      store.alarms = [...result.alarms];

      const alarmsArray = result.alarms;
      // Buscar la alarma con status PENDING_REVIEW
      const pendingReviewAlarm = alarmsArray.find(alarm => alarm?.status === 'PENDING_REVIEW');
      // console.log('pendingReviewAlarm', pendingReviewAlarm);
      if (pendingReviewAlarm) {
        store.setOrderAlarm(pendingReviewAlarm);

      }
    }
  });

  return {
    
    alarms,
    currentPageA: currentPageA.value + 1,
    pageSizeA,
    sortByA,
    totalElementsA,
    totalPagesA,
    refetchA: refetch,
    isLoadingA: isLoading,
    error,

    setPageA: store.setPageA,
    setPageSize: store.setPageSize,
    setSortBy: store.setSortBy

  };
};
