import { onMounted, onUnmounted, computed, toRefs, ref } from 'vue';
import { useQueryClient } from '@tanstack/vue-query';

import { webSocketService } from '@/services/ws.service';
import { useOrderDetailsStore } from '@/stores/order.details.store';

import type { OrderDetail } from '@/interfaces/order-details.interface';
import { storeToRefs } from 'pinia';

export const useWsOrderDetail = (orderId: number) => {

  // Cliente de Vue Query
  const queryClient = useQueryClient();

  // Servicio WebSocket
  const { subscribe, unsubscribe } = webSocketService();

  // Tópico de las alarmas recordatorios
  const topic = `/topic/details/order/${orderId}`;

  // Variable reactiva para almacenar el mensaje recibido
  //const detail = ref<OrderDetail | null>(null);

  // Store de detalles de la orden
  const store = useOrderDetailsStore();
  const { newDetailByOrden } = storeToRefs(store);

  // Manejo de la llegada de nuevos mensajes
  const handleMessage = (message: OrderDetail) => {
    //console.log('Nuevo mensaje recibido:', message);

    queryClient.setQueryData(['OrderDetail'], message); // Actualiza cache de Vue Query
    store.addNewOrderDetail(message);
    store.setNewDetailByOrden(message);
  };

  // Suscripción y conexión WebSocket
  onMounted(() => {
    subscribe(topic, handleMessage);
  });

  // Desconexión del WebSocket al desmontar el componente
  onUnmounted(() => {
    unsubscribe(topic);
  });

  // Método para invalidar la cache
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['lastDetail'] });

  return {
    detail: newDetailByOrden,
    invalidate,
  };

};