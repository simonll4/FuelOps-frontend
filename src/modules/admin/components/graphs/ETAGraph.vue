<script setup lang="ts">
import { ref, computed, watch } from "vue";

const preset = ref(5000); // Masa total requerida (kg)
const accumulatedMass = ref(3200); // Masa acumulada actual (kg), siempre creciente
const flowRate = ref(800); // Caudal actual (kg/h)

// ETA restante dinámico en segundos
const etaSeconds = ref(
  Math.round(((preset.value - accumulatedMass.value) / flowRate.value) * 3600)
);

// Punto inicial para el cálculo del progreso
const etaInitial = ref(etaSeconds.value);

// Series inicial del gráfico
const series = ref([0]);

// Configuración del gráfico con gradiente
const chartOptions = ref({
  chart: {
    type: "radialBar",
    background: "#111C44",
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: "70%",
      },
      dataLabels: {
        show: true,
        value: {
          fontSize: "22px",
          color: "#FFFFFF",
          formatter: () => {
            const minutes = Math.floor(etaSeconds.value / 60);
            const seconds = etaSeconds.value % 60;
            return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
          },
        },
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      type: "horizontal",
      gradientToColors: ["#6AD2FF", "#39B8FF", "#7551FF"], // Gradiente
      stops: [0, 50, 100],
    },
  },
  colors: ["#5A61FF"], // Color base
  labels: ["ETA"],
});

// Cálculo del progreso relativo (0-100%)
const progress = computed(() => {
  const elapsed = etaInitial.value - etaSeconds.value;
  return Math.min((elapsed / etaInitial.value) * 100, 100);
});

// Recalcular el ETA dinámicamente cuando cambian los parámetros
watch([accumulatedMass, flowRate], () => {
  const remainingMass = preset.value - accumulatedMass.value;
  const newEtaSeconds = Math.round((remainingMass / flowRate.value) * 3600);

  // Ajustar proporcionalmente el progreso para reflejar los cambios sin reiniciar
  etaInitial.value = Math.max(
    etaInitial.value - (etaSeconds.value - newEtaSeconds),
    newEtaSeconds
  );
  etaSeconds.value = newEtaSeconds;
  series.value = [progress.value];
});

// Temporizador que actualiza cada segundo
const startCountdown = () => {
  const interval = setInterval(() => {
    if (etaSeconds.value > 0) {
      etaSeconds.value -= 1;
      series.value = [progress.value];
    } else {
      clearInterval(interval);
    }
  }, 1000);
};

startCountdown();
</script>

<template>
  <v-card class="mb-4 data-container" color="container-color" outlined="">
    <v-card-title>Tiempo estimado</v-card-title>
    <v-card-text class="eta-timer">
      <apexchart
        type="radialBar"
        :options="chartOptions"
        :series="series"
        height="320"
      />
    </v-card-text>
  </v-card>
</template>

<style scoped>
.eta-timer {
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--text-color);
}
</style>
