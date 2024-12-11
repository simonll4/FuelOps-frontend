<script setup lang="ts">
import { ref, watch, computed } from "vue";
import type { OrderDetail } from "@/interfaces/order-details.interface";

// Props para recibir datos
const props = defineProps<{
  allOrderDetails: OrderDetail[];
  lastDetail: OrderDetail | null;
}>();

// Opciones del gráfico
const chartOptions = ref({
  chart: {
    type: "line",
    height: 350,
    zoom: {
      enabled: true,
    },
    toolbar: {
      show: true,
      tools: {
        download: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true,
      },
    },
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  colors: ["#FF5733"], // Color de la línea
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    type: "datetime",
    labels: {
      format: "HH:mm:ss",
    },
    title: {
      text: "Tiempo",
      style: {
        color: "#FFFFFF",
        fontSize: "14px",
      },
    },
    axisBorder: {
      color: "#FFFFFF",
    },
  },
  yaxis: {
    title: {
      text: "Densidad (kg/m³)",
      style: {
        color: "#FFFFFF",
        fontSize: "14px",
      },
    },
    labels: {
      formatter: (value: number) => `${value.toFixed(2)} kg/m³`,
    },
    axisBorder: {
      color: "#FFFFFF",
    },
  },
  tooltip: {
    x: {
      format: "HH:mm:ss",
    },
    theme: "dark",
  },
  grid: {
    borderColor: "#2B3448",
  },
});

// Series del gráfico
const series = ref<{ name: string; data: { x: number; y: number }[] }[]>([
  {
    name: "Densidad",
    data: [],
  },
]);

// Función para ajustar el timestamp a la zona horaria local
const adjustToLocalTime = (isoString: string) => {
  const date = new Date(isoString);
  return date.getTime() - date.getTimezoneOffset() * 60000;
};

// Función para agregar un nuevo dato al gráfico
const addDataPoint = (timestamp: string, value: number) => {
  const adjustedTimestamp = adjustToLocalTime(timestamp);
  series.value[0].data.push({ x: adjustedTimestamp, y: value });

  series.value[0].data.sort((a, b) => a.x - b.x);

  const maxPoints = 100;
  if (series.value[0].data.length > maxPoints) {
    series.value[0].data = series.value[0].data.slice(-maxPoints);
  }
};

// Watch para los datos históricos
watch(
  () => props.allOrderDetails,
  (newDetails) => {
    if (newDetails.length > 0) {
      const formattedData = newDetails.map((detail) => ({
        x: adjustToLocalTime(detail.timeStamp),
        y: detail.density,
      }));
      series.value[0].data = formattedData;
    }
  },
  { immediate: true }
);

// Watch para las actualizaciones en tiempo real
watch(
  () => props.lastDetail,
  (newDetail) => {
    if (newDetail) {
      addDataPoint(newDetail.timeStamp, newDetail.density);
    }
  }
);

// Computed para obtener la fecha actual del gráfico
const currentDate = computed(() => {
  if (props.allOrderDetails.length > 0) {
    return new Date(props.allOrderDetails[0].timeStamp).toLocaleDateString();
  }
  return new Date().toLocaleDateString();
});
</script>

<template>
  <v-card class="mb-4 data-container" color="container-color" outlined>
    <v-card-title>Densidad (kg/m³) - Fecha: {{ currentDate }}</v-card-title>
    <v-card-text>
      <apexchart
        type="line"
        :options="chartOptions"
        :series="series"
        width="100%"
        height="350"
      ></apexchart>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.data-container {
  background-color: #111c44;
  border-radius: 12px;
}
</style>


<!-- <script setup lang="ts">
import { ref, onMounted } from "vue";

// Opciones del gráfico
const chartOptions = ref({
  chart: {
    type: "line",
    height: 350,
    zoom: {
      enabled: true,
    },
    toolbar: {
      show: true,
      tools: {
        download: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true,
      },
    },
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  colors: ["#FF5733"], // Color de la línea
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    type: "datetime", // Eje basado en tiempo
    labels: {
      format: "HH:mm:ss",
    },
    title: {
      text: "Tiempo",
      style: {
        color: "#FFFFFF",
        fontSize: "14px",
      },
    },
    axisBorder: {
      color: "#FFFFFF",
    },
  },
  yaxis: {
    title: {
      text: "Densidad (kg/m³)",
      style: {
        color: "#FFFFFF",
        fontSize: "14px",
      },
    },
    labels: {
      formatter: (value: number) => `${value.toFixed(2)} kg/m³`,
    },
    axisBorder: {
      color: "#FFFFFF",
    },
  },
  tooltip: {
    x: {
      format: "HH:mm:ss",
    },
    theme: "dark",
  },
  grid: {
    borderColor: "#2B3448",
  },
});

// Datos iniciales de la densidad (simulados)
const series = ref([
  {
    name: "Densidad",
    data: [
      { x: new Date().getTime(), y: 820 },
      { x: new Date().getTime() + 1000 * 60, y: 830 },
      { x: new Date().getTime() + 1000 * 120, y: 815 },
      { x: new Date().getTime() + 1000 * 180, y: 825 },
    ],
  },
]);

// Simulación de cambios de densidad
const simulateDensity = () => {
  const now = new Date().getTime();
  const lastValue = series.value[0].data[series.value[0].data.length - 1]?.y || 820; // Último valor registrado
  const newValue = Math.max(800, Math.min(850, lastValue + Math.random() * 5 - 2.5)); // Fluctuaciones sutiles

  // Agregar nuevo punto al dataset
  series.value[0].data.push({ x: now, y: newValue });

  // Mantener solo los últimos 20 puntos
  if (series.value[0].data.length > 20) {
    series.value[0].data.shift();
  }
};

// Iniciar simulación al montar el componente
onMounted(() => {
  setInterval(simulateDensity, 5000);
});
</script> -->

<!-- <template>
  <v-card class="mb-4 data-container" color="container-color" outlined>
    <v-card-title>Densidad (kg/m³) en el Tiempo</v-card-title>
    <v-card-text>
      <apexchart
        type="line"
        :options="chartOptions"
        :series="series"
        width="100%"
        height="350"
      ></apexchart>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.data-container {
  background-color: #111c44;
  border-radius: 12px;
}
</style> -->
