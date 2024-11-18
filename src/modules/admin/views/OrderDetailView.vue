<script lang="ts" setup="">
import { ref } from "vue";
import { useRouter } from "vue-router";
import AdminLayout from "../layouts/AdminLayout.vue";
import OrderDetailTable from "../components/order/OrderDetailTable.vue";

import ETA from "../components/graphs/ETA.vue";
import OrderData from "../components/order/OrderData.vue";

import radialBar from "../components/graphs/radialBar.vue";
import temperatureChart from "../components/graphs/temperatureChart.vue";

const orderNumber = ref("12345");

const router = useRouter();
function goBack() {
  router.push("/admin/orders");
}
</script>
<template>
  <AdminLayout>
    <v-container>
      <h6 class="pages-title">Admin / Detalle de Orden</h6>
      <h1>Detalle de Orden</h1>
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
      <v-row>
        <v-col cols="6">
          <v-row>
            <!-- Circular graph -->
            <v-col cols="6">
              <radialBar />
            </v-col>
            <v-col cols="6">
              <ETA />
            </v-col>
          </v-row>
        </v-col>
        <!-- Temperatura -->
        <v-col cols="6">
          <temperatureChart />
        </v-col>
      </v-row>
      <h2>Detalles de carga</h2>
      <OrderDetailTable class="tabla" />
    </v-container>
  </AdminLayout>
</template>
<style lang="scss" src="/src/styles/global.scss"></style>
