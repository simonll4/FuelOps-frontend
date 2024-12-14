<script setup lang="ts">
import ConfirmAlarmDialog from "./AlarmDialog.vue";

import type { Alarm } from "@/interfaces/alarm.interface";

const props = defineProps<{
  alarm: Alarm | undefined;
  updateAlarmStatus: (payload: { id: number; observation: string; newStatus: string }) => void;
  isUpdating: boolean;
  isError: boolean;
  isLoading: boolean;
}>();

const handleDialogConfirm = (data: { alarmId: number; observation: string; action: string }) => {
  const newStatus = data.action === 'Confirmar' ? 'ACKNOWLEDGED' : 'CONFIRMED_ISSUE';
  props.updateAlarmStatus({
    id: data.alarmId,
    observation: data.observation,
    newStatus,
  });
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

    <!-- TODO poner un efecto loading hasta que carga la info(skeleton si se puede)
    -->

    <!-- TODO hacer tarjeta que no estdao en estado carga -->

    <v-card-item>

      <div v-if="alarm">
        <div class="text-overline mb-1">¡ATENCIÓN!</div>
        <div class="text-h6 mb-1"><strong>Alarma Sin Confirmar</strong></div>
        <div class="text-caption">
          Revisa los detalles de la alarma con ID
          <strong>{{ alarm.id }}</strong> producida el
          <strong>{{ formatDate(alarm.timeStamp) }}</strong>.
        </div>
      </div>

      <div v-else>
        <div class="text-overline mb-1">Sin Alarmas</div>
        <div class="text-h6 mb-1"><strong>No hay alarmas pendientes</strong></div>
        <div class="text-caption">
          Por el momento, no hay ninguna alarma pendiente de revisión.
        </div>
      </div>

    </v-card-item>

    <v-card-actions v-if="alarm" class="d-flex justify-space-around">
      <!-- Botón Confirmar Alarma -->
      <ConfirmAlarmDialog :alarm-id="alarm.id" :alarm-timestamp="alarm.timeStamp" button-text="Confirmar"
        button-color="primary" dialog-title="Confirmar Alarma" checkbox-label="He revisado la alarma y la confirmo."
        @confirmed="handleDialogConfirm" />

      <!-- Botón Reportar Problema -->
      <ConfirmAlarmDialog :alarm-id="alarm.id" :alarm-timestamp="alarm.timeStamp" button-text="Reportar Problema"
        button-color="red" dialog-title="Reportar Problema"
        checkbox-label="He revisado la alarma y considero que hay un problema." @confirmed="handleDialogConfirm" />

    </v-card-actions>
  </v-card>
</template>

<!-- 
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
      <!-- Botón Confirmar Alarma
      <ConfirmAlarmDialog :dialog-title="'Confirmar Alarma'"
        :checkbox-label="'Confirmo que he tomado conocimiento de la alarma.'" :button-text="'Confirmar'"
        button-color="primary" :alarm-id="alarm?.id?.toString() || ''"
        :alarm-timestamp="formatDate(alarm?.timeStamp || '')" @confirmed="handleConfirmed" />

      <!-- Botón Reportar Problema
      <ConfirmAlarmDialog :dialog-title="'Reportar Problema'"
        :checkbox-label="'Confirmo que quiero reportar un problema.'" :button-text="'Reportar Problema'"
        button-color="red" :alarm-id="alarm?.id?.toString() || ''" :alarm-timestamp="formatDate(alarm?.timeStamp || '')"
        @confirmed="handleReported" />
    </v-card-actions>
  </v-card>
</template> -->
