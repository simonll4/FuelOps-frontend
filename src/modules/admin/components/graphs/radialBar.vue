<script setup lang="ts">
import { ref, onMounted } from "vue";

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
          formatter: (val: number) => `${val}%`,
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
  colors: ["#FF5733", "#1AB7EA"],
  labels: ["Preset", "Carga actual"],
  legend: {
    show: true,
    position: "bottom",
    labels: {
      colors: "#FFFFFF",
    },
  },
});

// Datos de ejemplo
const series = ref([92, 68]);

// Método para actualizar datos dinámicamente (opcional)
const updateChart = () => {
  series.value = [
    Math.floor(Math.random() * 100),
    Math.floor(Math.random() * 100),
  ];
};

// Invocado al montar el componente
onMounted(() => {
  console.log("RadialBar mounted with data:", series.value);
});
</script>

<template>
  <v-card class="mb-4 data-container" color="container-color" outlined="">
    <v-card-title>Load Progress</v-card-title>
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
