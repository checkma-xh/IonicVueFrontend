<template>
	<ion-item-sliding>
		<ion-item
			:button="true"
			:detail="false">
			<ion-icon
				:icon="icon"
				:color="color"></ion-icon>
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
			<ion-item-option color="primary">
				<ion-icon
					@click="handleCompleted"
					slot="icon-only"
					:icon="checkmarkCircle"></ion-icon>
			</ion-item-option>
		</ion-item-options>
	</ion-item-sliding>
</template>

<script setup lang="ts">
import { defineModel } from "vue";
import {
	IonItemOptions,
	IonItemOption,
	IonItemSliding,
	IonIcon,
	IonItem,
	IonLabel,
	IonNote,
} from "@ionic/vue";
import {
	chevronForward,
	ellipsisVertical,
	trash,
	checkmarkCircle,
	cog,
} from "ionicons/icons";

const icon = defineModel("icon");
const color = defineModel("color");
const name = defineModel("name");
const remark = defineModel("remark");
const priorityName = defineModel("priorityName");

async function handleDetail() {}

async function handleTrash() {}

async function handleCompleted() {}
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

ion-item-option > ion-icon {
	display: block;
	margin: auto;
}
</style>
