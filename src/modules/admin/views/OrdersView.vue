<script setup lang="ts">
import AdminLayout from "../layouts/AdminLayout.vue";
import OrderTable from "../components/order/OrderTable.vue";
</script>

<template>
  <AdminLayout>
    <h6 class="ma-5 pages-title">Admin / Órdenes</h6>
    <h1 class="ma-5">Órdenes</h1>
    <OrderTable class="tabla" />
  </AdminLayout>
</template>

<style scoped>
.tabla {
  margin: 0 auto;
  width: 97%;
  border-radius: 1rem;
  background-color: #111c44;
  color: #fff;
}
</style>
