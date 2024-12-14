<script setup lang="ts">
import { ref, computed, watch, defineProps, watchEffect } from "vue";

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

// watchEffect(() => {
//   console.log("order: ", props.order);
//   console.log("lastDetail: ", props.lastDetail);
// });

// Cálculo de la capacidad total en litros
const totalCapacityLiters = computed(() => {
  return (
    props.order.truck.tankers?.reduce(
      (sum: number, tanker: any) => sum + (tanker.capacityLiters || 0),
      0
    ) || 0
  );
});

// Densidad del producto
const density = computed(() => parseFloat(props.order.product?.density || "0"));

// Preset en kilogramos
const presetKg = computed(() => props.order.preset || 0);

// Carga actual
const currentLoadKg = computed(() => {
  if (props.lastDetail) {
    return props.lastDetail.accumulatedMass || 0;
  }
  return parseFloat(props.order.lastAccumulatedMass || "0");
});

// Capacidad total en kilogramos
const totalCapacityKg = computed(
  () => totalCapacityLiters.value * density.value
);

// Porcentaje del preset
const presetPercentage = computed(() => {
  return totalCapacityKg.value > 0
    ? (presetKg.value / totalCapacityKg.value) * 100
    : 0;
});

// Porcentaje de carga actual
const loadPercentage = computed(() => {
  return presetKg.value > 0 ? (currentLoadKg.value / presetKg.value) * 100 : 0;
});

// Series del gráfico
const series = ref([presetPercentage.value, loadPercentage.value]);

// Actualización dinámica de las series
watch([presetPercentage, loadPercentage], () => {
  series.value = [presetPercentage.value, loadPercentage.value];
  // console.log('Series updated:', series.value);
  // console.log('presetPercentage:', presetPercentage.value);
  // console.log('loadPercentage:', loadPercentage.value);
});

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
    followCursor: true,
    fixed: {
      enabled: true,
      position: "topRight",
    },
    style: {
      fontSize: "12px",
      colors: ["#FFFFFF"],
    },
    y: {
      formatter: (val: number, opts: any) => {
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
</script>

<template>
  <v-card class="data-container" color="container-color" outlined>
    <v-card-title>Progreso de Carga</v-card-title>
    <v-container>
      <v-card-text class="d-flex justify-center align-center">
        <apexchart
          type="radialBar"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<style lang="scss" src="/src/styles/global.scss"></style>