<template>
	<ion-item-sliding ref="groupSlidingItem">
		<ion-item
			:button="true"
			@click="handleClick">
			<ion-icon
				:color="color"
				solt="start"
				:icon="icon"
				size="large"></ion-icon>
			<ion-label>{{ name }}</ion-label>
			<ion-badge color="success">{{
				completedCount + " completed"
			}}</ion-badge>
			<ion-badge color="danger">{{
				unfinishedCount + " unfinished"
			}}</ion-badge>
			<ion-badge color="primary">{{ total + " total" }}</ion-badge>
		</ion-item>
		<ion-item-options slot="end">
			<ion-item-option
				color="tertiary"
				@click="
					async () => {
						await closeGroupSlidingItem();
						await handleDetail();
					}
				">
				<ion-icon
					slot="icon-only"
					:icon="ellipsisVertical"></ion-icon>
			</ion-item-option>
			<ion-item-option
				@click="
					async () => {
						await closeGroupSlidingItem();
						await handleDelete();
					}
				"
				color="danger"
				expandable="true">
				<ion-icon
					slot="icon-only"
					:icon="trash"></ion-icon>
			</ion-item-option>
			<ion-item-option
				@click="
					async () => {
						await closeGroupSlidingItem();
						await selectPlan();
					}
				"
				color="primary"
				expandable="true">
				<ion-icon
					slot="icon-only"
					:icon="arrowForward"></ion-icon>
			</ion-item-option>
		</ion-item-options>
	</ion-item-sliding>
</template>

<script setup lang="ts">
import { defineModel, ref } from "vue";
import {
	IonIcon,
	IonItem,
	IonLabel,
	IonBadge,
	IonItemSliding,
	IonItemOptions,
	IonItemOption,
} from "@ionic/vue";
import { ellipsisVertical, trash, arrowForward } from "ionicons/icons";

const groupSlidingItem = ref();
async function closeGroupSlidingItem() {
	groupSlidingItem.value.$el.closeOpened();
}
const color           = defineModel("color");
const icon            = defineModel("icon");
const name            = defineModel("name");
const completedCount  = defineModel("completedCount");
const unfinishedCount = defineModel("unfinishedCount");
const total           = defineModel("total");
const handleClick     = defineModel("handleClick");
const handleDetail    = defineModel("handleDetail");
const handleDelete    = defineModel("handleDelete");
const selectPlan      = defineModel("selectPlan");
</script>

<style scoped>
ion-icon {
	margin-right: 1%;
}
ion-badge {
	margin-right: 1%;
}
ion-item-option > ion-icon {
	display: block;
	margin: auto;
}
</style>
