<template>
  <ion-searchbar
    ref="searchBarRef"
    @ionInput="handleInput"
    :debounce="100"
    show-clear-button="always"
    placeholder="Search"
    expand="block"
    label-placement="floating"
  ></ion-searchbar>
  <ion-button @click="setFocus">Click to set focus</ion-button>
  <ion-list>
    <ion-item v-for="(value, index) in results" :key="index">
      <ion-label>{{ value }}</ion-label>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";

const searchBarRef = ref();
const data = ["apple", "banana", "peach"];
const results: Ref<string[]> = ref<string[]>([]);

const handleInput = (event: InputEvent) => {
  const query = (event.target as HTMLInputElement).value.toLowerCase();
  if (query == "" || query == null || query == undefined) {
    results.value = [];
  } else {
    results.value = data.filter(
      (value) => value.toLowerCase().indexOf(query) > -1
    );
  }
};

function setFocus() {
  searchBarRef.value.$el.setFocus();
}

// onMounted(() => {
//   if (searchBarRef.value) {
//     requestAnimationFrame(() => {
//     query.value = "ok but...";
//     setFocus();
//     query.value = "ok";
//     });
//   } else {
//     query.value = "no";
//   }
// });
</script>
