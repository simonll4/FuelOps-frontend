<script setup lang="ts">
import AdminLayout from "../layouts/AdminLayout.vue";
import OrderTable from "../components/order/OrderTable.vue";
import TempAlert from "../../common/components/TemperatureAlert.vue";
</script>

<template>
  <AdminLayout>
    <h6 class="ma-5">Admin / Órdenes</h6>
    <h1 class="ma-5">Órdenes</h1>
    <!-- TODO conectar  -->
    <OrderTable />
    <TempAlert />
  </AdminLayout>
</template>
