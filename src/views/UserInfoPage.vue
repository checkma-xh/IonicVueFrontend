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
        <ion-list>

            <ion-input
              label="name"
              label-placement="floating"
              helper-text="please input name"
              :clear-input="true"
              :counter="true"
              :maxlength="64"
              fill="outline"
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
} from "@ionic/vue";
</script>

<style scoped>
ion-input{
  margin-bottom: 1%;
}
ion-list{
  margin: 1%;
}
</style>