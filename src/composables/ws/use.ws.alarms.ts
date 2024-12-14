import { onMounted, onUnmounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useQueryClient } from '@tanstack/vue-query';

import { webSocketService } from '@/services/ws.service';
import { useAlarmsStore } from '@/stores/alarms.store';

import type { Alarm } from '@/interfaces/alarm.interface';

export const useWsAlarms = (idOrder: number) => {
  
  const queryClient = useQueryClient();

  const { subscribe, unsubscribe } = webSocketService();
  const topic = `/topic/alarms/order/${idOrder}`;

  const store = useAlarmsStore();
  const { newAlarmByOrden } = storeToRefs(store);

  const handleMessage = (message: Alarm) => {
    queryClient.setQueryData(['alarm'], message);
    store.updateAlarm(message)
  };

  onMounted(() => {
    subscribe(topic, handleMessage);
  });

  onUnmounted(() => {
    unsubscribe(topic);
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['alarms'] });

  return {
    alarm: newAlarmByOrden,
    invalidate
  };
};