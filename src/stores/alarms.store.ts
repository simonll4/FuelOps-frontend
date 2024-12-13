import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { Alarm } from '@/interfaces/alarm.interface';

export const useAlarmsStore = defineStore('AlarmsWs', () => {

  // STATES
  const pageSizeA = ref<number>(5);
  const sortByA = ref<string>('timeStamp');
  const currentPageA = ref<number>(0);
  const totalElementsA = ref<number>(0);
  const totalPagesA = ref<number>(0);

  // Almacena las alarmas para mostrar en la tabla
  const alarms = ref<Alarm[]>([]);

  // Almacena nueva alarma ws de una orden
  const newAlarmByOrden = ref<Alarm>();

  // Almacena las alarmas ws pendientes para recordatorios
  const remindersAlarms = ref<Alarm[]>([]);

  // ACTIONS
  const setOrderAlarm = (alarm: Alarm) => {
    newAlarmByOrden.value = alarm;
  };

  const getOrderAlarm = (orderId: string) => {
    return newAlarmByOrden.value;
  };

  const updateAlarm = (alarm: Alarm) => {
    newAlarmByOrden.value = alarm;

    const index = alarms.value.findIndex((a) => a.id === alarm.id);
    if (index !== -1) {
      alarms.value[index] = alarm;
    }
  };

  const setRemindersAlarms = (messages: Alarm[]) => {
    remindersAlarms.value = messages;
  };

  const getRemindersAlarms = () => remindersAlarms.value;

  const setAlarms = (newAlarms: Alarm[]) => {
    alarms.value = newAlarms;
  };

  const addNewAlarm = (alarm: Alarm) => {
    if (alarms.value.length === 5) {
      alarms.value = [alarm, ...alarms.value.slice(0, alarms.value.length - 1)];
    } else {
      alarms.value = [alarm, ...alarms.value];
    }
    totalElementsA.value += 1;
    totalPagesA.value = Math.ceil(totalElementsA.value / pageSizeA.value);
  };

  const setPaginationData = (page: number, totalElement: number, totalPage: number) => {
    currentPageA.value = page;
    totalElementsA.value = totalElement;
    totalPagesA.value = totalPage;
  };

  const setPageA = (page: number) => {
    if (page !== currentPageA.value && page >= 0 && page <= totalPagesA.value) {
      currentPageA.value = page;
    }
  };

  const setPageSize = (size: number) => {
    pageSizeA.value = size;
  };

  const setSortBy = (sort: string) => {
    sortByA.value = sort;
  };

  return {

    // STATES
    currentPageA,
    pageSizeA,
    sortByA,
    totalElementsA,
    totalPagesA,
    alarms,
    remindersAlarms,
    newAlarmByOrden,

    // ACTIONS
    setOrderAlarm,
    getOrderAlarm,
    updateAlarm,
    setRemindersAlarms,
    getRemindersAlarms,
    setAlarms,
    addNewAlarm,
    setPaginationData,
    setPageA,
    setPageSize,
    setSortBy,
  };

});