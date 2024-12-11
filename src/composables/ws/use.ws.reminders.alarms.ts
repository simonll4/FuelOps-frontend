import { onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useQueryClient } from '@tanstack/vue-query';

import { webSocketService } from '@/services/ws.service';
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import { useAlarmsWsStore } from '@/stores/alarms.ws.store';

import type { Alarm } from '@/interfaces/alarm-interface';

export const useWsAlarmsReminders = () => {
  // Cliente de Vue Query
  const queryClient = useQueryClient();

  // Store de autenticación
  const authStore = useAuthStore();
  const token = String(authStore.getToken());

  // Store de alarmas
  const wsStore = useAlarmsWsStore();
  const { remindersAlarms } = storeToRefs(wsStore); // Referencia reactiva al store

  // Servicio WebSocket
  const { connect, subscribe, disconnect } = webSocketService();
  // Tópico de las alarmas recordatorios
  const topic = '/topic/alarms/reminders';

  // Manejo de la llegada de nuevos mensajes
  const handleMessage = (message: Alarm[]) => {
    wsStore.setRemindersAlarms(message); // Actualiza el store
    queryClient.setQueryData(['alarmsReminders'], message); // Actualiza cache de Vue Query
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
    remindersAlarms,
    invalidate,
  };
  
};