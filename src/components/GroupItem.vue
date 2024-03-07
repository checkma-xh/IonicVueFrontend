<template>
	<ion-item :button="true">
		<ion-icon
			:color="color"
			solt="start"
			:icon="icon"
			size="large"></ion-icon>
		<ion-label>{{ label }}</ion-label>
		<ion-badge color="primary">{{ total + " total" }}</ion-badge>
		<ion-badge color="success">{{ completedCount + " completed" }}</ion-badge>
		<ion-badge color="danger">{{ total - completedCount + " unfinished" }}</ion-badge>
	</ion-item>
</template>

<script setup lang="ts">
import { defineModel } from "vue";
import { IonIcon, IonItem, IonLabel, IonBadge } from "@ionic/vue";

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
</style>
