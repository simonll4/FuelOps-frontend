<script setup lang="ts">
import AdminLayout from "../layouts/AdminLayout.vue";
import OrderTable from "../components/order/OrderTable.vue";
import TempAlert from "../../common/components/TemperatureAlert.vue";
import OrderFilterButtons from "../components/order/OrderFilterButtons.vue";

import { useOrders } from "@/composables/use.orders";
import { useRouter } from 'vue-router';

const {
  orders,
  totalElements,
  currentPage,
  pageSize,
  totalPages,
  isLoading,
  filter,
  setPage,
  setFilter,
} = useOrders();

const handlePageChange = (page: number) => {
  setPage(page - 1);
};

const router = useRouter();

const goBack = () => {
  router.back();
};

</script>

<template>
  <AdminLayout>
    <v-container class="d-flex align-center pa-0">
      <!-- Botón para volver atrás -->
      <v-btn icon @click="goBack" class="mr-2" color="transparent" flat>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <h6>Admin / Órdenes</h6>
    </v-container>

    <!-- Título de la vista -->
    <h1 class="ma-5">Órdenes</h1>

    <!-- Botones de filtro -->
    <v-container>
      <OrderFilterButtons :filter="filter" :setFilter="setFilter" />
    </v-container>

    <v-container>
      <OrderTable
        class="tabla"
        :items="orders"
        :totalElements="totalElements"
        :current-page="currentPage"
        :page-size="pageSize"
        :total-pages="totalPages"
        :isLoading="isLoading"
        @update:page="handlePageChange"
      />
    </v-container>
  </AdminLayout>
</template>
