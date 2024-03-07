<template>
	<ion-item
		:button="true"
		:detail="false">
		<ion-icon :icon="icon" :color="color"></ion-icon>
		<ion-label>
			<strong>{{ name }}</strong>
			<ion-note
				color="medium"
				class="ion-text-wrap">
				{{ remark }}
			</ion-note>
		</ion-label>
		<div
			class="metadata-end-wrapper"
			slot="end">
			<ion-note color="medium">{{ priorityName }}</ion-note>
			<ion-icon
				color="medium"
				:icon="chevronForward"></ion-icon>
		</div>
	</ion-item>
</template>

<script setup lang="ts">
import { defineModel } from "vue";
import { IonIcon, IonItem, IonLabel, IonNote } from "@ionic/vue";
import { chevronForward } from "ionicons/icons";

const icon = defineModel("icon");
const color = defineModel("color");
const name = defineModel("name");
const remark = defineModel("remark");
const priorityName = defineModel("priorityName");
</script>

<style scoped>
.metadata-end-wrapper {
	position: absolute;
	top: 10px;
	inset-inline-end: 10px;
	font-size: 0.8rem;
	display: flex;
	align-items: center;
}

ion-icon {
	margin-right: 1%;
}

ion-label strong {
	display: block;
	max-width: calc(100% - 60px);
	overflow: hidden;
	text-overflow: ellipsis;
}

ion-label ion-note {
	font-size: 0.9rem;
}
</style>
