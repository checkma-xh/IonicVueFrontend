<template>
	<ion-page>
		<ion-header :translucent="true">
			<ion-toolbar>
				<ion-title>{{ moduleName }}</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content
			:fullscreen="true"
			class="ion-padding">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">{{ moduleName }}</ion-title>
				</ion-toolbar>
			</ion-header>

			<div id="container">
				<!-- 输入框 -->
				<ion-input
					placeholder="title"
					ref="titleRef"
					:autofocus="true"
					:counter="true"
					:maxlength="64"></ion-input>
				<ion-textarea
					placeholder="remark"
					:auto-grow="true"
					:counter="true"
					:maxlength="64">
				</ion-textarea>

				<!-- 选择项 -->
				<groups-select :groupsValue="groupsValue"></groups-select>
				<priority-select
					:priorityValue="priorityValue"></priority-select>
				<repeat-select :repeatValue="repeatValue"></repeat-select>

				<!-- 日期 -->
				<ion-accordion-group
					><ion-accordion>
						<ion-item
							slot="header"
							color="light">
							<ion-label
								><ion-label>start date</ion-label>
								{{ startDate }}
							</ion-label>
							<ion-label
								><ion-label>end date</ion-label>
								{{ endDate }}
							</ion-label>
						</ion-item>

						<div
							class="ion-padding"
							slot="content"
							id="date">
							<ion-datetime
								presentation="date"
								:multiple="true"
								@ionChange="handleDateChange"
								:highlighted-dates="highlightedDates"
								ref="datetime">
							</ion-datetime>
						</div> </ion-accordion
				></ion-accordion-group>

				<!-- 按钮 -->
				<!-- 新建分组 -->
				<ion-button
					@click="openModal"
					color="light"
					>add groups</ion-button
				>
				<ion-button>cancel</ion-button>
				<ion-button>confirm</ion-button>
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
	IonInput,
	IonToolbar,
	IonItem,
	IonLabel,
	IonTextarea,
	IonDatetime,
	IonAccordion,
	IonAccordionGroup,
	modalController,
} from "@ionic/vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import GroupsSelect from "@/components/GroupsSelect.vue";
import PrioritySelect from "@/components/PrioritySelect.vue";
import RepeatSelect from "@/components/RepeatSelect.vue";
import GroupCreationModal from "@/components/GroupCreationModal.vue";

const route = useRoute();
const moduleName = ref();
const titleRef = ref();
const startDate = ref();
const endDate = ref();
const datetime = ref();
const groupsValue = ref();
const repeatValue = ref();
const priorityValue = ref();
const highlightedDates = ref([
	{
		date: "2024-03-04",
		textColor: "#800080",
		backgroundColor: "#ffc0cb",
	},
]);

async function handleDateChange() {
	let dates = [];
	let sortedDates;
	if (datetime.value.$el.value) {
		datetime.value.$el.value = datetime.value.$el.value.slice(-2);
		dates = datetime.value.$el.value;
	}

	switch (dates.length) {
		case 0:
			startDate.value = null;
			endDate.value = null;
			break;
		case 1:
			startDate.value = dates[0];
			endDate.value = dates[0];
			break;
		case 2:
			sortedDates = dates
				.map((dateString: string) => new Date(dateString))
				.sort((a: any, b: any) => a - b);

			startDate.value = sortedDates[0].toISOString().substring(0, 10);
			endDate.value = sortedDates[1].toISOString().substring(0, 10);
			break;
		default:
			break;
	}
}

async function openModal() {
	const modal = await modalController.create({
		component: GroupCreationModal,
	});
	modal.present();
}

async function setModuleValue() {
	switch (route.name) {
		case "Create":
			moduleName.value = "Create";
			break;
		case "Set":
			moduleName.value = "Set";
			break;
		default:
			break;
	}
}

onMounted(async () => {
	setModuleValue();
});
</script>

<style scoped>
#container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-right: 1%;
}

#container ion-item,
#container ion-button,
#container ion-input,
#container ion-textarea,
#container ion-select {
	margin-top: 1%;
	margin-left: 1%;
	width: 99%;
}

#container ion-select {
	margin-top: 2%;
}

#date {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

ion-datetime {
	margin-top: 2%;
	width: 100%;
}

ion-accordion-group {
	margin: 1% auto;
	width: 99%;
}

ion-accordion {
	margin: 0 auto;
}

ion-accordion ion-item[slot="header"] {
	--background: var(--ion-color-light);
	--color: var(--ion-color-light-contrast);
}

ion-accordion.accordion-expanding ion-item[slot="header"],
ion-accordion.accordion-expanded ion-item[slot="header"] {
	--background: var(--ion-color-primary);
	--color: var(--ion-color-primary-contrast);
}

ion-accordion.accordion-collapsing ion-item[slot="header"],
ion-accordion.accordion-collapsed ion-item[slot="header"] {
	--background: var(--ion-color-light);
	--color: var(--ion-color-light-contrast);
}
</style>
