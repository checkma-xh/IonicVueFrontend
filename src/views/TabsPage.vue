<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/home">
          <ion-icon aria-hidden="true" :icon="starOutline"></ion-icon>
          <ion-label>home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="auth" href="/auth">
          <ion-icon aria-hidden="true" :icon="personOutline"></ion-icon>
          <ion-label>auth</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="userInfo" href="/user-info">
          <ion-icon aria-hidden="true" :icon="cloudyOutline"></ion-icon>
          <ion-label>userInfo</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
} from "@ionic/vue";
import { starOutline, personOutline, cloudyOutline } from "ionicons/icons";
</script>
