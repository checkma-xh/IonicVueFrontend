<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>userInfo</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">userInfo</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <ion-chip>
          <ion-avatar>
            <img
              alt="Silhouette of a person's head"
              :src="avatarPhoto?.webviewPath"
              @click="takePhoto"
            />
          </ion-avatar>
          <ion-label>{{ name }}</ion-label>
        </ion-chip>
        <ion-list>
          <ion-input
            label="name"
            label-placement="floating"
            helper-text="please input name"
            :clear-input="true"
            :counter="true"
            :maxlength="64"
            fill="outline"
            v-model="name"
          >
          </ion-input>

          <ion-input
            label="account"
            :clear-input="true"
            label-placement="floating"
            helper-text="please input account"
            :counter="true"
            :maxlength="64"
            fill="outline"
          >
          </ion-input>

          <ion-input
            label="password"
            :clear-input="true"
            label-placement="floating"
            helper-text="please input password"
            type="password"
            :counter="true"
            :maxlength="64"
            fill="outline"
          >
          </ion-input>

          <ion-input
            label="confirm password"
            :clear-input="true"
            label-placement="floating"
            helper-text="confirm password"
            type="password"
            :counter="true"
            :maxlength="64"
            fill="outline"
          >
          </ion-input>

          <ion-textarea
            label="remark"
            label-placement="floating"
            helper-text="please input remark"
            :counter="true"
            :maxlength="64"
            fill="outline"
          >
          </ion-textarea>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonList,
  IonTextarea,
  IonChip,
  IonAvatar,
} from "@ionic/vue";
import { ref } from "vue";
import { takePhoto, avatarPhoto } from "../utils/usePhotoGallery";
const name = ref();
</script>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1%;
}
#container ion-input,
ion-textarea {
  margin-top: 6%;
}
</style>
