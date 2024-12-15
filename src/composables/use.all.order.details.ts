import { onUnmounted, watch } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';

import { useOrderDetailsStore } from '@/stores/order.details.store';
import { getAllOrderDetails } from '@/services/order.details.service';


export const useAllOrderDetails = (idOrder: number) => {
  const store = useOrderDetailsStore();
  const { allOrderDetails } = storeToRefs(store);

  // Función para obtener todos los detalles
  const fetchAllDetails = async () => {
    if (!idOrder) throw new Error('idOrder is required');
    const details = await getAllOrderDetails(idOrder);
    if (!Array.isArray(details)) {
      throw new Error('Expected an array of order details');
    }
    return details;
  };

  // Consulta con Vue Query
  const { isLoading, data, error } = useQuery({
    queryKey: ['allOrderDetails', idOrder],
    queryFn: fetchAllDetails,
    staleTime: 0,
  });

  // Observar cambios en los datos
  watch(
    () => data.value, // Observa el valor reactivo
    (details) => {
      if (Array.isArray(details)) {
        store.setAllOrderDetails(details); // Actualiza el store si es un array
      } else {
        console.warn('Data is not an array, skipping store update:', details);
      }
    },
    { immediate: true }
  );

  onUnmounted(() => {
    store.setAllOrderDetails([]); // Limpiar los detalles al desmontar
  });

  return {
    allOrderDetails,
    isLoadingAD: isLoading,
    error,
  };

};
