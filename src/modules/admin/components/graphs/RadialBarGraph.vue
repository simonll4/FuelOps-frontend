<script setup lang="ts">
import { ref, computed } from "vue";

// Parámetros en kilogramos
const preset = ref(5000); // Masa total requerida (kg)
const accumulatedMass = ref(4200); // Masa acumulada actual (kg), siempre creciente

// Series para el gráfico
const series = computed(() => {
  const accumulatedPercentage = Math.min(
    (accumulatedMass.value / preset.value) * 100,
    100
  ); // Limita al 100%
  return [100, accumulatedPercentage]; // 100% para el preset y progreso actual para la carga
});

// Opciones del gráfico
const chartOptions = ref({
  chart: {
    type: "radialBar",
    background: "#111c44",
    foreColor: "#FFFFFF",
  },
  plotOptions: {
    radialBar: {
      dataLabels: {
        show: true,
        name: {
          show: true,
          fontSize: "18px",
          color: "#fff",
        },
        value: {
          show: true,
          fontSize: "16px",
          color: "#fff",
          formatter: (val: number) => `${val.toFixed(1)}%`, // Redondea a un decimal
        },
      },
      track: {
        background: "#2B3448",
        strokeWidth: "99%",
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "horizontal",
      gradientToColors: ["#FF9900", "#1AB7EA"],
      stops: [0, 100],
    },
  },
  colors: ["#1AB7EA", "#FF5733"], // Preset y Carga
  labels: ["Preset (100%)", "Carga actual"], // Etiquetas del gráfico
  legend: {
    show: true,
    position: "bottom",
    labels: {
      colors: "#FFFFFF",
    },
  },
  tooltip: {
    enabled: true,
    y: {
      formatter: (val: number, { seriesIndex }: { seriesIndex: number }) => {
        if (seriesIndex === 0) {
          return `${preset.value} kg - Preset total`;
        } else if (seriesIndex === 1) {
          return `${accumulatedMass.value.toFixed(1)} kg - Masa acumulada`;
        }
        return `${val}%`;
      },
    },
  },
});
</script>

<template>
  <v-card class="mb-4 data-container" color="container-color" outlined>
    <v-card-title>Progreso de Carga</v-card-title>
    <v-card-text class="radialbar">
      <apexchart
        type="radialBar"
        :options="chartOptions"
        :series="series"
        width="380"
        height="310"
      ></apexchart>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.radialbar {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #111c44;
  border-radius: 12px;
}
</style>
