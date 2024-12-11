import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Order } from '@/interfaces/order.interface';

export const useOrdersStore = defineStore('orders', () => {
  const order = ref<Order | null>(null);


  const setOrder = (newOrder: Order) => {
    order.value = newOrder;
  };



  return {
    // Estado
    order,

    // Acciones
    setOrder,
  };
});
