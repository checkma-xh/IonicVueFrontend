<script setup lang="ts">
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/vue";

const icon = defineModel("icon", {
  required: true,
});
const color = defineModel("color", {
  type: String,
  required: true,
});
const title = defineModel("title", {
  type: String,
  required: true,
});
const subtitle = defineModel("subtitle", {
  type: String,
  required: true,
});
const content = defineModel("content", {
  type: String,
  required: true,
});
</script>

<template>
  <ion-button fill="clear"
    ><ion-card :color="color">
      <ion-card-header>
        <ion-card-title>{{ title }}</ion-card-title>
        <ion-card-subtitle>
          {{ subtitle }}
        </ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>{{ content }}</ion-card-content>
      <!-- <ion-icon :icon="icon"></ion-icon> -->
    </ion-card>
  </ion-button>
</template>

<style scoped>
</style>