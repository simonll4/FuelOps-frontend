<script setup lang="ts">
import { ref, watch, computed, onMounted } from "vue";
import type { OrderDetail } from "@/interfaces/order-details.interface";

// Props para recibir datos
const props = defineProps<{
  allOrderDetails: OrderDetail[];
  lastDetail: OrderDetail | null;
}>();

// Opciones del gráfico
const chartOptions = ref({
  chart: {
    type: "area",
    background: "#111c44",
    foreColor: "#FFFFFF",
    animations: {
      enabled: true,
      easing: "linear",
      speed: 800,
    },
  },
  xaxis: {
    type: "datetime",
    labels: {
      format: "HH:mm",
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
  type: "solid",
  opacity: 0,
},
  // fill: {
  //   type: "gradient",
  //   gradient: {
  //     shade: "dark",
  //     gradientToColors: ["#39B8FF"],
  //     shadeIntensity: 1,
  //     type: "vertical",
  //     stops: [0, 100],
  //   },
  // },
  dataLabels: {
    enabled: false,
  },
  colors: ["#39B8FF"],
  tooltip: {
    theme: "dark",
    x: {
      format: "HH:mm:ss",
    },
  },
});

// Series del gráfico
const series = ref<{ name: string; data: { x: number; y: number }[] }[]>([
  {
    name: "Temperatura",
    data: [],
  },
]);

// Función para ajustar el timestamp a la zona horaria local
const adjustToLocalTime = (isoString: string) => {
  const date = new Date(isoString);
  // Ajustar la marca de tiempo restando el desfase de la zona horaria local
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
        y: detail.temperature,
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
      addDataPoint(newDetail.timeStamp, newDetail.temperature);
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
  <div>
    <v-card class="mb-4 data-container" color="container-color" outlined="">
      <v-card-title>Temperatura - Fecha: {{ currentDate }}</v-card-title>
      <v-card-text class="tempchart">
        <apexchart type="area" :options="chartOptions" :series="series" width="800" height="300"></apexchart>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
.tempchart {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #111c44;
  border-radius: 12px;
}
</style>

<!-- <script setup lang="ts">
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
    type: "area",
    background: "#111c44",
    foreColor: "#FFFFFF",
    animations: {
      enabled: true,
      easing: "linear",
      speed: 800,
    },
  },
  xaxis: {
    type: "datetime",
    labels: {
      format: "HH:mm",
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
    x: {
      format: "HH:mm:ss",
    },
  },
});

// Series del gráfico
const series = ref<{ name: string; data: { x: string; y: number }[] }[]>([
  {
    name: "Temperatura",
    data: [],
  },
]);

// Función para agregar un nuevo dato al gráfico
const addDataPoint = (timestamp: string, value: number) => {
  // Agregar nuevo punto
  series.value[0].data.push({ x: timestamp, y: value });

  // Ordenar los datos por timestamp para mantener continuidad
  series.value[0].data.sort((a, b) => new Date(a.x).getTime() - new Date(b.x).getTime());

  // Limitar el número de puntos visibles
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
        x: detail.timeStamp,
        y: detail.temperature,
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
      addDataPoint(newDetail.timeStamp, newDetail.temperature);
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
  <div>
    <v-card class="mb-4 data-container" color="container-color" outlined="">
      <v-card-title>Temperatura - Fecha: {{ currentDate }}</v-card-title>
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
.tempchart {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #111c44;
  border-radius: 12px;
}
</style> -->



<!-- <script setup lang="ts">
import { ref } from "vue";

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

// onMounted(() => {
//   console.log("Temperature chart mounted with data:", series.value);
// });
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
</style> -->
