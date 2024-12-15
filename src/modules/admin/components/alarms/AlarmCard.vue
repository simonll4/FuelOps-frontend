<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  title: string;
  message: string;
  variant: "pending" | "none" | "invalid";
}>();

const cardClass = computed(() => {
  return {
    "alarm-pending": props.variant === "pending",
    "alarm-none": props.variant === "none",
    "alarm-invalid": props.variant === "invalid",
  };
});
</script>

<template>
  <v-card :class="['alarm-card', cardClass]" class="full-card">
    <v-card-item>
      <div class="text-h6 mb-1">
        <strong>{{ title }}</strong>
      </div>
      <div class="text-caption">
        {{ message }} 
      </div>
    </v-card-item>
    <v-card-actions>
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<style lang="scss" src="/src/styles/global.scss"></style>
