<script setup lang="ts">
import { ref, onMounted } from "vue";

// Opciones del gráfico
const chartOptions = ref({
  chart: {
    type: "area",
    background: "#111c44",
    foreColor: "#FFFFFF",
  },
  xaxis: {
    categories: [
      "2024-11-01",
      "2024-11-02",
      "2024-11-03",
      "2024-11-04",
      "2024-11-05",
      "2024-11-06",
      "2024-11-07",
    ],
    labels: {
      style: {
        colors: "#FFFFFF",
      },
    },
    title: {
      text: "Hora",
      style: {
        color: "#FFFFFF",
      },
    },
  },
  yaxis: {
    title: {
      text: "Temperatura (°C)",
      style: {
        color: "#FFFFFF",
      },
    },
    labels: {
      style: {
        colors: "#FFFFFF",
      },
    },
  },
  stroke: {
    curve: "smooth",
    colors: ["#39B8FF"],
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      gradientToColors: ["#39B8FF"],
      shadeIntensity: 1,
      type: "vertical",
      stops: [0, 100],
    },
  },
  dataLabels: {
    enabled: false,
  },
  colors: ["#39B8FF"],
  tooltip: {
    theme: "dark",
  },
});

// Datos de ejemplo
// const series = ref([
//   {
//     name: "Temperatura",
//     data: [18, 20, 22, 24, 23, 21, 19], // Ejemplo de temperaturas
//   },
// ]);

// Generar 100 datos de ejemplo de temperaturas
const generateTemperatureData = () => {
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push(Math.floor(Math.random() * 10) + 15); // Genera temperaturas entre 15°C y 25°C
  }
  return data;
};

// Datos de ejemplo
const series = ref([
  {
    name: 'Temperatura',
    data: generateTemperatureData(),
  },
]);


// Método para simular datos dinámicos (opcional)
const updateChart = () => {
  const newData = series.value[0].data.map(
    () => Math.floor(Math.random() * 10) + 15 // Genera temperaturas entre 15°C y 25°C
  );
  series.value[0].data = newData;
};

onMounted(() => {
  console.log("Temperature chart mounted with data:", series.value);
});
</script>

<template>
  <div>
    <v-card class="mb-4 data-container" color="container-color" outlined="">
      <v-card-title>Temperature Over Time</v-card-title>
      <v-card-text class="tempchart">
        <apexchart
          type="area"
          :options="chartOptions"
          :series="series"
          width="800"
          height="300"
        ></apexchart>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
/* Fondo oscuro */
.tempchart {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #111c44;
  border-radius: 12px;
}
</style>
