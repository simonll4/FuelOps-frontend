<script setup lang="ts">
import { ref, computed, watch } from "vue";

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
  lastDetail: {
    type: Object as () => Record<string, any> | null,
    required: false,
    default: null,
  },
});

// Parámetros obtenidos de las props
const preset = ref(props.order.preset || 0); // Masa total requerida (kg)
const accumulatedMass = ref(props.lastDetail?.accumulatedMass || 0); // Masa acumulada actual (kg)
const flowRate = ref(props.lastDetail?.flowRate || 0); // Caudal actual (kg/h)

// ETA restante dinámico en minutos
const etaMinutes = ref(
  flowRate.value > 0
    ? Math.round(((preset.value - accumulatedMass.value) / flowRate.value) * 60)
    : 0
);

// Punto inicial para el cálculo del progreso
const etaInitial = ref(etaMinutes.value);

// Series inicial del gráfico
const series = ref([100]); // Comienza al 100% por defecto

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
            const hours = Math.floor(etaMinutes.value / 60);
            const minutes = etaMinutes.value % 60;
            return `${hours}h ${minutes}m`;
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
      gradientToColors: ["#6AD2FF", "#39B8FF", "#7551FF"],
      stops: [0, 50, 100],
    },
  },
  colors: ["#5A61FF"],
  labels: ["ETA"],
});

// Cálculo del progreso relativo (0-100%)
const progress = computed(() => {
  const remainingMass = preset.value - accumulatedMass.value;
  const progressValue = remainingMass <= 0
    ? 100 // Completado
    : Math.max(0, Math.min(100, ((preset.value - remainingMass) / preset.value) * 100));
  return progressValue;
});

// Recalcular el ETA dinámicamente cuando cambian los parámetros
watch(
  () => [props.lastDetail?.accumulatedMass, props.lastDetail?.flowRate],
  ([newAccumulatedMass, newFlowRate]) => {
    if (newAccumulatedMass !== undefined) accumulatedMass.value = newAccumulatedMass;
    if (newFlowRate !== undefined) flowRate.value = newFlowRate;

    const remainingMass = preset.value - accumulatedMass.value;
    const newEtaMinutes =
      flowRate.value > 0 ? Math.round((remainingMass / flowRate.value) * 60) : 0;

    etaMinutes.value = newEtaMinutes;
    series.value = [progress.value];
  }
);
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


<!-- <script setup lang="ts">
import { ref, computed, watch } from "vue";

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
  lastDetail: {
    type: Object as () => Record<string, any> | null,
    required: false,
    default: null,
  },
});

// Parámetros obtenidos de las props
const preset = ref(props.order.preset || 0); // Masa total requerida (kg)
const accumulatedMass = ref(props.lastDetail?.accumulatedMass || 0); // Masa acumulada actual (kg)
const flowRate = ref(props.lastDetail?.flowRate || 0); // Caudal actual (kg/h)

// ETA restante dinámico en segundos
const etaSeconds = ref(
  flowRate.value > 0
    ? Math.round(((preset.value - accumulatedMass.value) / flowRate.value) * 3600)
    : 0
);

// Punto inicial para el cálculo del progreso
const etaInitial = ref(etaSeconds.value);

// Series inicial del gráfico
const series = ref([100]); // Comienza al 100% por defecto

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
      gradientToColors: ["#6AD2FF", "#39B8FF", "#7551FF"],
      stops: [0, 50, 100],
    },
  },
  colors: ["#5A61FF"],
  labels: ["ETA"],
});

// Cálculo del progreso relativo (0-100%)
const progress = computed(() => {
  const remainingMass = preset.value - accumulatedMass.value;
  const progressValue = remainingMass <= 0
    ? 100 // Completado
    : Math.max(0, Math.min(100, ((preset.value - remainingMass) / preset.value) * 100));
  return progressValue;
});

// Recalcular el ETA dinámicamente cuando cambian los parámetros
watch(
  () => [props.lastDetail?.accumulatedMass, props.lastDetail?.flowRate],
  ([newAccumulatedMass, newFlowRate]) => {
    if (newAccumulatedMass !== undefined) accumulatedMass.value = newAccumulatedMass;
    if (newFlowRate !== undefined) flowRate.value = newFlowRate;

    const remainingMass = preset.value - accumulatedMass.value;
    const newEtaSeconds =
      flowRate.value > 0 ? Math.round((remainingMass / flowRate.value) * 3600) : 0;

    etaSeconds.value = newEtaSeconds;
    series.value = [progress.value];
  }
);

</script>

<template>
  <v-card class="mb-4 data-container" color="container-color" outlined="">
    <v-card-title>Tiempo estimado</v-card-title>
    <v-card-text class="eta-timer">
      <apexchart type="radialBar" :options="chartOptions" :series="series" height="320" />
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
</style> -->

<!-- <script setup lang="ts">
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
</style>  -->
