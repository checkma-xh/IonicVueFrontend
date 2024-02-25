<template>
  <ion-searchbar
    show-clear-button="always"
    placeholder="Search"
    :debounce="100"
    @ionInput="handleInput"
    @ionClear="handleClear"
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
const handleClear = () => {};
</script>
