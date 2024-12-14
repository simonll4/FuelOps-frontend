import { computed } from 'vue';
import { useMutation } from '@tanstack/vue-query';

import { useAlarmsStore } from '@/stores/alarms.store';
import { setAlarmStatus } from '@/services/alarm.service';

import type { Alarm } from '@/interfaces/alarm.interface';

export const useAlarmHandler = () => {
  const alarmsStore = useAlarmsStore();

  const alarmMutation = useMutation<Alarm, Error, { id: number; observation: string; newStatus: string }>({
    mutationFn: async ({ id, observation, newStatus }) => {
      return await setAlarmStatus(newStatus, { id, observation });
    },
    onSuccess: (updatedAlarm: Alarm) => {
      alarmsStore.setOrderAlarm(updatedAlarm); // Actualiza la alarma en el store
    },
  });

  return {

    updateAlarmStatus: alarmMutation.mutate,

    isUpdating: computed(() => alarmMutation.isPending.value),
    isError: computed(() => alarmMutation.isError.value),
    isSuccess: computed(() => alarmMutation.isSuccess.value),
    
  };
};