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

  // Almacena las alarmas pendientes para recordatorios
  const remindersAlarms = ref<Alarm[]>([]);

  // Almacena nueva alarma de una orden
  //const newAlarmByOrden = ref<Record<string, Alarm>>({});
  const newAlarmByOrden = ref<Alarm>();

  const setOrderAlarm = (alarm: Alarm) => {
    //const orderId = alarm.orderId.toString();
    //newAlarmByOrden.value = { ...newAlarmByOrden.value, [orderId]: alarm };
   //console.log('setOrderAlarm aca store', alarm);
    newAlarmByOrden.value = alarm;
  };

  const getOrderAlarm = (orderId: string) => {
    //return newAlarmByOrden.value[orderId];
    return newAlarmByOrden.value;
  };

  const setRemindersAlarms = (messages: Alarm[]) => {
    remindersAlarms.value = messages;
  };

  const getRemindersAlarms = () => remindersAlarms.value;

  return {
    // States
    currentPageA,
    pageSizeA,
    sortByA,
    totalElementsA,
    totalPagesA,
    alarms,
    remindersAlarms,
    newAlarmByOrden,
    setRemindersAlarms,
    getRemindersAlarms,
    setOrderAlarm,
    getOrderAlarm,
    // Actions
    setAlarms(newAlarms: Alarm[]) {
      alarms.value = newAlarms;
    },
    addNewAlarm(alarm: Alarm) {
      if (alarms.value.length === 5) {
        alarms.value = [...[alarm], ...alarms.value.slice(0, alarms.value.length - 1)];
      } else {
        alarms.value = [alarm, ...alarms.value];
      }
      totalElementsA.value += 1;
      totalPagesA.value = Math.ceil(totalElementsA.value / pageSizeA.value);
    },
    setPaginationData(page: number, totalElement: number, totalPage: number) {
      currentPageA.value = page;
      totalElementsA.value = totalElement;
      totalPagesA.value = totalPage;
    },
    setPageA(page: number) {
      if (page !== currentPageA.value && page >= 0 && page <= totalPagesA.value) {
        currentPageA.value = page;
      }
    },
    setPageSize(size: number) {
      pageSizeA.value = size;
    },
    setSortBy(sort: string) {
      sortByA.value = sort;
    }
  };

});