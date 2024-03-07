<template>
	<ion-header>
		<ion-toolbar>
			<ion-grid>
				<ion-row>
					<ion-col size="10.5">
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
							@keydown.enter="handleSearch">
						</ion-searchbar>
					</ion-col>
					<ion-col size="1.5">
						<ion-button
							@click="handleSearch"
							color="light"
							><ion-icon
								:icon="search"
								color="primary"></ion-icon
						></ion-button>
					</ion-col>
				</ion-row>
			</ion-grid>
		</ion-toolbar>
	</ion-header>
	<ion-content class="ion-padding">
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
				">
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
					">
					<ion-icon :icon="closeOutline"></ion-icon>
				</ion-button>
			</ion-item>
		</ion-list>
	</ion-content>
	<ion-footer>
		<ion-item>
			<ion-button
				class="centered-button"
				@click="handleClear">
				clear
			</ion-button>
		</ion-item>
	</ion-footer>
</template>

<script setup lang="ts">
import {
	SearchHistory,
	getSearchHistory,
	sortSearchHistory,
	unshiftSearchHistory,
	clearSearchHistory,
	deleteSearchHistory,
} from "@/utils/useSearchHistory";
import {
	IonHeader,
	IonToolbar,
	IonGrid,
	IonRow,
	IonCol,
	IonSearchbar,
	IonButton,
	IonContent,
	IonList,
	IonItem,
	IonLabel,
	IonFooter,
} from "@ionic/vue";
import { closeOutline, search } from "ionicons/icons";
import { onMounted, ref, Ref } from "vue";

const searchBarRef = ref();
const searchContent = ref();
const results: Ref<SearchHistory[]> = ref<SearchHistory[]>([]);

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
			(value) =>
				value.content.toLowerCase().indexOf(searchContent.value) > -1
		);
	}
}

// 搜索事件
async function handleSearch() {
	if (
		searchContent.value == "" ||
		searchContent.value == undefined ||
		searchContent.value == null
	) {
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
inon-header ion-searchbar {
	margin-right: 0%;
}

ion-row {
	height: 100%;
	width: 98%;
}

ion-col ion-button {
	height: 100%;
	width: 100%;
	margin: auto;
}

.centered-button {
	width: 100%;
	height: 80%;
}
</style>
