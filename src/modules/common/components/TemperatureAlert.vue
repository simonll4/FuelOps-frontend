<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useWsAlarmsReminders } from '@/composables/ws/use.ws.reminders.alarms';
import { useRouter } from 'vue-router';

const dialog = ref(false);
const orderNumber = ref("0");
const currentTemperature = ref(0);
const thresholdTemperature = ref(0);
const alertDate = ref("");

const { remindersAlarms, clearRemindersAlarms } = useWsAlarmsReminders();

const router = useRouter();

const goToOrder = () => {
  console.log(`Navegando a la orden #${orderNumber.value}`);
  router.push(`/admin/orders/${orderNumber.value}`);
  dialog.value = false;
};

watchEffect(() => {
  const alarmsArray = Array.isArray(remindersAlarms.value) ? remindersAlarms.value : [remindersAlarms.value];
  if (alarmsArray.length > 0) {
    const newAlarm = alarmsArray[0];

    console.log('Nuevas alarmas recibidas:', alarmsArray);
    
    const currentRoute = router.currentRoute.value;
    // Verificar si el usuario ya está en cualquier ruta bajo /admin/orders/
    if (currentRoute.path.startsWith('/admin/orders/')) {
      console.log('El usuario ya está en una ruta de órdenes:', currentRoute.path);
      //clearRemindersAlarms(); // Limpiar el store si ya está en una ruta de órdenes
      return;
    }

    // Actualizar valores para el modal
    orderNumber.value = newAlarm.orderId.toString();
    currentTemperature.value = newAlarm.temperature;
    thresholdTemperature.value = newAlarm.temperature; // TODO: Reemplazar con el umbral real
    alertDate.value = new Date(newAlarm.timestamp).toLocaleString();

    // Mostrar el modal
    dialog.value = true;

    // Limpiar el store después de atender la alarma
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

        <v-card-text class="mt-2">
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

    <!-- TODO: Quitar esto cuando ya no se use-->
    <!-- Activador para mostrar el diálogo -->
    <!-- <v-btn color="red" @click="dialog = true"> Mostrar Alerta </v-btn>-->
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


<!-- <script setup lang="ts">
import { ref } from "vue";

// Variables de datos
const dialog = ref(false);
const orderNumber = ref("12345"); // Ejemplo de número de orden
const currentTemperature = ref(92); // Temperatura actual
const thresholdTemperature = ref(85); // Umbral de temperatura
const alertDate = ref("Jul 19, 2023 at 3:07 PM");

// TODO: Cambiar esto y poner la ruta de la orden
// Función para manejar el botón "Ir a la Orden"
const goToOrder = () => {
  console.log(`Navegando a la orden #${orderNumber.value}`);
  dialog.value = false;
};
</script> -->

<!-- <template>
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

        <v-card-text class="mt-2">
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


    <v-btn color="red" @click="dialog = true"> Mostrar Alerta </v-btn>
  </div>
</template> -->

<!-- <style scoped>
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
</style> -->
