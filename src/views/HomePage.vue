<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>plans</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">plans</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <search-bar2></search-bar2>
        <search-bar></search-bar>
        <functional-module
          v-for="(value, index) of functionalModules"
          :key="index"
          v-model:icon="value.icon"
          v-model:color="value.color"
          v-model:title="value.title"
          v-model:subtitle="value.subtitle"
          v-model:content="value.content"
        ></functional-module>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import FunctionalModule from "../components/FunctionalModule.vue";
import { reactive } from "vue";
import { addCircleOutline } from "ionicons/icons";
import SearchBar2 from "../components/SearchBar2.vue";
import SearchBar from "../components/SearchBar.vue";

const functionalModules = reactive({
  completedModule: {
    icon: addCircleOutline,
    color: "success",
    title: "done",
    subtitle: "9/10",
    content: "good luck",
  },
  unfinishedModule: {
    icon: addCircleOutline,
    color: "warning",
    title: "unfinished",
    subtitle: "9/10",
    content: "good luck",
  },
  trashModule: {
    icon: addCircleOutline,
    color: "dark",
    title: "trash",
    subtitle: "9/10",
    content: "good luck",
  },
  groupsModule: {
    icon: addCircleOutline,
    color: "medium",
    title: "groups",
    subtitle: "9/10",
    content: "good luck",
  },
  createModule: {
    icon: addCircleOutline,
    color: "light",
    title: "create",
    subtitle: "9/10",
    content: "good luck",
  },
  plansModule: {
    icon: addCircleOutline,
    color: "danger",
    title: "plans",
    subtitle: "9/10",
    content: "good luck",
  },
});
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
