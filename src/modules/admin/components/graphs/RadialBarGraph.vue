<script setup lang="ts">
import { ref, computed, watch } from "vue";
import ApexCharts from "apexcharts";

// Variables principales
const totalCapacityLiters = ref(10000); // Capacidad total (en litros)
const density = ref(0.58); // Densidad del gas (kg/L) (butano como ejemplo)
const presetKg = ref(5000); // Preset en kilogramos
const currentLoadKg = ref(1000); // Masa acumulada (kg)

// Cálculos derivados
const totalCapacityKg = computed(
  () => totalCapacityLiters.value * density.value
);
const presetPercentage = computed(
  () => (presetKg.value / totalCapacityKg.value) * 100
);
const loadPercentage = computed(
  () => (currentLoadKg.value / presetKg.value) * 100
);

// Series del gráfico
const series = ref([presetPercentage.value, loadPercentage.value]);

// Actualización dinámica
const updateSeries = () => {
  series.value = [presetPercentage.value, loadPercentage.value];
};

// Observa los cambios en los cálculos para actualizar dinámicamente
watch([presetPercentage, loadPercentage], updateSeries);

//TODO: Ver bien el tema de las animaciones, capaz cambiar los colores del gradiente
// Opciones del gráfico
const chartOptions = ref({
  chart: {
    type: "radialBar",
    background: "#111c44",
    foreColor: "#FFFFFF",
    animations: {
      enabled: true,
      easing: "easeinout",
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 300,
      },
      dynamicAnimation: {
        enabled: true,
        speed: 1000,
      },
    },
  },
  plotOptions: {
    radialBar: {
      hollow: {
        margin: 10,
        size: "60%",
      },
      dataLabels: {
        show: true,
        name: {
          show: true,
          fontSize: "16px",
          color: "#fff",
        },
        value: {
          show: true,
          fontSize: "14px",
          color: "#fff",
          formatter: (val: any) => `${Number(val).toFixed(1)}%`,
        },
      },
      track: {
        background: "#2B3448",
        strokeWidth: "100%",
      },
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      shadeIntensity: 0.5,
      gradientToColors: ["#FF9900", "#1AB7EA"],
      stops: [0, 100],
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 0.8,
    },
  },
  colors: ["#FF5733", "#1AB7EA"],
  labels: ["Cap. Total y Preset", "Carga Actual"],
  tooltip: {
    enabled: true,
    theme: "dark",
    followCursor: true, // Seguir al cursor
    fixed: {
      enabled: true, // Permitir persistencia
      position: "topRight",
    },
    style: {
      fontSize: "12px",
      colors: ["#FFFFFF"],
    },
    y: {
      formatter: (val: number, opts: any) => {
        // Diferenciar según el índice de la serie
        if (opts.seriesIndex === 0) {
          return `Capacidad Total: ${totalCapacityKg.value.toFixed(
            2
          )} kg (Preset: ${presetKg.value.toFixed(2)} kg)`;
        } else if (opts.seriesIndex === 1) {
          return `Carga Actual: ${currentLoadKg.value.toFixed(2)} kg`;
        }
        return "";
      },
    },
  },
  legend: {
    show: true,
    position: "bottom",
    labels: {
      colors: "#FFFFFF",
    },
  },
});

// Función para actualizar series sin redibujar
const chartRef = ref(null);

const updateChart = () => {
  if (chartRef.value) {
    ApexCharts.exec("radialBarChart", "updateSeries", series.value);
  }
};

//TODO: Eliminar esto, es una prueba nomas para ver las animaciones
// Simulación temporal de actualizaciones de carga
const simulateLoadUpdates = () => {
  const intervalId = setInterval(() => {
    const increment = Math.random() * 200; // Incremento aleatorio
    const newLoad = currentLoadKg.value + increment;

    if (newLoad >= presetKg.value) {
      clearInterval(intervalId); // Detener cuando se alcanza o excede el preset
    } else {
      currentLoadKg.value = newLoad; // Actualizar la carga actual
      updateChart();
    }
  }, 1000); // Cada 1 segundo
};

// Iniciar simulación
simulateLoadUpdates();
</script>

<template>
  <v-card class="mb-4 data-container" color="container-color" outlined>
    <v-card-title>Progreso de Carga</v-card-title>
    <v-card-text class="d-flex justify-center align-center">
      <apexchart
        type="radialBar"
        :options="chartOptions"
        :series="series"
        width="380"
        height="300"
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
