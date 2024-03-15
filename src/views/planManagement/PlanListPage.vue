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

			<!-- group list -->
			<group-list :groups="currentGroups"> </group-list>

			<!-- current group name and trash toggle -->
			<ion-grid>
				<ion-row>
					<ion-col size="1">
						<strong
							><ion-label :color="currentGroup.color">{{
								currentGroup.name
							}}</ion-label></strong
						>
					</ion-col>
					<ion-col size="1">
						<ion-toggle
							:checked="trash"
							:disabled="true"
							>trash</ion-toggle
						>
					</ion-col>
				</ion-row>
			</ion-grid>

			<!-- repeat segment -->
			<RepeatSegment v-model:repeatSegmentValue="repeat"></RepeatSegment>
			<plan-list :plans="currentGroup.planFilterByRepeat"> </plan-list>

			<!-- modal -->
			<ion-modal ref="detailModal">
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
	</ion-page>
</template>

<script setup lang="ts">
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonToggle,
	IonGrid,
	IonRow,
	IonCol,
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
import RepeatSegment from "@/components/RepeatSegment.vue";
import DetailCard from "@/components/DetailCard.vue";
import { listCircle } from "ionicons/icons";
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
import { showToast } from "@/utils/useToastTool";
import { getPriorities } from "@/api/other/getPriorities";

const route = useRoute();
const userStore = useUserStore();
const currentUser = userStore.currentUser;
const moduleName = ref();
const detailModal = ref();
const trash = ref();
const repeat = ref();
const priorities = ref();
const currentGroups = ref();
const currentGroup = reactive({
	name: "",
	color: "",
	plans: [],
	planFilterByRepeat: computed(() => {
		const plans: any = currentGroup.plans.filter((plan: any) => {
			return plan.repeat.name === repeat.value;
		});
		plans.sort(sortPlan);
		return plans;
	}),
});
const detail = reactive({
	handleClick: closeDetailModal,
	icon: "",
	iconColor: "light",
	cardColor: "light",
	title: "light",
	subtitle: "",
	content: "",
});
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
const colorCycle = arrayCycleTool(colorArray);

function arrayCycleTool(array: Array<any>) {
	let index: number = 0;
	const arrayCycle = () => {
		if (index === array.length) {
			index = 0;
		}
		return array[index++];
	};
	return arrayCycle;
}

function sortPlan(currentItem: any, afterItem: any) {
	if (currentItem.completed !== afterItem.completed) {
		return currentItem.completed ? -1 : 1;
	}

	const priorityOrder = priorities.value;
	const currentItemIndex = priorityOrder.indexOf(currentItem.priorityName);
	const afterItemIndex = priorityOrder.indexOf(afterItem.priorityName);

	return currentItemIndex - afterItemIndex;
}

function openDetailModal() {
	detailModal.value.$el.isOpen = true;
	detailModal.value.$el.canDismiss = false;
}

function closeDetailModal() {
	detailModal.value.$el.canDismiss = true;
	detailModal.value.$el.isOpen = false;
}

function setPlanAtrr(group: any, plan: any) {
	plan.handleClick = () => {
		detail.cardColor = "light";
		detail.icon = plan.icon;
		detail.iconColor = plan.color;
		detail.handleClick = closeDetailModal;
		detail.title = plan.name;
		detail.content = plan.remark;
		detail.subtitle = `group-${plan.group.name}; priority-${plan.priority.name}; repeat-${plan.repeat.name}; completed-${plan.completed};`;
		openDetailModal();
	};

	plan.handleDelete = async () => {
		const response = await deletePlan(
			userStore.accessToken,
			currentUser.id,
			plan.id
		);
		await showToast(response.data.message, 2000, "bottom");
		if (response.status < 200 || response.status > 299) {
			return;
		}
		group.plans = group.plans.filter((item: any) => {
			return item.id !== plan.id;
		});
		currentGroup.plans = group.plans;
	};

	plan.handleComplete = async () => {
		const response = await completePlan(
			userStore.accessToken,
			currentUser.id,
			plan.id
		);
		await showToast(response.data.message, 2000, "bottom");
		if (response.status < 200 || response.status > 299) {
			return;
		}
		plan.completed = true;
	};

	plan.handleDetail = computed(() => {
		return plan.handleClick;
	});
	plan.priorityName = computed(() => {
		return plan.priority.name;
	});
	plan.repeatName = computed(() => {
		return plan.repeat.name;
	});
	plan.groupName = computed(() => {
		return plan.group.name;
	});
	plan.icon = computed(() => {
		return matchIconByCompleted(plan.completed);
	});
	plan.color = computed(() => {
		return matchIconColorByCompleted(plan.completed);
	});
	plan.priorityColor = computed(() => {
		return matchColorByPriorityName(plan.priority.name);
	});
	plan.repeatColor = computed(() => {
		return matchColorByRepeatName(plan.repeat.name);
	});
}

function setGroupAttr(group: any) {
	group.icon = computed(() => {
		return listCircle;
	});
	group.color = computed(() => {
		return colorCycle();
	});
	group.total = computed(() => {
		return group.plans.length;
	});
	group.completedCount = computed(() => {
		return group.plans.filter((plan: any) => plan.completed).length;
	});
	group.unfinishedCount = computed(() => {
		return group.total - group.completedCount;
	});
	group.selectPlans = computed(() => {
		return group.handleClick;
	});

	group.handleClick = () => {
		currentGroup.name = group.name;
		currentGroup.color = group.color;
		currentGroup.plans = group.plans;
	};

	group.handleDetail = () => {
		detail.cardColor = "light";
		detail.icon = group.icon;
		detail.iconColor = group.color;
		detail.handleClick = closeDetailModal;
		detail.title = group.name;
		detail.content = group.remark;
		detail.subtitle = `${group.completedCount} / ${group.total}`;
		openDetailModal();
	};

	group.handleDelete = async () => {
		const response = await deleteGroup(
			userStore.accessToken,
			currentUser.id,
			group.id
		);
		await showToast(response.data.message, 2000, "bottom");
		if (response.status < 200 || response.status > 299) {
			return;
		}
		currentGroups.value = currentGroups.value.filter((item: any) => {
			return item.id !== group.id;
		});
	};
}

onMounted(async () => {
	moduleName.value = matchModuleNameByRouteName(route.name as string);

	trash.value = false;
	repeat.value = "everyday";

	priorities.value = (
		await getPriorities(userStore.accessToken)
	).data.priorities;

	currentGroups.value = (
		await getGroups(userStore.accessToken, currentUser.id, trash.value)
	).data.groups;

	const promises = currentGroups.value.map(async (group: any) => {
		group.plans = (
			await getPlans({
				accessToken: userStore.accessToken,
				id: currentUser.id,
				groupName: group.name,
				deleted: trash.value,
			})
		).data.plans;

		group.plans.forEach((plan: any) => {
			setPlanAtrr(group, plan);
		});

		setGroupAttr(group);
	});

	await Promise.all(promises);
});

watchEffect(() => {
	if (currentGroups.value) {
		const firstGroup = currentGroups.value[0];
		currentGroup.name = firstGroup.name;
		currentGroup.color = firstGroup.color;
		currentGroup.plans = firstGroup.plans;
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

ion-row {
	margin-left: 2%;
}
</style>
