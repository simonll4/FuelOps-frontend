import { ref } from 'vue';
import { Client as StompClient, type IMessage } from '@stomp/stompjs';

let stompClient: StompClient | null = null;
const isConnected = ref(false);

// Cambiamos el tipo para almacenar referencias de las suscripciones STOMP
const subscriptions: Record<string, { callback: (message: any) => void; stompSubscription: any }> = {};

export const webSocketService = () => {
  const activeSubscriptions = ref(0);

  const connect = (token: string) => {
    if (isConnected.value) return;

    console.log('Connecting to WebSocket...');

    stompClient = new StompClient({
      brokerURL: 'ws://localhost:8080/notifier',
      connectHeaders: { Authorization: `Bearer ${token}` },

      onConnect: () => {
        isConnected.value = true;
        console.log('WebSocket connected');

        // Re-suscribir a todos los tópicos en caso de reconexión
        Object.keys(subscriptions).forEach(topic => {
          subscribe(topic, subscriptions[topic].callback);
        });
      },

      onStompError: (error) => {
        console.error('WebSocket connection error:', error);
        isConnected.value = false;
      },

      onWebSocketClose: () => {
        console.log('WebSocket closed');
        isConnected.value = false;
      },

      onWebSocketError: (error) => {
        console.error('WebSocket error:', error);
        isConnected.value = false;
      },
    });

    stompClient.activate();
  };

  const subscribe = (topic: string, callback: (message: any) => void) => {
    if (!stompClient || !isConnected.value) {
      subscriptions[topic] = { callback, stompSubscription: null }; // Guardar para re-suscribir en reconexión
      console.warn(`WebSocket not connected. Subscription to "${topic}" delayed.`);
      return;
    }

    activeSubscriptions.value++;
    const stompSubscription = stompClient.subscribe(topic, (message: IMessage) => {
      const parsedMessage = JSON.parse(message.body);
      callback(parsedMessage);
    });

    // Guardar la referencia de la suscripción STOMP
    subscriptions[topic] = { callback, stompSubscription };
    console.log(`Subscribed to "${topic}".`);
  };

  const unsubscribe = (topic: string) => {
    if (subscriptions[topic]) {
      // Cancela la suscripción STOMP
      subscriptions[topic].stompSubscription.unsubscribe();
      delete subscriptions[topic];
      activeSubscriptions.value--;
      console.log(`Unsubscribed from "${topic}".`);
    } else {
      console.warn(`No subscription found for "${topic}".`);
    }

    // Mantener la conexión WebSocket activa si hay otras suscripciones
    if (activeSubscriptions.value === 0) {
      console.log('No active subscriptions. WebSocket will remain connected.');
    }
  };

  const disconnect = () => {
    if (stompClient && activeSubscriptions.value === 0) {
      stompClient.deactivate();
      console.log('WebSocket disconnected completely.');
      stompClient = null;
    }
  };

  return {
    isConnected,
    connect,
    subscribe,
    unsubscribe,
    disconnect,
  };
};


// import { ref } from 'vue';
// import { Client as StompClient } from '@stomp/stompjs';

// let stompClient: StompClient | null = null;
// const isConnected = ref(false);
// const subscriptions: Record<string, (message: any) => void> = {};

// export const webSocketService = () => {
//   const activeSubscriptions = ref(0);

//   const connect = (token: string) => {
//     if (isConnected.value) return;

//     console.log('Connecting to WebSocket...');

//     stompClient = new StompClient({
//       brokerURL: 'ws://localhost:8080/notifier',
//       connectHeaders: { Authorization: `Bearer ${token}` },

//       onConnect: () => {
//         isConnected.value = true;
//         console.log('WebSocket connected');
//         // Re-suscribir a todos los tópicos en caso de reconexión
//         Object.keys(subscriptions).forEach(topic => {
//           subscribe(topic, subscriptions[topic]);
//         });
//       },

//       onStompError: (error) => {
//         console.error('WebSocket connection error:', error);
//         isConnected.value = false;
//       },

//       onWebSocketClose: () => {
//         console.log('WebSocket closed');
//         isConnected.value = false;
//       },

//       onWebSocketError: (error) => {
//         console.error('WebSocket error:', error);
//         isConnected.value = false;
//       },
//     });

//     stompClient.activate();
//   };

//   const subscribe = (topic: string, callback: (message: any) => void) => {
//     if (!stompClient || !isConnected.value) {
//       subscriptions[topic] = callback; // Guardar para re-suscribir en reconexión
//       console.warn(`WebSocket not connected. Subscription to "${topic}" delayed.`);
//       return;
//     }

//     activeSubscriptions.value++;
//     stompClient.subscribe(topic, (message: any) => {
//       const parsedMessage = JSON.parse(message.body);
//       callback(parsedMessage);
//     });
//   };

//   const unsubscribe = (topic: string) => {
//     if (subscriptions[topic]) {
//       delete subscriptions[topic];
//       activeSubscriptions.value--;
//       console.log(`Unsubscribed from "${topic}".`);
//     }

//     // No desconectamos completamente a menos que no haya suscripciones activas
//     if (activeSubscriptions.value === 0) {
//       console.log('No active subscriptions. WebSocket will remain connected.');
//     }
//   };

//   const disconnect = () => {
//     if (stompClient && activeSubscriptions.value === 0) {
//       stompClient.deactivate();
//       console.log('WebSocket disconnected completely.');
//       stompClient = null;
//     }
//   };

//   return {
//     isConnected,
//     connect,
//     subscribe,
//     unsubscribe,
//     disconnect,
//   };
// };