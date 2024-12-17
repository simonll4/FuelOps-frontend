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
        download: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true,
      },
    },
  },
  xaxis: {
    type: "datetime",
    labels: {
      format: "HH:mm:ss",
      style: {
        colors: "#FFFFFF",
      },
    },
    title: {
      text: "Tiempo",
      style: {
        color: "#FFFFFF",
      },
    },
  },
  yaxis: {
    title: {
      text: "Caudal (kg/h)",
      style: {
        color: "#FFFFFF",
      },
    },
    labels: {
      formatter: (value: number) => `${value} kg/h`,
      style: {
        colors: "#FFFFFF",
      },
    },
  },
  stroke: {
    curve: "smooth",
    width: 2,
    colors: ["#1AB7EA"],
  },
  // fill: {
  //   type: "gradient",
  //   gradient: {
  //     shade: "light",
  //     gradientToColors: ["#00C9A7"],
  //     shadeIntensity: 0.3,
  //     type: "vertical",
  //     inverseColors: false,
  //     opacityFrom: 0.7,
  //     opacityTo: 0.2,
  //     stops: [0, 100],
  //   },
  // },
  fill: {
    type: "solid",
    opacity: 0,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    theme: "dark",
    x: {
      format: "HH:mm:ss",
    },
  },
  grid: {
    borderColor: "#2B3448",
  },
});

// Series del gráfico
const series = ref<{ name: string; data: { x: number; y: number }[] }[]>([
  {
    name: "Caudal",
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
        y: detail.flowRate,
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
      addDataPoint(newDetail.timeStamp, newDetail.flowRate);
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
  <v-card class="mb-4 data-container full-card" color="container-color" outlined>
    <v-card-title class="mt-2 mb-2">
      <strong> Caudal (kg/h) - Fecha: {{ currentDate }} </strong>
    </v-card-title>
    <v-container>
      <v-card-text>
        <apexchart
          type="area"
          :options="chartOptions"
          :series="series"
          width="100%"
          height="300"
        ></apexchart>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<style lang="scss" src="/src/styles/global.scss"></style>