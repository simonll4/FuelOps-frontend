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
    toolbar: {
      show: true,
      tools: {
        download: {
          style: {
            background: "#39B8FF",
            color: "#FFFFFF",
          },
        },
      },
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
  <v-card
    class="mb-4 data-container full-card"
    color="container-color"
    outlined
  >
    <v-card-title class="mt-2 mb-2">
      <strong> Temperatura - Fecha: {{ currentDate }} </strong>
    </v-card-title>
    <v-container>
      <v-card-text class="tempchart">
        <apexchart
          type="area"
          :options="chartOptions"
          :series="series"
          width="800"
          height="300"
        ></apexchart>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<style lang="scss" src="/src/styles/global.scss"></style>
