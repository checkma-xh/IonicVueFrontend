<template>
  <ion-button @click="openModal">
    <ion-searchbar
      placeholder="Search"
      expand="block"
      disabled="true"
    ></ion-searchbar>
  </ion-button>
</template>

<script setup lang="ts">
import { modalController } from "@ionic/vue";
import SearchModal from "./SearchModal.vue";

const openModal = async () => {
  const modal = await modalController.create({
    component: SearchModal,
  });
  modal.present();
};
</script>

<style scoped></style>
