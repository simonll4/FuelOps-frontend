<script setup lang="ts">
import AdminLayout from "../layouts/AdminLayout.vue";
import OrderTable from "../components/order/OrderTable.vue";
import TempAlert from "../../common/components/TemperatureAlert.vue";
import OrderFilterButtons from "../components/order/OrderFilterButtons.vue"

import { useOrders } from "@/composables/use.orders";

const { orders, totalElements, currentPage, pageSize, totalPages, isLoading, filter, setPage, setFilter } = useOrders();

const handlePageChange = (page: number) => {
  console.log("page ", page);
  setPage(page - 1);
};


</script>

<template>
  <AdminLayout>

    <h6 class="ma-5">Admin / Órdenes</h6>
    <h1 class="ma-5">Órdenes</h1>
    <!-- Botones de filtro -->
    <v-container>
      <OrderFilterButtons :filter="filter" :setFilter="setFilter" />
    </v-container>

    <v-container>
      <OrderTable class="tabla" :items="orders" :totalElements="totalElements" :current-page="currentPage"
        :page-size="pageSize" :total-pages="totalPages" :isLoading="isLoading" @update:page="handlePageChange" />
    </v-container>

  
  </AdminLayout>
</template>
