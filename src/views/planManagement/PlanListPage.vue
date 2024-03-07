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
			<plan-list :plans="plans"> </plan-list>
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
} from "@ionic/vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getGroups } from "@/api/planManagement/getGroups";
import { useUserStore } from "@/store/userStore";
import PlanList from "@/components/PlanList.vue";
import GroupList from "@/components/GroupList.vue";
import { alertCircle, checkmarkCircle, listCircle } from "ionicons/icons";
import { findModuleName } from "@/utils/findModuleName";
import { getPlansByGroupName } from "@/api/planManagement/getPlansByGroupName";

const route = useRoute();
const moduleName = ref();
const userStore = useUserStore();
const currentUser = userStore.currentUser;
const groups = ref();
const plans = ref();

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

onMounted(async () => {
	moduleName.value = await findModuleName(route.name as string);
	const colorArray: string[] = [
		"danger",
		"tertiary",
		"success",
		"warning",
		"primary",
		"secondary",
		"light",
		"medium",
		"dark",
	];
	const colorArrayCycle = arrayCycleTool(colorArray);
	groups.value = await getGroups(currentUser.id, userStore.accessToken);
	groups.value.forEach((item: any) => {
		item.icon = listCircle;
		item.color = colorArrayCycle();
		item.label = item.name;
		item.completedCount = 5;
        item.total = 10;
		item.handleClick = () => {
			alert(item.label);
		};
	});
	plans.value = await getPlansByGroupName(
		currentUser.id,
		userStore.accessToken,
        "daily"
	);
	plans.value.forEach((item: any) => {
		if (item.completed) {
			item.icon = checkmarkCircle;
			item.color = "primary";
		} else {
			item.icon = alertCircle;
			item.color = "medium";
		}
	});
});
</script>

<style scoped>
#container {
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	top: auto;
	width: 100%;
	text-align: center;
	padding-bottom: 5%;
}

.functional-modules-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}

.functional-module {
	width: 50%;
}
</style>@/api/planManagement/getPlansByGroupName
