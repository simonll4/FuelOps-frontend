import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useWebSocketStore = defineStore('websocket', () => {
  const messages = ref<Record<string, any[]>>({});

  const addMessage = (topic: string, message: any) => {
    if (!messages.value[topic]) {
      messages.value[topic] = [];
    }
    messages.value[topic].push(message);
  };

  return { messages, addMessage };
});
