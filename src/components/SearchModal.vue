<template>
	<ion-header>
		<ion-toolbar>
			<!-- search bar -->
			<ion-searchbar
				ref="searchBarRef"
				placeholder="Search"
				expand="block"
				show-clear-button="focus"
				label-placement="floating"
				:debounce="100"
				:animated="true"
				v-model.lazy="searchContent"
				@ionInput="handleInput"
				@ionBlur="handleBlur"
				@keydown.enter="handleSearch">
			</ion-searchbar>

			<!-- search button -->
			<ion-buttons slot="end">
				<ion-button
					@click="handleSearch"
					color="light"
					><ion-icon
						:icon="search"
						color="primary"></ion-icon
				></ion-button>
			</ion-buttons>
		</ion-toolbar>
	</ion-header>

	<!-- content -->
	<ion-content
		:fullscreen="true"
		class="ion-padding">
		<!-- search history -->
		<ion-list v-show="!searching">
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
					<h2>{{ value.content }}</h2>
					<ion-note style="font-size: 80%">
						{{ value.datetime }}
					</ion-note>
				</ion-label>
				<ion-button
					fill="clear"
					@click.stop="
						async () => {
							await handleRemove(index);
						}
					">
					<ion-icon :icon="closeOutline"></ion-icon>
				</ion-button>
			</ion-item>
		</ion-list>

		<!-- search result -->
		<PlanList
			v-show="searching"
			:plans="results">
		</PlanList>

		<ion-popover
			:is-open="popoverOpen"
			@didDismiss="popoverOpen = false">
			<ion-content class="ion-padding">{{ planDetail }}</ion-content>
		</ion-popover>
	</ion-content>

	<!-- clear button -->
	<ion-footer>
		<ion-item>
			<ion-button
				:disabled="searching"
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
	deleteSearchHistory,
	removeSearchHistory,
} from "@/utils/useSearchHistory";
import { showToast } from "@/utils/useToastTool";
import {
	IonHeader,
	IonToolbar,
	IonSearchbar,
	IonButtons,
	IonButton,
	IonContent,
	IonList,
	IonItem,
	IonLabel,
	IonNote,
	IonIcon,
	IonPopover,
	IonFooter,
} from "@ionic/vue";
import { closeOutline, search } from "ionicons/icons";
import { computed, onMounted, ref } from "vue";
import PlanList from "./PlanList.vue";
import { getPlans } from "@/api/planManagement/getPlans";
import { useUserStore } from "@/store/userStore";
import { setPlanAttribute, sortPlan } from "@/utils/usePlanManagementTool";
import { deletePlan } from "@/api/planManagement/deletePlan";
import { completePlan } from "@/api/planManagement/completePlan";

const userStore = useUserStore();
const searchBarRef = ref();
const searchContent = ref();
const results = ref();
const searching = ref();
const popoverOpen = ref();
const planDetail = ref();

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
	let readResult = await getSearchHistory();
	readResult = readResult ? readResult : [];
	searching.value = false;
	if (!searchContent.value || searchContent.value === "") {
		results.value = readResult;
		return;
	}

	if (searchContent.value && searchContent.value !== "") {
		results.value = readResult.filter((item: SearchHistory) => {
			return (
				item.content
					.toLowerCase()
					.indexOf(searchContent.value.toLowerCase()) > -1
			);
		});
	}
}

// 搜索事件
async function handleSearch() {
	if (!searchContent.value || searchContent.value === "") {
		return;
	}

	let readResult = await getSearchHistory();
	readResult = readResult ? readResult : [];
	results.value = readResult;

	const resultIndex = results.value.findIndex((item: SearchHistory) => {
		return item.content === searchContent.value;
	});

	if (resultIndex > -1) {
		await sortSearchHistory(resultIndex);
	} else {
		const content = { datetime: new Date(), content: searchContent.value };
		await unshiftSearchHistory(content);
	}

	const response = await getPlans({
		accessToken: userStore.accessToken,
		id: userStore.id,
		deleted: false,
		name: searchContent.value,
	});
	if (response.status < 200 || response.status > 299) {
		await showToast(response.data.message, 2000, "bottom");
	}

	results.value = response.data.plans;
	results.value.forEach((plan: any) => {
		const planHandleClick = () => {
			planDetail.value = plan.remark;
			popoverOpen.value = true;
		};
		const planHandleDelete = async () => {
			const response = await deletePlan(
				userStore.accessToken,
				userStore.id,
				plan.id
			);
			await showToast(response.data.message, 2000, "bottom");
			if (response.status < 200 || response.status > 299) {
				return;
			}
			results.value = results.value.filter((item: any) => {
				return plan.id !== item.id;
			});
		};
		const planHandleComplete = async () => {
			const response = await completePlan(
				userStore.accessToken,
				userStore.id,
				plan.id
			);
			await showToast(response.data.message, 2000, "bottom");
			if (response.status < 200 || response.status > 299) {
				return;
			}
			plan.completed = true;
			results.value.sort(sortPlan);
		};
		const planHandleDetail = computed(() => {
			return planHandleClick;
		});
		setPlanAttribute({
			plan: plan,
			handleClick: planHandleClick,
			handleComplete: planHandleComplete,
			handleDelete: planHandleDelete,
			handleDetail: planHandleDetail,
		});
	});

	results.value.sort(sortPlan);
	searching.value = true;
}

// 清除事件
async function handleClear() {
	const result = await deleteSearchHistory();
	if (!result) {
		return await showToast("clear failed", 2000, "bottom");
	}
	results.value = [];
}

// 删除事件
async function handleRemove(targetIndex: number) {
	const result = await removeSearchHistory(targetIndex);
	if (!result) {
		return await showToast("delete failed", 2000, "bottom");
	}
	results.value.splice(targetIndex, 1);
}

onMounted(async () => {
	const readResult = await getSearchHistory();
	results.value = readResult ? readResult : [];
	popoverOpen.value = false;
	searching.value = false;
});
</script>

<style scoped>
inon-header ion-searchbar {
	margin-right: 0%;
}

.centered-button {
	width: 100%;
	height: 80%;
}
</style>
