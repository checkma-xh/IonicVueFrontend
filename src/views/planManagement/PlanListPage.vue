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

			<!-- GroupList, PlanList -->
			<group-list :groups="groups"> </group-list>
			<h3>
				<strong
					><ion-label :color="currentGroup.color">{{
						currentGroup.name
					}}</ion-label></strong
				>
			</h3>
			<plan-list :plans="currentGroup.plans"> </plan-list>
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
	IonLabel,
} from "@ionic/vue";
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { getGroups } from "@/api/planManagement/getGroups";
import { useUserStore } from "@/store/userStore";
import PlanList from "@/components/PlanList.vue";
import GroupList from "@/components/GroupList.vue";
import { alertCircle, checkmarkCircle, listCircle } from "ionicons/icons";
import { findModuleName } from "@/utils/findModuleName";
import { getPlans } from "@/api/planManagement/getPlans";
import { completePlan } from "@/api/planManagement/completePlan";
import { deletePlan } from "@/api/planManagement/deletePlan";
import { deleteGroup } from "@/api/planManagement/deleteGroup";

const route = useRoute();
const moduleName = ref();
const userStore = useUserStore();
const currentUser = userStore.currentUser;
const groups = ref();
const currentGroup = reactive({name: null, color: null, plans: null});
const colorArray: string[] = [
	"danger",
	"tertiary",
	"success",
	"warning",
	"primary",
	"secondary",
	// "light",
	// "medium",
	// "dark",
];
const colorCycle = arrayCycleTool(colorArray);

function arrayCycleTool(array: Array<any>) {
	let index: number = 0;
	const arrayCycle = () => {
		if (index == array.length) {
			index = 0;
		}
		return array[index++];
	};
	return arrayCycle;
}

function matchColorByPriorityName(priorityName: string) {
	switch (priorityName) {
		case "high":
			return "primary";
		case "medium":
			return "secondary";
		case "low":
			return "medium";
		default:
			return "danger";
	}
}

function matchColorByRepeatName(repeatName: string) {
	switch (repeatName) {
		case "everyday":
			return "success";
		case "workday":
			return "tertiary";
		case "weekday":
			return "warning";
		default:
			return "danger";
	}
}

function setPlanAtrr(group: any, plan: any) {
	plan.handleClick = async () => {
		alert("click");
	};
	plan.handleDetail = plan.handleClick;
	plan.handleDelete = async () => {
		await deletePlan(userStore.accessToken, currentUser.id, plan.id);
		group.plans = group.plans.filter((item: any) => { return item.id != plan.id });
		currentGroup.plans = group.plans;
	};
	plan.handleComplete = async () => {
		await completePlan(userStore.accessToken, currentUser.id, plan.id);
		plan.completed = true;
		setPlanAtrr(group, plan);
	};
	plan.priorityName = plan.priority.name;
	plan.repeatName = plan.repeat.name;
	plan.priorityColor = matchColorByPriorityName(plan.priorityName);
	plan.repeatColor = matchColorByRepeatName(plan.repeatName);
	if (plan.completed) {
		plan.icon = checkmarkCircle;
		plan.color = "primary";
	} else {
		plan.icon = alertCircle;
		plan.color = "medium";
	}
}

async function setGroupAttr(group: any) {
	group.icon = listCircle;
	group.color = colorCycle();
	group.label = group.name;
	if (!group?.plans){
		group.plans = [];
	}
	group.total = computed(() => {
		return group.plans.length;
	});
	group.completedCount = computed(() => {
		return group.plans.filter((plan: any) => plan.completed).length;
	});
	group.unfinishedCount = computed(() => {
		return group.total - group.completedCount;
	});
	group.handleClick = async () => {
		currentGroup.name = group.name;
		currentGroup.color = group.color;
		currentGroup.plans = group.plans;
	};
	group.selectPlans = async () => {
		currentGroup.name = group.name;
		currentGroup.color = group.color;
		currentGroup.plans = group.plans;
	};
	group.handleDetail = async () => {
		alert("detail");
	};
	group.handleDelete = async () => {
		deleteGroup(userStore.accessToken, currentUser.id, group.id);
	};
}

function getRandomElement(array: Array<any>) {
	if (array.length === 0) {
		return;
	}
	const randomIndex = Math.floor(Math.random() * array.length);
	return array[randomIndex];
}

onMounted(async () => {
	moduleName.value = findModuleName(route.name as string);

	groups.value = await getGroups(userStore.accessToken, currentUser.id);
	const promises = groups.value.map(async (group: any) => {
		await setGroupAttr(group);
		group.plans = await getPlans({
			accessToken: userStore.accessToken,
			id: currentUser.id,
			groupName: group.name,
			deleted: false,
		});
		group.plans.forEach((plan: any) => {
			setPlanAtrr(group, plan);
		});
	});
	await Promise.all(promises);
	if (groups.value) {
		const group = getRandomElement(groups.value);
		currentGroup.name = group.name;
		currentGroup.color = group.color;
		currentGroup.plans = group.plans;
	}
});
</script>

<style scoped>
.functional-modules-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}

.functional-module {
	width: 50%;
}

h3 {
	margin-top: 2%;
	margin-left: 2%;
}
</style>
