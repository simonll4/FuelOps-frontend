<script setup lang="ts">
import { ref, watch } from "vue";
import { format } from "date-fns";
import type { Alarm } from "@/interfaces/alarm.interface";
import { es } from "date-fns/locale";

// Props
const props = defineProps({
  items: {
    type: Array as () => Alarm[],
    default: () => [],
  },
  totalElements: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  setPageA: {
    type: Function,
    required: true,
  },
  isLoading: Boolean,
});

// Emit
const emit = defineEmits(["update:page"]);
const currentPage = ref(props.currentPage);

const handlePageChange = (page: number) => {
  currentPage.value = page;
  props.setPageA(page - 1);
};

watch(() => props.currentPage, (newPage) => {
  currentPage.value = newPage;
});

// Encabezados de la tabla
const headers = ref<
  Array<{ title: string; value: string; align?: "start" | "center" | "end" }>
>([
  { title: "ID", value: "id" },
  { title: "Estado", value: "status" },
  { title: "Timestamp", value: "timeStamp" },
  { title: "Temperatura (°C)", value: "temperature", align: "center" },
]);

// Clases para estilos condicionales
const getStateClass = (state: string): string => {
  if (state === "Pendiente") return "text-warning";
  if (state === "Aceptada") return "text-success";
  return "";
};

const getTemperatureClass = (temperature: number): string => {
  if (temperature > 50) return "text-danger";
  return "";
};

// Función para formatear la fecha para el título
const formatTitleDate = (timestamp: string) => {
  return format(new Date(timestamp), "dd 'de' MMMM 'de' yyyy", { locale: es }); // Puedes usar el idioma deseado.
};

const formatDate = (timestamp: string) => {
  return format(new Date(timestamp), "dd/MM/yyyy HH:mm:ss");
};


</script>

<template>
  <v-card class="mb-4" outline>

    <v-card-title>
      Alarmas de Temperatura - {{ formatTitleDate(new Date().toISOString()) }}
    </v-card-title>

    <v-data-table-server :headers="headers" :items="items" item-value="id" class="elevation-1 tabla" height="320"
      show-expand single-expand :items-per-page="pageSize" :loading="isLoading" :page="currentPage"
      :items-length="totalElements" hide-default-footer @update:page="handlePageChange">

      <!-- Columna ID -->
      <template #item.id="{ item }">
        <transition-group name="fade" tag="span">
          <span :key="`id-${item.id}`">{{ item.id }}</span>
        </transition-group>
      </template>

      <!-- Columna Estado -->
      <template #item.state="{ item }">
        <transition-group name="fade" tag="span">
          <span :key="`state-${item.id}`" :class="getStateClass(item.state)">
            {{ item.state }}
          </span>
        </transition-group>
      </template>

      <!-- Columna Timestamp -->
      <template #item.timestamp="{ item }">
        <transition-group name="fade" tag="span">
          <span :key="`timestamp-${item.id}`">{{ formatDate(item.timeStamp) }}</span>
        </transition-group>
      </template>

      <!-- Columna Temperatura -->
      <template #item.temperature="{ item }">
        <transition-group name="fade" tag="span">
          <span :key="`temperature-${item.id}`" :class="getTemperatureClass(item.temperature)">
            {{ item.temperature }} °C
          </span>
        </transition-group>
      </template>

      <!-- Contenido Expandido-->
      <template v-slot:expanded-row="{ columns, item }">
        <tr class="pa-4">
          <td :colspan="columns.length">
            <p>
              <strong>Observación:</strong>
              {{ item.observations || "Sin observaciones" }}
            </p>
            <p>
              <strong>Operador Responsable:</strong>
              {{ item.user || "Sin asignar" }}
            </p>
          </td>
        </tr>
      </template>

      <!-- Footer personalizado -->
      <template #bottom>
        <v-container class="d-flex justify-center">
          <v-pagination :model-value="currentPage" :length="totalPages" :total-visible="5"
            @update:modelValue="handlePageChange" />
        </v-container>
      </template>
    </v-data-table-server>
  </v-card>
</template>

<style lang="scss" src="/src/styles/global.scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>


<!-- <script setup lang="ts">
import { ref } from "vue";
import type { Alarm } from "@/interfaces/alarm-interface";

// Umbral de temperatura (puedes configurarlo dinámicamente si lo necesitas)
const thresholdTemperature = ref(50); // °C

//TODO: Configurar el items per page para que no muestre un scroll

// Datos simulados de las alarmas
const alarms = ref<Alarm[]>([
  {
    id: 1,
    orderId: 1,
    state: "Pendiente",
    timestamp: "2024-11-17 08:30:00",
    temperature: 55,
    observation: "Temperatura excedió el umbral",
    operator: null,
  },
  {
    id: 2,
    orderId: 1,
    state: "Aceptada",
    timestamp: "2024-11-17 09:00:00",
    temperature: 48,
    observation: null,
    operator: "John Doe",
  },
  {
    id: 3,
    orderId: 1,
    state: "Pendiente",
    timestamp: "2024-11-17 10:15:00",
    temperature: 52,
    observation: "Monitorear cambios",
    operator: null,
  },
]);

// Encabezados de la tabla
const headers = ref<
  { title: string; value: string; align?: "center" | "start" | "end" }[]
>([
  { title: "ID", value: "id" },
  { title: "Estado", value: "state" },
  { title: "Timestamp", value: "timestamp" },
  { title: "Temperatura (°C)", value: "temperature", align: "center" },
]);

// Clases para el estado
const getStateClass = (state: string): string => {
  if (state === "Pendiente") return "text-warning";
  if (state === "Aceptada") return "text-success";
  return "";
};

</script> -->
<!-- 
<template>
  <v-card class="mb-4" outlined>
    <v-card-title>Alarmas de Temperatura</v-card-title>
    <v-data-table-server :headers="headers" :items="alarms" :items-length="alarms.length" item-value="id"
      class="elevation-1 tabla" show-expand single-expand height="260">

      <!-- Columna Estado con color 
      <template #item.state="{ item }">
        <span :class="getStateClass(item.state)">
          {{ item.state }}
        </span>
      </template>

      <!-- Columna Temperatura con advertencia si excede el umbral 
      <template #item.temperature="{ item }">
        <span :class="{ 'text-danger': item.temperature > thresholdTemperature }">
          {{ item.temperature }}°C
        </span>
      </template>

      <!-- Contenido Expandido 
      <template v-slot:expanded-row="{ columns, item }">
        <tr class="pa-4">
          <td :colspan="columns.length">
            <p>
              <strong>Observación:</strong>
              {{ item.observation || "Sin observaciones" }}
            </p>
            <p>
              <strong>Operador Responsable:</strong>
              {{ item.operator || "Sin asignar" }}
            </p>
          </td>
        </tr>
      </template>

    </v-data-table-server>
  </v-card>
</template> -->

<!-- <style lang="scss" src="/src/styles/global.scss"></style> -->