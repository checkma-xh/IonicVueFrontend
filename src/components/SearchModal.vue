<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="medium" @click="cancel">Cancel</ion-button>
      </ion-buttons>
      <ion-buttons slot="end">
        <ion-button @click="confirm" :strong="true">Confirm</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-toolbar>
    <search-bar></search-bar>
  </ion-toolbar>
  <ion-content class="ion-padding"></ion-content>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  modalController,
} from "@ionic/vue";
import SearchBar from "./SearchBar.vue";

const cancel = () => modalController.dismiss(null, "cancel");
const confirm = () => modalController.dismiss(null, "confirm");
</script>
