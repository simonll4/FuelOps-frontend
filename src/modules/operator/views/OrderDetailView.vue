<script lang="ts" setup="">
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useOrderDetails } from "@/composables/use.order.details";
import { useWsOrderDetail } from "@/composables/ws/use.ws.order.details";

import OperatorLayout from "../layouts/OperatorLayout.vue";
import OrderDetailTable from "../components/order/OrderDetailTable.vue";
import OrderProductData from "../components/order/OrderProductData.vue";
import ETA from "../components/graphs/ETAGraph.vue";
import OrderData from "../components/order/OrderData.vue";
import AlarmTable from "../components/alarms/AlarmTable.vue";
import AlarmHandler from "../components/alarms/AlarmHandler.vue";
import RadialBar from "../components/graphs/RadialBarGraph.vue";
import TemperatureChart from "../components/graphs/TemperatureGraph.vue";
import FlowRateGraph from "../components/graphs/FlowRateGraph.vue";
import DensityGraph from "../components/graphs/DensityGraph.vue";

import { useAllOrderDetails } from "@/composables/use.all.order.details";
import { useWsLatestOrderDetails } from "@/composables/ws/use.ws.latest.order.details";
import { useOrder } from "@/composables/use.order";
import { useAlarms } from "@/composables/use.alarms";
import { useWsAlarms } from "@/composables/ws/use.ws.alarms";
import { useAlarmHandler } from "@/composables/use.alarm.handler";
import { useOrderConciliation } from "@/composables/use.order.conciliation";

const route = useRoute();

// DATOS DE LA ORDEN
const orderNumber = ref(Number(route.params.id));
const { order } = useOrder(orderNumber.value);

// TABLA DE DETALLES
const {
  orderDetails,
  currentPageD,
  currentPageD1,
  totalPagesD,
  pageSizeD,
  totalElementsD,
  isLoadingD,
  setPageD,
  refetchD,
} = useOrderDetails(orderNumber.value);
const { detail } = useWsOrderDetail(orderNumber.value); // se suscribe al websocket para recibir los detalles en tiempo real

watch(detail, () => {
  if (currentPageD1.value != 0) {
    refetchD();
  }
});

// TABLA DE ALARMAS
const {
  alarms,
  currentPageA,
  totalPagesA,
  totalElementsA,
  pageSizeA,
  isLoadingA,
  setPageA,
  refetchA,
} = useAlarms(orderNumber.value);
const { alarm } = useWsAlarms(orderNumber.value);

watch(alarm, () => {
  refetchA();
});

const { updateAlarmStatus, isUpdating, isError } = useAlarmHandler();

// GRAFICOS
const { allOrderDetails, isLoadingAD, error } = useAllOrderDetails(
  orderNumber.value
); // Todos los detalles de la orden, para dibujar los graficos
const { lastDetail } = useWsLatestOrderDetails(orderNumber.value); // Ultimo detalle de la orden, para actualizar los graficos en tiempo real

// ROUTER
const router = useRouter();

const { downloadConciliation, isDownloading } = useOrderConciliation();

const downloadReconciliation = () => {
  downloadConciliation(orderNumber.value);
};

const goBack = () => {
  router.back();
};
</script>
<template>
  <OperatorLayout>
    <v-container class="d-flex align-center pa-0">
      <!-- Botón para volver atrás -->
      <v-btn icon @click="goBack" class="mr-2" color="transparent" flat>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <h6>Operador / Detalle de Orden</h6>
    </v-container>

    <v-container>
      <h1>Detalle de Orden</h1>
    </v-container>

    <v-container>
      <v-row align="center" class="mb-2" justify="space-between">
        <v-col>
          <h1 class="text-h4">Orden N° #{{ orderNumber }}</h1>
        </v-col>

        <v-col class="text-right">
          <v-btn v-if="order?.status == 'REGISTERED_FINAL_WEIGHING'" @click="downloadReconciliation"
            :loading="isDownloading" color="primary" class="btn-color-5 align-center">
            <v-icon>mdi-download</v-icon>
            <p>Descargar conciliación</p>
          </v-btn>

          <v-btn v-else class="btn-disabled-outline" color="#1976d2" disabled variant="tonal">
            Conciliación no disponible
          </v-btn>
        </v-col>
      </v-row>

      <!-- Datos de la orden y Notificacion de Alarmas -->
      <v-row>
        <v-col cols="4" lg="4" md="12" sm="12" xs="12">
          <OrderData v-if="order" :order="order" :detail="lastDetail" class="full-card" />
        </v-col>

        <v-col cols="2" lg="2" md="12" sm="12" xs="12">
          <OrderProductData v-if="order" :productName="order.product.product" :thresholdTemperature="order.product.thresholdTemperature.toString()
            " />
        </v-col>

        <v-col cols="6" lg="6" md="12" sm="12" xs="12">
          <AlarmHandler class="full-card" :alarm="alarm" :order="order" :updateAlarmStatus="updateAlarmStatus"
            :isUpdating="isUpdating" :isError="isError" :isLoading="isLoadingA" />
        </v-col>
      </v-row>

      <v-row>
        <!-- Columna para los gráficos -->
        <v-col cols="3" lg="3" md="12" sm="12" xs="12">
          <!-- Gráfico circular -->
          <RadialBar class="full-size" v-if="order" :order="order" :last-detail="lastDetail" />
        </v-col>
        <!-- ETA -->
        <v-col cols="3" lg="3" md="12" sm="12" xs="12">
          <ETA class="full-size" v-if="order" :order="order" :last-detail="lastDetail" />
        </v-col>

        <!-- Columna para la tabla de alarmas -->
        <v-col cols="6" lg="6" md="12" sm="12" xs="12">
          <AlarmTable :items="alarms" :totalElements="totalElementsA" :current-page="currentPageA"
            :page-size="pageSizeA" :total-pages="totalPagesA" :isLoading="isLoadingA" :set-page-a="setPageA"
            class="tabla full-card" />
        </v-col>
      </v-row>

      <v-row>
        <!-- Tabla de detalles -->
        <v-col cols="6" lg="6" md="12" sm="12" xs="12">
          <OrderDetailTable :items="orderDetails" :totalElements="totalElementsD" :current-page="currentPageD"
            :page-size="pageSizeD" :total-pages="totalPagesD" :isLoading="isLoadingD" :set-page-d="setPageD" />
        </v-col>

        <!-- Graficos de Temperatura -->
        <v-col cols="6" lg="6" md="12" sm="12" xs="12">
          <TemperatureChart :allOrderDetails="allOrderDetails" :lastDetail="lastDetail" />
        </v-col>
      </v-row>

      <!-- Graficos de Flujo y Densidad -->
      <v-row>
        <v-col cols="6" lg="6" md="12" sm="12" xs="12">
          <FlowRateGraph :allOrderDetails="allOrderDetails" :lastDetail="lastDetail" />
        </v-col>

        <v-col cols="6" lg="6" md="12" sm="12" xs="12">
          <DensityGraph :allOrderDetails="allOrderDetails" :lastDetail="lastDetail" />
        </v-col>
      </v-row>
    </v-container>
  </OperatorLayout>
</template>

<style lang="scss" src="/src/styles/global.scss"></style>
