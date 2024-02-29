<template>
  <ion-searchbar
    ref="searchBarRef"
    placeholder="Search"
    expand="block"
    :debounce="10"
    show-clear-button="never"
    label-placement="floating"
    v-model.lazy="searchContent"
    @ionInput="handleInput"
    @ionBlur="handleBlur"
    @keydown.enter="handleSearch"
  >
  </ion-searchbar>

  <ion-list>
    <ion-item
      v-for="(value, index) in results"
      button
      :key="index"
      @click="
        async () => {
          searchContent = value.content;
          await handleSearch();
        }
      "
    >
      <ion-label class="ion-text-nowrap">
        <h3>{{ value.content }}</h3>
        <p>{{ value.datetime }}</p>
      </ion-label>
      <ion-button
        fill="clear"
        @click.stop="
          async () => {
            await handleDelete(index);
          }
        "
      >
        <ion-icon :icon="closeOutline"></ion-icon>
      </ion-button>
    </ion-item>

    <ion-button class="centered-button" @click="handleClear">
      clear
    </ion-button>
  </ion-list>
  <ion-infinite-scroll>
    <ion-infinite-scroll-content></ion-infinite-scroll-content>
  </ion-infinite-scroll>
</template>

<script setup lang="ts">
import {
  searchHistory,
  getSearchHistory,
  sortSearchHistory,
  unshiftSearchHistory,
  clearSearchHistory,
  deleteSearchHistory,
} from "@/utils/useSearchHistory";
import {
  IonSearchbar,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import { closeOutline } from "ionicons/icons";
import { onMounted, ref, Ref } from "vue";

const searchBarRef = ref();
const searchContent = ref();
const results: Ref<searchHistory[]> = ref<searchHistory[]>([]);

// 设置聚焦
let setFocus = setTimeout(function func() {
  searchBarRef.value.$el.setFocus();
  setFocus = setTimeout(func, 1000);
}, 100);

async function handleBlur() {
  clearTimeout(setFocus);
}

// 输入事件
async function handleInput() {
  if (searchContent.value == "") {
    results.value = await getSearchHistory();
    return;
  }
  const data = await getSearchHistory();
  if (searchContent.value != "") {
    results.value = data.filter(
      (value) => value.content.toLowerCase().indexOf(searchContent.value) > -1
    );
  }
}

// 搜索事件
async function handleSearch() {
  if (searchContent.value == "") {
    return;
  }
  results.value = await getSearchHistory();
  const resultIndex = results.value.findIndex((item) => {
    return item.content == searchContent.value;
  });
  if (resultIndex > -1) {
    await sortSearchHistory(resultIndex);
  } else {
    const content = { datetime: new Date(), content: searchContent.value };
    await unshiftSearchHistory(content);
  }
  await handleInput();
}

// 清除事件
async function handleClear() {
  await clearSearchHistory();
  results.value = [];
}

// 删除事件
async function handleDelete(targetIndex: number) {
  await deleteSearchHistory(targetIndex);
  await handleInput();
}

onMounted(async () => {
  results.value = await getSearchHistory();
});
</script>

<style scoped>
.centered-button {
  display: block;
}
</style>
