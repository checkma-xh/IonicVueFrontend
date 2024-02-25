<template>
  <ion-button @click="openModal" expand="block">
    Search
    <ion-icon :icon="searchOutline"></ion-icon>
  </ion-button>
</template>

<script setup lang="ts">
import { IonIcon, IonButton } from "@ionic/vue";
import { modalController } from "@ionic/vue";
import SearchModal from "./SearchModal.vue";
import { searchOutline } from "ionicons/icons";

const openModal = async () => {
  const modal = await modalController.create({
    component: SearchModal,
  });
  modal.present();
};
</script>
