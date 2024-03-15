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
					v-model="title"
					:autofocus="true"
					:counter="true"
					:maxlength="64"></ion-input>
				<ion-textarea
					placeholder="remark"
					v-model="remark"
					:auto-grow="true"
					:counter="true"
					:maxlength="64">
				</ion-textarea>

				<!-- 选择项 -->
				<priority-select
					v-model:priorityValue="priority"></priority-select>
				<group-select v-model:groupValue="group"></group-select>

				<!-- 新建分组 -->
				<ion-button
					id="open-group-creation-modal"
					color="light"
					><strong>add groups</strong></ion-button
				>
				<ion-modal trigger="open-group-creation-modal">
					<GroupCreationModule></GroupCreationModule>
				</ion-modal>

				<!-- 日期 -->
				<ion-button
					color="light"
					id="open-calendar-modal"
					><ion-grid>
						<ion-row
							><ion-col size="4"
								><strong>start date-</strong
								><ion-label>{{ startDate }}</ion-label></ion-col
							>
							<ion-col size="4"
								><strong>end date-</strong
								><ion-label>{{ endDate }}</ion-label></ion-col
							>
							<ion-col size="4"
								><strong>repeat-</strong
								><ion-label>{{ repeat }}</ion-label></ion-col
							>
						</ion-row>
					</ion-grid></ion-button
				>
				<ion-modal trigger="open-calendar-modal">
					<CalendarModule
						v-model:startDate="startDate"
						v-model:endDate="endDate"
						v-model:repeatValue="repeat">
					</CalendarModule>
				</ion-modal>

				<!-- 按钮 -->
				<ion-button>cancel</ion-button>
				<ion-button @click="handleCreatePlan">confirm</ion-button>
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
	IonTextarea,
	IonButton,
	IonModal,
	IonLabel,
	IonGrid,
	IonRow,
	IonCol,
} from "@ionic/vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import GroupSelect from "@/components/GroupSelect.vue";
import PrioritySelect from "@/components/PrioritySelect.vue";
import GroupCreationModule from "@/components/GroupCreationModule.vue";
import CalendarModule from "@/components/CalendarModule.vue";
import { matchModuleNameByRouteName } from "@/utils/useRouteTool";
import { showToast } from "@/utils/useToastTool";
import { createPlan } from "@/api/planManagement/createPlan";
import { useUserStore } from "@/store/userStore";


const route       = useRoute();
const userStore   = useUserStore();
const moduleName  = ref();
const title       = ref();
const remark      = ref();
const group       = ref();
const priority    = ref();
const startDate   = ref();
const endDate     = ref();
const repeat      = ref();

async function handleCreatePlan() {
	if (!title.value) {
		return await showToast("title empty", 2000, "bottom");
	}
	if (!remark.value) {
		remark.value = "";
	}
	if (!group.value) {
		group.value = "default";
	}
	if (!priority.value) {
		priority.value = "high";
	}
	if (!repeat.value) {
		repeat.value = "everyday";
	}
	if (!startDate.value && !endDate.value) {
		const today = new Date();
		const todayString = today.toISOString();
		startDate.value = todayString;
		endDate.value = todayString;
	}
	const response = await createPlan(
		userStore.accessToken,
		userStore.id,
		title.value,
		remark.value,
		startDate.value,
		endDate.value,
		group.value,
		priority.value,
		repeat.value
	);
	await showToast(response.data.message, 2000, "bottom");
	if (response.status < 200 || response.status > 299) {
		return;
	}

	router.push({ name: "PlanManagement" });
}

onMounted(() => {
	moduleName.value = matchModuleNameByRouteName(route.name as string);
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

.ripple-parent {
	position: relative;
	margin-top: 2%;
	margin-left: 2%;
	height: 90px;
	width: 100%;
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

ion-col {
	align-items: center;
	text-align: center;
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
@/utils/useRouteTool