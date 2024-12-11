<script setup lang="ts">
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

    <!-- TODO: Quitar esto cuando ya no se use -->
    <!-- Activador para mostrar el diálogo -->
    <v-btn color="red" @click="dialog = true"> Mostrar Alerta </v-btn>
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
