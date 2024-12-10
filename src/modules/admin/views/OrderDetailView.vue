<script lang="ts" setup="">
import { onMounted, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";

import { useWsNewAlarmsByOrden } from "@/composables/use.ws.new.alarms";
import { useWsAlarmsReminders } from "@/composables/use.ws.reminders.alarms";
import { useOrderDetails } from '@/composables/use.order.details';

import AdminLayout from "../layouts/AdminLayout.vue";
import OrderDetailTable from "../components/order/OrderDetailTable.vue";
import ETA from "../components/graphs/ETAGraph.vue";
import OrderData from "../components/order/OrderData.vue";
import AlarmTable from "../components/alarms/AlarmTable.vue";
import RadialBar from "../components/graphs/RadialBarGraph.vue";
import TemperatureChart from "../components/graphs/TemperatureGraph.vue";
import FlowRateGraph from "../components/graphs/FlowRateGraph.vue";
import DensityGraph from "../components/graphs/DensityGraph.vue";
import { useWsOrderDetail } from "@/composables/use.ws.order.details";


// TODO: Cambiar por el id de la orden (getOrdenById)
const orderNumber = ref(2);

const { orderDetails, totalElements, isLoading, setPage } = useOrderDetails(orderNumber.value);

const handlePageChange = (page: number) => {
  setPage(page - 1);
};

const router = useRouter();
function goBack() {
  router.push("/admin/orders");
}

//TODO: mover a componente global de reminders
//const { remindersAlarms } = useWsAlarmsReminders();

//const { alarmForOrder } = useWsNewAlarmsByOrden(orderNumber.value);
//const { detail } = useWsOrderDetail(orderNumber.value);

//prueba para ver llegada de alarma
watchEffect(() => {
  // console.log("reminders: ", remindersAlarms.value);
  // console.log("alarmas por orden: ", alarmForOrder.value);
  // console.log("detalle de orden: ", detail.value);
  console.log("orderDetails: ", orderDetails.value);
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

      <!-- Datos de la orden -->
      <OrderData />

      <v-row class="align-center d-flex">
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
          <!-- <OrderDetailTable class="tabla" /> -->
        </v-col>

        <v-col cols="6">
          <TemperatureChart />
        </v-col>

      </v-row>

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