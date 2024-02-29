<template>
  <div class="ion-activatable" @click="handleClick()">
    <ion-card :color="color">
      <ion-icon
        alt="Silhouette of mountains"
        :icon="icon"
        class="large-icon"
      ></ion-icon>
      <ion-card-header>
        <ion-card-title>{{ title }}</ion-card-title>
        <ion-card-subtitle>{{ subtitle }}</ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>{{ content }}</ion-card-content>
      <ion-ripple-effect></ion-ripple-effect>
    </ion-card>
  </div>
</template>

<script setup lang="ts">
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/vue";

const handleClick = defineModel("handleClick", {
  type: Function,
  required: true,
});
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

<style scoped>
.large-icon {
  font-size: 200%;
  margin-top: 5%;
}
</style>
