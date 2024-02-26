<!-- <template>
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
</script> -->

<template>
  <ion-searchbar
    show-clear-button="always"
    placeholder="Search"
    :debounce="100"
    @ionFocus="handleFocus"
    expand="block"
  ></ion-searchbar>

  <ion-list>
    <ion-item v-for="(value, index) in results" :key="index">
      <ion-label>{{ value }}</ion-label>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { modalController } from "@ionic/vue";
import SearchModal from "./SearchModal.vue";

const results: Ref<string[]> = ref<string[]>([]);
const openModal = async () => {
  const modal = await modalController.create({
    component: SearchModal,
  });
  modal.present();
};
const handleFocus = () => {
  openModal();
};
</script>
