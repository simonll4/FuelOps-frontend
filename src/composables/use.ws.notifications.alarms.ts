import { ref, onMounted, onUnmounted, toRefs, watch } from 'vue';
import { useQueryClient } from '@tanstack/vue-query';
import { useAlarmsWebSocketStore } from '@/stores/alarms.ws.store';
import { webSocketService } from '@/services/ws.service';
import type { Alarm } from '@/modules/admin/interfaces/alarm.interface';

export const useWsAlarms = (token: string) => {
  const queryClient = useQueryClient(); // Cliente de Vue Query
  const wsStore = useAlarmsWebSocketStore(); // Store de alarmas
  const { connect, subscribe, disconnect } = webSocketService(); // Servicio WebSocket

  const { notificationsAlarms } = toRefs(wsStore); // Referencia reactiva al store
  const topic = '/topic/alarms/data'; // Tópico de las alarmas

  // Manejo de la llegada de nuevos mensajes
  const handleMessage = (message: Alarm[]) => {
    wsStore.setNotificationsAlarms(message); // Actualiza el store
    queryClient.setQueryData(['alarms'], message); // Actualiza cache de Vue Query
  };

  // Suscripción y conexión WebSocket
  onMounted(() => {
    connect(token);
    subscribe(topic, handleMessage);
  });

  // Desconexión del WebSocket al desmontar el componente
  onUnmounted(() => {
    disconnect();
  });

  // Refrescar la consulta (invalidate) si es necesario
  //Este método puede ser utilizado para invalidar la caché de Vue Query si se desea forzar una actualización de las alarmas.
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['alarms'] });

  return {
    notificationsAlarms,
    invalidate,
  };
};