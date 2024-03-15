<template>
	<ion-header>
		<ion-toolbar>


			<!-- search bar -->
			<ion-searchbar
				ref="searchBarRef"
				placeholder="Search"
				expand="block"
				:debounce="100"
				show-clear-button="never"
				label-placement="floating"
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
						{{value.datetime}}
					</ion-note>
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


		<!-- search result -->
		<PlanList
			v-show="searching"
			:plans="results">
		</PlanList>


		<!-- modal -->
		<ion-modal ref="detailModal">

			<!-- modal header -->
			<ion-header>
				<ion-toolbar>
					<ion-title :color="detail.iconColor">
						{{ detail.title }}
					</ion-title>
					<ion-buttons slot="end">
						<ion-button
							:color="detail.iconColor"
							@click="detail.handleClick">
							confirm
						</ion-button>
					</ion-buttons>
				</ion-toolbar>
			</ion-header>

			<!-- modal content -->
			<ion-content>
				<detail-card
					:handleClick="detail.handleClick"
					:icon="detail.icon"
					:iconColor="detail.iconColor"
					:cardColor="detail.cardColor"
					:title="detail.title"
					:subtitle="detail.subtitle"
					:content="detail.content"
					class="detail-card-class">
				</detail-card>
			</ion-content>
		</ion-modal>
	</ion-content>


	<!-- clear button -->
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
	IonModal,
	IonTitle,
	IonFooter,
} from "@ionic/vue";
import { closeOutline, search } from "ionicons/icons";
import { computed, onMounted, reactive, ref } from "vue";
import PlanList from "./PlanList.vue";
import { getPlans } from "@/api/planManagement/getPlans";
import { useUserStore } from "@/store/userStore";
import { setPlanAttribute } from "@/utils/usePlanManagementTool";
import DetailCard from "./DetailCard.vue";
import { deletePlan } from "@/api/planManagement/deletePlan";
import { formatDateWithoutTime } from "@/utils/useDateTool";
import { completePlan } from "@/api/planManagement/completePlan";


const userStore = useUserStore();
const searchBarRef = ref();
const searchContent = ref();
const results = ref();
const searching = ref();
const detailModal = ref();
const detail = reactive({
	handleClick: closeDetailModal,
	icon: "",
	iconColor: "light",
	cardColor: "light",
	title: "light",
	subtitle: "",
	content: "",
});

function openDetailModal() {
	detailModal.value.$el.isOpen = true;
	detailModal.value.$el.canDismiss = false;
}

function closeDetailModal() {
	detailModal.value.$el.canDismiss = true;
	detailModal.value.$el.isOpen = false;
}

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
	searching.value = true;

	const resultIndex = results.value.findIndex((item: SearchHistory) => {
		return item.content === searchContent.value;
	});

	if (resultIndex > -1) {
		await sortSearchHistory(resultIndex);
	} else {
		const content = { datetime: new Date(), content: searchContent.value };
		await unshiftSearchHistory(content);
	}

	results.value = await getPlans({
		accessToken: userStore.accessToken,
		id: userStore.id,
		name: searchContent.value,
		// remark: searchContent.value,
	});
	alert(JSON.stringify(results.value));
	const promises = results.value.map((plan: any) => {
		// click
		const planHandleClick = () => {
			detail.cardColor = "light";
			detail.icon = plan.icon;
			detail.iconColor = plan.color;
			detail.handleClick = closeDetailModal;
			detail.title = plan.name;
			detail.content = plan.remark;
			detail.subtitle =
				`${formatDateWithoutTime(new Date(plan.startDate)) + " ~ " + formatDateWithoutTime(new Date(plan.endDate))}. ` +
				`completed: ${plan.completed}. ` +
				`group: ${plan.group.name}. ` +
				`priority: ${plan.priority.name}. ` +
				`repeat: ${plan.repeat.name}. `;
			openDetailModal();
		};

		// delete
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
			// ...
		};

		// complete
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
		};

		// detail
		const planHandleDetail = computed(() => {
			return planHandleClick;
		});

		// setPlanAttribute({
		// 	plan: plan,
		// 	handleClick: planHandleClick,
		// 	handleComplete: planHandleComplete,
		// 	handleDelete: planHandleDelete,
		// 	handleDetail: planHandleDetail,
		// });
		setPlanAttribute({
			plan: plan,
			handleClick: null,
			handleComplete: null,
			handleDelete: null,
			handleDetail: null,
		});
	});
	await Promise.all(promises);
}

// 清除事件
async function handleClear() {
	const result = await clearSearchHistory();
	if (!result) {
		return await showToast("clear failed", 2000, "bottom");
	}
	results.value = [];
}

// 删除事件
async function handleDelete(targetIndex: number) {
	const result = await deleteSearchHistory(targetIndex);
	if (!result) {
		return await showToast("delete failed", 2000, "bottom");
	}
	results.value.splice(targetIndex, 1);
}

onMounted(async () => {
	const readResult = await getSearchHistory();
	results.value = readResult ? readResult : [];
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
