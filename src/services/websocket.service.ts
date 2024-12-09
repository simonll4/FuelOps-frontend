import { ref } from 'vue';
import { Client as StompClient } from '@stomp/stompjs';

let stompClient: StompClient | null = null;
const isConnected = ref(false);
const subscriptions: Record<string, (message: any) => void> = {};

export const useWebSocketService = () => {
  
  const connect = (token: string) => {
    if (isConnected.value) return;

    console.log('Connecting to WebSocket...');

    stompClient = new StompClient({
      brokerURL: 'ws://localhost:8080/alarms',
      connectHeaders: { Authorization: `Bearer ${token}` },

      onConnect: () => {
        isConnected.value = true;
        console.log('WebSocket connected');
        // Re-suscribir a los tópicos registrados
        Object.keys(subscriptions).forEach(topic => {
          subscribe(topic, subscriptions[topic]);
        });
      },

      onStompError: (error: any) => {
        console.error('WebSocket connection error:', error);
        isConnected.value = false;
      },

      onWebSocketClose: () => {
        console.log('WebSocket closed');
        isConnected.value = false;
      },

      onWebSocketError: (error: any) => {
        console.error('WebSocket error:', error);
        isConnected.value = false;
      }
    });

    stompClient.activate();
  };

  const subscribe = (topic: string, callback: (message: any) => void) => {
    if (!stompClient || !isConnected.value) {
      console.warn('WebSocket not connected. Delaying subscription.');
      subscriptions[topic] = callback;
      return;
    }

    stompClient.subscribe(topic, (message: any) => {
      const parsedMessage = JSON.parse(message.body);
      callback(parsedMessage);
    });
  };

  // const disconnect = () => {
  //   if (stompClient && isConnected.value) {
  //     stompClient.deactivate();
  //     console.log('WebSocket disconnected');
  //     isConnected.value = false;
  //   }
  // };

  return {
    connect,
    subscribe,
  };
};