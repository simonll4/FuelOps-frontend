import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { Alarm } from '@/interfaces/alarm.interface';

export const useAlarmsWsStore = defineStore('AlarmsWs', () => {

  // STATES
  // Almacena las alarmas pendientes para recordatorios
  const remindersAlarms = ref<Alarm[]>([]);
  // Almacena nueva alarma de una orden
  const alarmsByOrden = ref<Record<string, Alarm>>({});

  const setOrderAlarm = (alarm: Alarm) => {
    const orderId = alarm.orderId.toString();
    alarmsByOrden.value = { ...alarmsByOrden.value, [orderId]: alarm };
  };

  const getOrderAlarm = (orderId: string) => {
    return alarmsByOrden.value[orderId];
  };

  const setRemindersAlarms = (messages: Alarm[]) => {
    remindersAlarms.value = messages;
  };

  const getRemindersAlarms = () => remindersAlarms.value;

  return {
    remindersAlarms,
    alarmsByOrden,
    setRemindersAlarms,
    getRemindersAlarms,
    setOrderAlarm,
    getOrderAlarm,
  };

});