<script setup lang="ts">
import ConfirmAlarmDialog from "./AlarmDialog.vue";
import AlarmCard from "./AlarmCard.vue";

import type { Alarm } from "@/interfaces/alarm.interface";
import type { Order } from "@/interfaces/order.interface";

const props = defineProps<{
  alarm: Alarm | undefined;
  updateAlarmStatus: (payload: {
    id: number;
    observation: string;
    newStatus: string;
  }) => void;
  order: Order | null;
  isUpdating: boolean;
  isError: boolean;
  isLoading: boolean;
}>();

const handleDialogConfirm = (data: {
  alarmId: number;
  observation: string;
  action: string;
}) => {
  const newStatus =
    data.action === "Confirmar" ? "ACKNOWLEDGED" : "CONFIRMED_ISSUE";
  props.updateAlarmStatus({
    id: data.alarmId,
    observation: data.observation,
    newStatus,
  });
};

const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `${formattedDate} a las ${formattedTime}`;
};

</script>


<template>
  <!-- TODO: Ver que el skeleton quede mejor -->

  <v-container v-if="isLoading" class="pa-0 full-card">
    <v-skeleton-loader type="card" color="#111C44" class="rounded-card full-height" />
  </v-container>

  <v-container v-else class="pa-0">

    <AlarmCard v-if="alarm && order?.status == 'REGISTERED_INITIAL_WEIGHING'" title="¡ATENCIÓN!" :message="`Revisa los detalles de la alarma con ID ${alarm.id
      } producida el ${formatDate(alarm.timeStamp)}.`" variant="pending">
      <template #actions>
        <ConfirmAlarmDialog :alarm-id="alarm.id" :alarm-timestamp="alarm.timeStamp" button-text="Confirmar"
          button-color="primary" dialog-title="Confirmar Alarma" checkbox-label="He revisado la alarma y la confirmo."
          @confirmed="handleDialogConfirm" />
        <ConfirmAlarmDialog :alarm-id="alarm.id" :alarm-timestamp="alarm.timeStamp" button-text="Reportar Problema"
          button-color="red" dialog-title="Reportar Problema"
          checkbox-label="He revisado la alarma y considero que hay un problema." @confirmed="handleDialogConfirm" />
      </template>
    </AlarmCard>

    <AlarmCard v-else-if="order?.status != 'REGISTERED_INITIAL_WEIGHING'" title="La orden no está en estado de carga."
      message="Durante la carga de combustible, podrás gestionar las alarmas de precaución." variant="invalid" />

    <AlarmCard v-else title="¡Buenas noticias!" message="Por el momento, no hay ninguna alarma pendiente de revisión."
      variant="none" />
  </v-container>

</template>

<style lang="scss" src="/src/styles/global.scss"></style>