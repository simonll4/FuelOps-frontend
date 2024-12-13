import { onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useQueryClient } from '@tanstack/vue-query';

import { webSocketService } from '@/services/ws.service';
import { useAlarmsStore } from '@/stores/alarms.store';

import type { Alarm } from '@/interfaces/alarm.interface';

export const useWsAlarmsReminders = () => {

  const queryClient = useQueryClient();

  // Store de alarmas
  const wsStore = useAlarmsStore();
  const { remindersAlarms } = storeToRefs(wsStore); // Referencia reactiva al store

  // Servicio WebSocket
  const { subscribe, unsubscribe } = webSocketService();
  // Tópico de las alarmas recordatorios
  const topic = '/topic/alarms/reminders';

  // Manejo de la llegada de nuevos mensajes
  const handleMessage = (message: Alarm[]) => {
    wsStore.setRemindersAlarms(message); // Actualiza el store
    queryClient.setQueryData(['alarmsReminders'], message); // Actualiza cache de Vue Query
  };

  // Suscripción y conexión WebSocket
  onMounted(() => {
    subscribe(topic, handleMessage);
  });

  // Desconexión del WebSocket al desmontar el componente
  onUnmounted(() => {
    //disconnect();
    unsubscribe(topic);
  });

  const clearRemindersAlarms = () => {
    wsStore.setRemindersAlarms([]); // Limpia el store
  };

  // Refrescar la consulta (invalidate) si es necesario
  //Este método puede ser utilizado para invalidar la caché de Vue Query si se desea forzar una actualización de las alarmas.
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['alarms'] });

  return {
    remindersAlarms,
    clearRemindersAlarms,
    invalidate,
  };

};