<template>
	<ion-item-sliding>
		<ion-item :button="true">
			<ion-icon
				:color="color"
				solt="start"
				:icon="icon"
				size="large"></ion-icon>
			<ion-label>{{ label }}</ion-label>
			<ion-badge color="success">{{
				completedCount + " completed"
			}}</ion-badge>
			<ion-badge color="danger">{{
				total - completedCount + " unfinished"
			}}</ion-badge>
			<ion-badge color="primary">{{ total + " total" }}</ion-badge>
		</ion-item>
		<ion-item-options slot="end">
			<ion-item-option color="light">
				<ion-icon
					@click="handleSet"
					slot="icon-only"
					:icon="cog"></ion-icon>
			</ion-item-option>
			<ion-item-option color="tertiary">
				<ion-icon
					@click="handleDetail"
					slot="icon-only"
					:icon="ellipsisVertical"></ion-icon>
			</ion-item-option>
			<ion-item-option
				@click="handleTrash"
				color="danger"
				expandable="true">
				<ion-icon
					slot="icon-only"
					:icon="trash"></ion-icon>
			</ion-item-option>
			<ion-item-option
				@click="selectPlans"
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
import { defineModel } from "vue";
import {
	IonIcon,
	IonItem,
	IonLabel,
	IonBadge,
	IonItemOptions,
	IonItemOption,
	IonItemSliding,
} from "@ionic/vue";
import {
	ellipsisVertical,
	trash,
	cog,
	arrowForward,
} from "ionicons/icons";

const color = defineModel("color");
const icon = defineModel("icon");
const label = defineModel("label");
const completedCount = defineModel("completedCount");
const total = defineModel("total");
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
