<script setup lang="ts">
import { ref } from "vue";
import ConfirmAlarmDialog from "./AlarmDialog.vue";

// TODO: Poner datos reales
const alarmId = ref("alarmId123");
const alarmTimestamp = ref("2024-11-17 08:30:00");

const handleConfirmed = (data: {
  alarmId: string;
  timestamp: string;
  observation: string;
  action: string;
}) => {
  console.log("Alarma confirmada:", data);
  // Lógica para confirmar la alarma
};

const handleReported = (data: {
  alarmId: string;
  timestamp: string;
  observation: string;
  action: string;
}) => {
  console.log("Problema reportado:", data);
  // Lógica para reportar un problema
};
</script>

<template>
    <v-card color="#FF9100" variant="tonal" class="mx-auto">
      <v-card-item>
        <div>
          <div class="text-overline mb-1">¡ATENCIÓN!</div>
          <div class="text-h6 mb-1"><strong>Alarma Sin Confirmar</strong></div>
          <div class="text-caption">
            Revisa los detalles de la alarma con ID
            <strong>{{ alarmId }}</strong> producida el
            <strong>{{ alarmTimestamp }}</strong
            >.
          </div>
        </div>
      </v-card-item>

      <v-card-actions class="d-flex justify-space-around">
        <!-- Botón Confirmar Alarma -->
        <ConfirmAlarmDialog
          :dialog-title="'Confirmar Alarma'"
          :checkbox-label="'Confirmo que he tomado conocimiento de la alarma.'"
          :button-text="'Confirmar'"
          button-color="primary"
          :alarm-id="alarmId"
          :alarm-timestamp="alarmTimestamp"
          @confirmed="handleConfirmed"
        />

        <!-- Botón Reportar Problema -->
        <ConfirmAlarmDialog
          :dialog-title="'Reportar Problema'"
          :checkbox-label="'Confirmo que quiero reportar un problema.'"
          :button-text="'Reportar Problema'"
          button-color="red"
          :alarm-id="alarmId"
          :alarm-timestamp="alarmTimestamp"
          @confirmed="handleReported"
        />
      </v-card-actions>
    </v-card>
</template>
