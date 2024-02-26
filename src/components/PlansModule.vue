<template>
  <functional-module
    v-model:icon="style.icon"
    v-model:color="style.color"
    v-model:title="style.title"
    v-model:subtitle="style.subtitle"
    v-model:content="style.content"
  ></functional-module>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import FunctionalModule from "./FunctionalModule.vue";
import { addCircleOutline } from "ionicons/icons";

const style = reactive({
  icon: addCircleOutline,
  color: "danger",
  title: "plans",
  subtitle: "9/10",
  content: "good luck",
});
</script>
