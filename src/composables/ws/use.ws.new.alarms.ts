// Composable para manejar WebSockets
import { onMounted, onUnmounted, ref } from 'vue';
import { useQueryClient } from '@tanstack/vue-query';
import { webSocketService } from '@/services/ws.service';
import { useAlarmsStore } from '@/stores/alarms.store';
import type { Alarm } from '@/interfaces/alarm.interface';
import { storeToRefs } from 'pinia';

export const useWsAlarms = (idOrder: number) => {
  const queryClient = useQueryClient();
  const { subscribe, unsubscribe } = webSocketService();
  const topic = `/topic/alarms/order/${idOrder}`;

  const alarm = ref<Alarm | null>(null);
  const store = useAlarmsStore();
  const { newAlarmByOrden } = storeToRefs(store);

  const handleMessage = (message: Alarm) => {
    alarm.value = message;
    queryClient.setQueryData(['alarm'], message);
    store.addNewAlarm(message);
    store.setOrderAlarm(message);
  };

  onMounted(() => {
    subscribe(topic, handleMessage);
  });

  onUnmounted(() => {
    unsubscribe(topic);
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['alarms'] });

  return {
    //alarm,
    alarm: newAlarmByOrden,
    invalidate
  };
};



// import { onMounted, onUnmounted, computed } from 'vue';
// import { storeToRefs } from 'pinia';
// import { useQueryClient } from '@tanstack/vue-query';

// import { webSocketService } from '@/services/ws.service';
// import { useAlarmsStore } from '@/stores/alarms.store';

// import type { Alarm } from '@/interfaces/alarm.interface';

// export const useWsNewAlarmsByOrden = (orderId: number) => {

//   const queryClient = useQueryClient();

//   const { subscribe, unsubscribe } = webSocketService();
//   const topic = `/topic/alarms/order/${orderId}`;

//   // TODO: conectar con el store de las alrmas que vienen paginadas como en los detalles de la orden
//   // Store de alarmas
//   const wsStore = useAlarmsStore();

//   // Referencia reactiva al store
//   const { alarmsByOrden } = storeToRefs(wsStore);

//   // Computed: retorna la alarma específica para el orderId
//   const alarmForOrder = computed(() => alarmsByOrden.value[orderId] || null);

//   // Manejo de la llegada de nuevos mensajes
//   const handleMessage = (message: Alarm) => {
//     wsStore.setOrderAlarm(message); // Actualiza el store
//     queryClient.setQueryData(['newAlarm'], message); // Actualiza cache de Vue Query
//   };

//   // Suscripción y conexión WebSocket
//   onMounted(() => {
//     //connect(token);
//     subscribe(topic, handleMessage);
//   });

//   // Desconexión del WebSocket al desmontar el componente
//   onUnmounted(() => {
//     //disconnect();
//     unsubscribe(topic);
//   });

//   // Método para invalidar la cache
//   const invalidate = () => queryClient.invalidateQueries({ queryKey: ['alarms'] });

//   return {
//     alarmForOrder, // Devolver solo la alarma específica
//     invalidate,
//   };
// };