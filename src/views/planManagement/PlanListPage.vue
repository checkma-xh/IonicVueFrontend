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

			<group-list :groups="groups"> </group-list>
			<h3>
				<strong
					><ion-label :color="currentGroup.color">{{
						currentGroup.name
					}}</ion-label></strong
				>
			</h3>
			<plan-list :plans="currentGroup.plans"> </plan-list>

			<!-- modal -->
			<ion-modal ref="modal">
				<ion-header>
					<ion-toolbar>
						<ion-title :color="detailRef.iconColor">
							{{ detailRef.title }}
						</ion-title>
						<ion-buttons slot="end">
							<ion-button
								:color="detailRef.iconColor"
								@click="detailRef.handleClick">
								confirm
							</ion-button>
						</ion-buttons>
					</ion-toolbar>
				</ion-header>
				<ion-content>
					<detail-card
						:handleClick="detailRef.handleClick"
						:icon="detailRef.icon"
						:iconColor="detailRef.iconColor"
						:cardColor="detailRef.cardColor"
						:title="detailRef.title"
						:subtitle="detailRef.subtitle"
						:content="detailRef.content"
						class="detail-card-class">
					</detail-card>
				</ion-content>
			</ion-modal>
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonModal,
	IonButtons,
	IonButton,
	IonContent,
	IonLabel,
} from "@ionic/vue";
import { computed, onMounted, reactive, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { getGroups } from "@/api/planManagement/getGroups";
import { useUserStore } from "@/store/userStore";
import PlanList from "@/components/PlanList.vue";
import GroupList from "@/components/GroupList.vue";
import { alertCircle, checkmarkCircle, listCircle } from "ionicons/icons";
import DetailCard from "@/components/DetailCard.vue";
import { getPlans } from "@/api/planManagement/getPlans";
import { completePlan } from "@/api/planManagement/completePlan";
import { deletePlan } from "@/api/planManagement/deletePlan";
import { deleteGroup } from "@/api/planManagement/deleteGroup";
import {
	matchModuleNameByRouteName,
	matchColorByPriorityName,
	matchColorByRepeatName,
	matchIconByCompleted,
	matchIconColorByCompleted,
} from "@/utils/useMatchTool";

const moduleName = ref();
const modal = ref();
const detailRef = reactive({
	handleClick: null,
	icon: null,
	iconColor: null,
	cardColor: null,
	title: null,
	subtitle: null,
	content: null,
});
const route = useRoute();
const userStore = useUserStore();
const currentUser = userStore.currentUser;
const groups = ref();
const currentGroup = reactive({ name: null, color: null, plans: null });
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

function setPlanAtrr(group: any, plan: any) {
	plan.handleClick = async () => {
		modal.value.$el.isOpen     = true;
		modal.value.$el.canDismiss = false;
		detailRef.icon             = plan.icon;
		detailRef.iconColor        = plan.color;
		detailRef.handleClick      = () => {
			modal.value.$el.canDismiss = true;
			modal.value.$el.isOpen     = false;
		};
		detailRef.cardColor = "medium";
		detailRef.title     = plan.name;
		detailRef.subtitle  = `group-${currentGroup.name}; priority-${plan.priorityName}; repeat-${plan.repeatName}; completed-${plan.completed};`;
		detailRef.content   = plan.remark;
	};
	plan.handleDetail = plan.handleClick;
	plan.handleDelete = async () => {
		group.plans = group.plans.filter((item: any) => {
			return item.id != plan.id;
		});
		currentGroup.plans = group.plans;
		await deletePlan(userStore.accessToken, currentUser.id, plan.id);
	};
	plan.handleComplete = async () => {
		plan.completed = true;
		setPlanAtrr(group, plan);
		await completePlan(userStore.accessToken, currentUser.id, plan.id);
	};
	plan.priorityName  = plan.priority.name;
	plan.repeatName    = plan.repeat.name;
	plan.priorityColor = matchColorByPriorityName(plan.priorityName);
	plan.repeatColor   = matchColorByRepeatName(plan.repeatName);
	plan.icon          = matchIconByCompleted(plan.completed);
	plan.color         = matchIconColorByCompleted(plan.completed);
}

async function setGroupAttr(group: any) {
	group.icon = listCircle;
	group.color = colorCycle();
	group.label = group.name;
	if (!group?.plans) {
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
	group.handleClick = () => {
		currentGroup.name = group.name;
		currentGroup.color = group.color;
		currentGroup.plans = group.plans;
	};
	group.selectPlans = () => {
		currentGroup.name = group.name;
		currentGroup.color = group.color;
		currentGroup.plans = group.plans;
	};
	group.handleDetail = () => {
		modal.value.$el.isOpen     = true;
		modal.value.$el.canDismiss = false;
		detailRef.icon             = group.icon;
		detailRef.iconColor        = group.color;
		detailRef.handleClick      = () => {
			modal.value.$el.canDismiss = true;
			modal.value.$el.isOpen     = false;
		};
		detailRef.cardColor = "medium";
		detailRef.title     = group.name;
		detailRef.subtitle  = `${group.completedCount} / ${group.total}`;
		detailRef.content   = group.remark;
	};
	group.handleDelete = async () => {
		groups.value = groups.value.filter((item: any) => {
			return item.id != group.id;
		});
		await deleteGroup(userStore.accessToken, currentUser.id, group.id);
	};
}

onMounted(async () => {
	moduleName.value = matchModuleNameByRouteName(route.name as string);

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
});

watchEffect(() => {
	if (groups.value) {
		const group = groups.value[0];
		currentGroup.name = group?.name;
		currentGroup.color = group?.color;
		currentGroup.plans = group?.plans;
	}
});
</script>

<style scoped>
.detail-card-class {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	text-align: center;
	align-items: center;
}

h3 {
	margin-top: 2%;
	margin-left: 2%;
}
</style>
