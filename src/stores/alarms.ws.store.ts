import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Alarm } from '@/modules/admin/interfaces/alarm.interface';

export const useAlarmsWebSocketStore = defineStore('AlarmsWs', () => {
  const notificationsAlarms = ref<Alarm[]>([]);

  const setNotificationsAlarms = (messages: Alarm[]) => {
    notificationsAlarms.value = messages;
  };

  const getNotificationsAlarms = () => notificationsAlarms.value;

  return {
    notificationsAlarms,
    setNotificationsAlarms,
    getNotificationsAlarms,
  };
});