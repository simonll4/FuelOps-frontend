<script setup lang="ts">
import OperatorLayout from "../layouts/OperatorLayout.vue";
import OrderTable from "../components/order/OrderTable.vue";
import OrderFilterButtons from "../components/order/OrderFilterButtons.vue"

import { useOrders } from "@/composables/use.orders";

const { orders, totalElements, currentPage, pageSize, totalPages, isLoading, filter, setPage, setFilter } = useOrders();

const handlePageChange = (page: number) => {
  setPage(page - 1);
};


</script>

<template>
  <OperatorLayout>

    <h6 class="ma-5">Operador / Órdenes</h6>
    <h1 class="ma-5">Órdenes</h1>
    <!-- Botones de filtro -->
    <v-container>
      <OrderFilterButtons :filter="filter" :setFilter="setFilter" />
    </v-container>

    <v-container>
      <OrderTable class="tabla" :items="orders" :totalElements="totalElements" :current-page="currentPage"
        :page-size="pageSize" :total-pages="totalPages" :isLoading="isLoading" @update:page="handlePageChange" />
    </v-container>

  
  </OperatorLayout>
</template>
