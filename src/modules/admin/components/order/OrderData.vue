<script setup lang="ts">
import { ref } from "vue";
const orderNumber = ref("12345");
const status = ref("In Progress");
const truck = ref("ABC-123");
const driver = ref("John Doe");
const client = ref("Acme Corp.");
const product = ref("Liquid Gas");
const preset = ref(5000);
const initialWeight = ref(12000);
const finalWeight = ref(17000);
</script>

<template>
  <v-card class="mb-4 data-container" color="container-color">
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <p><strong>Order Number:</strong> {{ orderNumber }}</p>
          <p><strong>Status:</strong> {{ status }}</p>
          <p><strong>Truck:</strong> {{ truck }}</p>
          <p><strong>Driver:</strong> {{ driver }}</p>
        </v-col>
        <v-col cols="12" md="6">
          <p><strong>Client:</strong> {{ client }}</p>
          <p><strong>Product:</strong> {{ product }}</p>
          <p><strong>Preset:</strong> {{ preset }} kg</p>
          <p><strong>Initial Weight:</strong> {{ initialWeight }} kg</p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
