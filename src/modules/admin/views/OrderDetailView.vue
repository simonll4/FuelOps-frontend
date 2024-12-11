<script lang="ts" setup="">
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";

import { useOrderDetails } from '@/composables/use.order.details';
import { useWsOrderDetail } from "@/composables/ws/use.ws.order.details";

import AdminLayout from "../layouts/AdminLayout.vue";
import OrderDetailTable from "../components/order/OrderDetailTable.vue";
import ETA from "../components/graphs/ETAGraph.vue";
import OrderData from "../components/order/OrderData.vue";
import AlarmTable from "../components/alarms/AlarmTable.vue";
import AcceptAlarm from "../components/alarms/AcceptAlarmCard.vue";

import RadialBar from "../components/graphs/RadialBarGraph.vue";
import TemperatureChart from "../components/graphs/TemperatureGraph.vue";
import FlowRateGraph from "../components/graphs/FlowRateGraph.vue";
import DensityGraph from "../components/graphs/DensityGraph.vue";
import { useAllOrderDetails } from "@/composables/use.all.order.details";
import { useWsLatestOrderDetails } from "@/composables/ws/use.ws.latest.order.details";

// DATOS DE LA ORDEN
// TODO: Cambiar por el id de la orden (getOrdenById)
const orderNumber = ref(2);

// TABLA DE DETALLES
const { orderDetails, totalElements, isLoading, setPage } = useOrderDetails(orderNumber.value);
const { detail } = useWsOrderDetail(orderNumber.value);

const handlePageChange = (page: number) => {
  setPage(page - 1);
};

// GRAFICOS
// Todos los detalles de la orden, para dibujar los graficos
const { allOrderDetails, isLoadingAD, error } = useAllOrderDetails(orderNumber.value);
// Ultimo detalle de la orden, para dibuar los graficos en tiempo real
const { lastDetail } = useWsLatestOrderDetails(orderNumber.value);

const router = useRouter();
function goBack() {
  router.push("/admin/orders");
}

//TODO: mover a componente global de reminders
//const { remindersAlarms } = useWsAlarmsReminders();

// TODO para cuando este la tabla de alarmas por orden
//const { alarmForOrder } = useWsNewAlarmsByOrden(orderNumber.value);s

//prueba para ver llegada de alarma
watchEffect(() => {
  // console.log("reminders: ", remindersAlarms.value);
  // console.log("alarmas por orden: ", alarmForOrder.value);
  //console.log("detalle de orden ws: ", detail.value);
  //console.log("orderDetails: ", orderDetails.value);
  //console.log("aca allOrderDetails: ", allOrderDetails.value);
  //console.log("aca lastDetail: ", lastDetail.value);
});

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
          <OrderData />
        </v-col>
        <v-col cols="6">
          <AcceptAlarm />
        </v-col>
      </v-row>

      <v-row class="align-center d-flex">

        <!-- Grafico circular y ETA -->
        <v-col cols="6">
          <v-row>
            <!-- Circular graph -->
            <v-col cols="7">
              <RadialBar />
            </v-col>
            <!-- ETA -->
            <v-col cols="5">
              <ETA />
            </v-col>
          </v-row>
        </v-col>

        <!-- Tabla de alarmas -->
        <v-col cols="6">
          <AlarmTable class="tabla" />
        </v-col>

      </v-row>

      <h2>Detalles de carga</h2>

      <v-row>

        <!-- Tabla de detalles -->
        <v-col cols="6">
          <OrderDetailTable :items="orderDetails" :totalElements="totalElements" :isLoading="isLoading"
            @update:page="handlePageChange" class="tabla" />
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
          <FlowRateGraph />
        </v-col>

        <v-col cols="6">
          <DensityGraph />
        </v-col>

      </v-row>

    </v-container>

  </AdminLayout>
</template>

<style lang="scss" src="/src/styles/global.scss"></style>