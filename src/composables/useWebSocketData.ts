import { ref } from 'vue';
import { useQueryClient } from '@tanstack/vue-query';
import { useWebSocketService } from '@/services/websocket.service';

export const useWebSocketData = (topic: string, token: string) => {
  const queryClient = useQueryClient();
  const data = ref<any[]>([]);

  const { connect, subscribe} = useWebSocketService();

  const handleMessage = (message: any) => {
    data.value.push(message);
    queryClient.setQueryData([topic], [...data.value]); // Actualiza cache de Vue Query
  };

  // Conectar al WebSocket
  connect(token);

  // Suscribirse al tópico
  subscribe(topic, handleMessage);

  return {
    data,
    invalidate: () => queryClient.invalidateQueries({ queryKey: [topic] }), // Forzar refresco
  };
};
