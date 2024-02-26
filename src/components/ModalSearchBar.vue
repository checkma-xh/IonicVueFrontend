<template>
  <ion-searchbar
    ref="searchBarRef"
    @ionInput="handleInput"
    :debounce="100"
    show-clear-button="always"
    placeholder="Search"
    expand="block"
    label-placement="floating"
    @ionBlur="handleBlur"
  ></ion-searchbar>

  <ion-list>
    <ion-item v-for="(value, index) in results" :key="index">
      <ion-label>{{ value }}</ion-label>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
import { IonSearchbar } from "@ionic/vue";
import { ref, Ref } from "vue";

const searchBarRef = ref();
const data = ["apple", "banana", "peach"];
const results: Ref<string[]> = ref<string[]>([]);
const handleInput = (event: any) => {
  const query = (event.target as HTMLInputElement).value.toLowerCase();
  if (query == "" || query == null || query == undefined) {
    results.value = [];
  } else {
    results.value = data.filter(
      (value) => value.toLowerCase().indexOf(query) > -1
    );
  }
};

// 设置聚焦
let setFocus = setTimeout(function fun() {
  searchBarRef.value.$el.setFocus();
  setFocus = setTimeout(fun, 1000);
}, 100);
const handleBlur = () => {
  clearTimeout(setFocus);
};
</script>
