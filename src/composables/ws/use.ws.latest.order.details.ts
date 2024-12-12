import { onMounted, onUnmounted, ref } from 'vue';
import { useOrderDetailsStore } from '@/stores/order.details.store';
import { webSocketService } from '@/services/ws.service';

import type { OrderDetail } from '@/interfaces/order-details.interface';

export const useWsLatestOrderDetails = (orderId: number) => {

  const store = useOrderDetailsStore();
  const { subscribe, unsubscribe } = webSocketService();

  const topic = `/topic/details/graphs/order/${orderId}`;

  const lastDetail = ref<OrderDetail | null>(null);

  const handleMessage = (message: OrderDetail) => {
    lastDetail.value = message;
    store.addLatestOrderDetailToAll(message);
  };

  onMounted(() => {
    subscribe(topic, handleMessage);
  });

  onUnmounted(() => {
    unsubscribe(topic);
  });

  return {
    lastDetail,
  };
};
