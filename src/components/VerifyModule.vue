<template>
  <ion-list>
    <ion-chip>
      <ion-avatar>
        <img alt="Silhouette of a person's head" :src="avatarUrl" />
      </ion-avatar>
      <ion-label>{{ email }}</ion-label>
    </ion-chip>
    <functional-input inputType="text" v-model="code"></functional-input>
    <ion-button @click="handleVerify()">confirm</ion-button>
  </ion-list>
</template>

<script setup lang="ts">
import { IonButton } from "@ionic/vue";
import FunctionalInput from "@/components/FunctionalInput.vue";

const avatarUrl = defineModel("avatarUrl", {
  type: String,
  required: true,
});
const email = defineModel("email", {
  type: String,
  required: true,
});
const code = defineModel("code", {
  type: String,
  required: true,
});
const handleVerify = defineModel("handleVerify", {
  type: Function,
  required: true,
});
</script>

<style scoped>
ion-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  width: 100%;
}

ion-input {
  margin-top: 1%;
}

ion-button {
  margin-top: 1%;
  display: block;
  width: 100%;
}
</style>
