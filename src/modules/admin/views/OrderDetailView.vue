<script lang="ts" setup="">
import { ref, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useOrderDetails } from '@/composables/use.order.details';
import { useWsOrderDetail } from "@/composables/ws/use.ws.order.details";

import AdminLayout from "../layouts/AdminLayout.vue";
import OrderDetailTable from "../components/order/OrderDetailTable.vue";
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

const route = useRoute();

// DATOS DE LA ORDEN
const orderNumber = ref(Number(route.params.id));
const { order } = useOrder(orderNumber.value);

// TABLA DE DETALLES
const { orderDetails, currentPageD, currentPageD1, totalPagesD, pageSizeD, totalElementsD, isLoadingD, setPageD, refetchD } = useOrderDetails(orderNumber.value);
const { detail } = useWsOrderDetail(orderNumber.value); // se suscribe al websocket para recibir los detalles en tiempo real

watch(detail, () => {
  if (currentPageD1.value != 0) {
    refetchD();
  }
});

// TABLA DE ALARMAS
const { alarms, currentPageA, totalPagesA, totalElementsA, pageSizeA, isLoadingA, setPageA, refetchA } = useAlarms(orderNumber.value);
const { alarm } = useWsAlarms(orderNumber.value);

watch(alarm, () => {
  refetchA();
});

const { updateAlarmStatus, isUpdating, isError } = useAlarmHandler();

// GRAFICOS
const { allOrderDetails, isLoadingAD, error } = useAllOrderDetails(orderNumber.value); // Todos los detalles de la orden, para dibujar los graficos
const { lastDetail } = useWsLatestOrderDetails(orderNumber.value); // Ultimo detalle de la orden, para actualizar los graficos en tiempo real

// ROUTER
const router = useRouter();
function goBack() {
  router.push("/admin/orders");
};

</script>
<template>
  <AdminLayout>
    <v-container>
      <h6 class="pages-title">Admin / Detalle de Orden</h6>
      <h1>Detalle de Orden </h1>
    </v-container>

    <v-container>

      <v-row align="center" class="mb-2" justify="space-between">
        <v-col>
          <h1 class="text-h4">Orden N° #{{ orderNumber }}</h1>
        </v-col>

        <!-- TODO: Mover el boton de lado y convertir en arrow -->
        <v-col class="text-right">
          <v-btn @click="goBack" class="btn-color-4">Back</v-btn>
        </v-col>
      </v-row>

      <!-- Datos de la orden y Notificacion de Alarmas -->
      <v-row>

        <!-- TODO: Hacer que estos dos coincidan en height -->
        <v-col cols="6">
          <OrderData v-if="order" :order="order" />
        </v-col>

        <v-col cols="6">
          <AlarmHandler :alarm="alarm" :updateAlarmStatus="updateAlarmStatus" :isUpdating="isUpdating"
            :isError="isError" :isLoading="isLoadingA" />
        </v-col>
      </v-row>

      <v-row class="align-center d-flex">

        <!-- Grafico circular y ETA -->
        <v-col cols="6">
          <v-row>
            <!-- Circular graph -->
            <v-col cols="7">
              <!-- <RadialBar /> -->
              <RadialBar v-if="order" :order="order" :last-detail="lastDetail" />
            </v-col>
            <!-- ETA -->
            <ETA v-if="order" :order="order" :last-detail="lastDetail" />
            <v-col cols="5">
              <!-- <ETA /> -->
            </v-col>
          </v-row>
        </v-col>

        <!-- Tabla de alarmas -->
        <v-col cols="6">
          <AlarmTable :items="alarms" :totalElements="totalElementsA" :current-page="currentPageA"
            :page-size="pageSizeA" :total-pages="totalPagesA" :isLoading="isLoadingA" :set-page-a="setPageA"
            class="tabla" />
        </v-col>

      </v-row>

      <v-row>
        <!-- Tabla de detalles -->
        <v-col cols="6">
          <OrderDetailTable :items="orderDetails" :totalElements="totalElementsD" :current-page="currentPageD"
            :page-size="pageSizeD" :total-pages="totalPagesD" :isLoading="isLoadingD" :set-page-d="setPageD"
            class="tabla" />
        </v-col>

        <!-- Graficos de Temperatura -->
        <v-col cols="6">
          <TemperatureChart :allOrderDetails="allOrderDetails" :lastDetail="lastDetail" />
        </v-col>
      </v-row>

      <!-- Graficos de Flujo y Densidad -->
      <v-row>

        <v-col cols="6">
          <!-- TODO: Cambiar color -->
          <FlowRateGraph :allOrderDetails="allOrderDetails" :lastDetail="lastDetail" />
        </v-col>

        <v-col cols="6">
          <DensityGraph :allOrderDetails="allOrderDetails" :lastDetail="lastDetail" />
        </v-col>

      </v-row>

    </v-container>

  </AdminLayout>
</template>

<style lang="scss" src="/src/styles/global.scss"></style>