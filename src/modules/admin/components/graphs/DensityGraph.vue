<script setup lang="ts">
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
</script>

<template>
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
</style>
