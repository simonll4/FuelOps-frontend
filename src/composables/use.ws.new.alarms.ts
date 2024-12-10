import { onMounted, onUnmounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useQueryClient } from '@tanstack/vue-query';

import { webSocketService } from '@/services/ws.service';
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import { useAlarmsWsStore } from '@/stores/alarms.ws.store';

import type { Alarm } from '@/interfaces/alarm-interface';

export const useWsNewAlarmsByOrden = (orderId: string) => {

  const queryClient = useQueryClient(); // Cliente de Vue Query

  // Servicio WebSocket
  const { connect, subscribe, disconnect } = webSocketService();
  // Tópico de las alarmas recordatorios
  const topic = `/topic/alarms/order/${orderId}`;

  // Store de autenticación
  //const authStore = useAuthStore();
  //const token = String(authStore.getToken());

  // TODO: por el momento lo dejo con store ver si se necesita
  // Store de alarmas
  const wsStore = useAlarmsWsStore();
  // Referencia reactiva al store
  const { alarmsByOrden } = storeToRefs(wsStore);
  // Computed: retorna la alarma específica para el orderId
  const alarmForOrder = computed(() => alarmsByOrden.value[orderId] || null);

  // Manejo de la llegada de nuevos mensajes
  const handleMessage = (message: Alarm) => {
    console.log('Nuevo mensaje recibido:', message);
    wsStore.setOrderAlarm(message); // Actualiza el store
    queryClient.setQueryData(['newAlarm'], message); // Actualiza cache de Vue Query
  };

  // Suscripción y conexión WebSocket
  onMounted(() => {
    //connect(token);
    subscribe(topic, handleMessage);
  });

  // Desconexión del WebSocket al desmontar el componente
  onUnmounted(() => {
    disconnect();
  });

  // Método para invalidar la cache
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['alarms'] });

  return {
    alarmForOrder, // Devolver solo la alarma específica
    invalidate,
  };
};