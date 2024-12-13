<script setup lang="ts">
import { watchEffect } from "vue";
import ConfirmAlarmDialog from "./AlarmDialog.vue";

import type { Alarm } from "@/interfaces/alarm.interface";

const props = defineProps<{
  alarm: Alarm | undefined;
}>();

// TODO: Poner datos reales
// const alarmId = props.alarm?.id?.toString() || '';
// const alarmTimestamp = props.alarm?.timeStamp?.toString() || '';

watchEffect(() => {
  //console.log("Alarma:", props.alarm);
});

const handleConfirmed = (data: {
  alarmId: string;
  timestamp: string;
  observation: string;
  action: string;
}) => {
  //console.log("Alarma confirmada:", data);
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

const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp); // Convertir a objeto Date

  // Formatear la fecha (sin incluir hora)
  const formattedDate = date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Formatear la hora
  const formattedTime = date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return `${formattedDate} a las ${formattedTime}`;
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
          <strong>{{ alarm?.id }}</strong> producida el
          <strong>{{ formatDate(alarm?.timeStamp || '') }}</strong>.
        </div>
      </div>
    </v-card-item>

    <v-card-actions class="d-flex justify-space-around">
      <!-- Botón Confirmar Alarma -->
      <ConfirmAlarmDialog :dialog-title="'Confirmar Alarma'"
        :checkbox-label="'Confirmo que he tomado conocimiento de la alarma.'" :button-text="'Confirmar'"
        button-color="primary" :alarm-id="alarm?.id?.toString() || ''"
        :alarm-timestamp="formatDate(alarm?.timeStamp || '')" @confirmed="handleConfirmed" />

      <!-- Botón Reportar Problema -->
      <ConfirmAlarmDialog :dialog-title="'Reportar Problema'"
        :checkbox-label="'Confirmo que quiero reportar un problema.'" :button-text="'Reportar Problema'"
        button-color="red" :alarm-id="alarm?.id?.toString() || ''" :alarm-timestamp="formatDate(alarm?.timeStamp || '')"
        @confirmed="handleReported" />
    </v-card-actions>
  </v-card>
</template>
