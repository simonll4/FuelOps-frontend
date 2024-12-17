<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue';
import { useWsAlarmsReminders } from '@/composables/ws/use.ws.reminders.alarms';
import { useRouter } from 'vue-router';
import { useToast, POSITION } from "vue-toastification";

const toast = useToast();

const dialog = ref(false);
const orderNumber = ref<number | null>(null);
const currentTemperature = ref(0);
const thresholdTemperature = ref(-0.5); // TODO: Reemplazar con el umbral real
const alertDate = ref<string | null>(null);

const { remindersAlarms, clearRemindersAlarms } = useWsAlarmsReminders();
const router = useRouter();

// Computed: Identificar si es admin u operador según la ruta actual
const isAdmin = computed(() => router.currentRoute.value.path.startsWith('/admin'));
const isOperator = computed(() => router.currentRoute.value.path.startsWith('/operator'));

// Computed: Verificar si está en el detalle de una orden
const isInOrderDetail = computed(() => {
  const currentRoute = router.currentRoute.value.path;
  return currentRoute.match(/^\/(admin|operator)\/orders\/\d+$/);
});

// Navegar a la orden según si es admin u operador
const goToOrder = () => {
  if (!orderNumber.value) return; // Verificar que haya una orden válida
  const basePath = isAdmin.value ? '/admin/orders' : '/operator/orders';
  router.push(`${basePath}/${orderNumber.value}`);
  dialog.value = false;
};

// Watch para gestionar las alarmas
watchEffect(() => {
  const alarmsArray = Array.isArray(remindersAlarms.value) ? remindersAlarms.value : [remindersAlarms.value];
  if (alarmsArray.length > 0) {
    const newAlarm = alarmsArray[0];
    orderNumber.value = newAlarm.orderId;

    // Mostrar notificación y vincular con el evento
    toast.success(`Alerta de Temperatura para orden Nro: ${newAlarm.orderId}`, {
      timeout: 5000,
      position: POSITION.TOP_RIGHT,
      onClick: goToOrder, // Acción al hacer clic en la notificación
    });

    // Si estamos en el detalle de la orden, no mostrar notificaciones ni modal
    if (isInOrderDetail.value) {
      clearRemindersAlarms();
      return;
    }

    // Configurar valores para mostrar el modal
    currentTemperature.value = newAlarm.temperature;
    alertDate.value = new Date(newAlarm.timeStamp).toLocaleString();

    // Mostrar modal
    dialog.value = true;

    // Limpiar el store después de procesar la alarma
    clearRemindersAlarms();
  }
});
</script>

<template>
  <div class="text-center pa-4">
    <v-dialog v-model="dialog" max-width="400" persistent>
      <v-card class="pa-4">
        <v-icon class="warning-icon" color="yellow" size="48">
          mdi-alert
        </v-icon>

        <v-card-title class="text-h6 font-weight-bold">
          Exceso de temperatura
        </v-card-title>

        <v-card-subtitle class="text-subtitle-1">
          {{ alertDate }}
        </v-card-subtitle>

        <v-card-text class="mt-2 rounded">
          <p class="text-body-1">
            <strong>Orden #{{ orderNumber }}:</strong> La temperatura actual es
            de <strong>{{ currentTemperature }}°</strong>, que se encuentra por
            encima del umbral de <strong>{{ thresholdTemperature }}°</strong>.
          </p>
          <p class="mt-2">
            Comprueba el estado de la orden o contacta un supervisor.
          </p>
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-btn color="primary" @click="goToOrder"> Ir a la Orden </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<style scoped>
/* TODO: Meter los estilos al global.scss */
.warning-icon {
  display: block;
  margin: 0 auto 12px;
}

.v-card-title {
  text-align: center;
}

.v-card-subtitle {
  text-align: center;
}

.v-card-text {
  text-align: center;
  color: #ffffff;
}

.v-card {
  background-color: #111c44;
  color: #ffffff;
  border-radius: 12px;
}
</style>