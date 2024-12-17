<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import type { ConfirmAlarmDialogProps } from "@/interfaces/alarm-dialog.interface";

const props = defineProps<ConfirmAlarmDialogProps>();

const emit = defineEmits(["confirmed"]);

const dialog = ref(false);
const isAcknowledged = ref(false);
const observation = ref("");

const confirmAction = () => {
  emit("confirmed", {
    alarmId: props.alarmId,
    timestamp: props.alarmTimestamp,
    observation: observation.value,
    action: props.buttonText,
  });
  closeDialog();
};

const closeDialog = () => {
  dialog.value = false;
  isAcknowledged.value = false;
  observation.value = "";
};
</script>


<template>
  <v-dialog v-model="dialog" max-width="500">

    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" :color="buttonColor">{{
        buttonText
        }}</v-btn>
    </template>

    <!-- Checkbox para doble confirmacion -->
    <v-card :title="dialogTitle" class="data-container">
      <v-card-text>
        <v-checkbox v-model="isAcknowledged" :label="checkboxLabel"></v-checkbox>

        <!-- Campo de texto para observaciones -->
        <v-text-field v-model="observation" label="Añadir observación (Opcional)"
          placeholder="Escribe una observación si lo consideras necesario" variant="outlined"></v-text-field>
      </v-card-text>

      <!-- Botones de acción -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text="Cancelar" @click="closeDialog"></v-btn>
        <v-btn color="primary" :disabled="!isAcknowledged" @click="confirmAction">
          {{ buttonText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<style lang="scss" src="/src/styles/global.scss"></style>