<template>
	<ion-item-sliding ref="planSlidingItem">
		<ion-item
			:button="true"
			:detail="false"
			@click="handleClick">
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
				<ion-chip :color="priorityColor">
					<ion-label>{{ priorityName }}</ion-label>
				</ion-chip>
				<ion-chip :color="repeatColor">
					<ion-label>{{ repeatName }}</ion-label>
				</ion-chip>
				<ion-icon
					color="medium"
					:icon="chevronForward"></ion-icon>
			</div>
		</ion-item>
		<ion-item-options slot="end">
			<ion-item-option
				@click="
					async () => {
						await closePlanSlidingItem();
						await handleDetail();
					}
				"
				color="tertiary"
				expandable="true">
				<ion-icon
					slot="icon-only"
					:icon="ellipsisVertical"></ion-icon>
			</ion-item-option>
			<ion-item-option
				@click="
					async () => {
						await closePlanSlidingItem();
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
						await closePlanSlidingItem();
						await handleComplete();
					}
				"
				color="primary"
				expandable="true">
				<ion-icon
					slot="icon-only"
					:icon="checkmarkCircle"></ion-icon>
			</ion-item-option>
		</ion-item-options>
	</ion-item-sliding>
</template>

<script setup lang="ts">
import { defineModel, ref } from "vue";
import {
	IonItemOptions,
	IonItemOption,
	IonItemSliding,
	IonIcon,
	IonItem,
	IonLabel,
	IonChip,
	IonNote,
} from "@ionic/vue";
import {
	chevronForward,
	ellipsisVertical,
	trash,
	checkmarkCircle,
} from "ionicons/icons";

const planSlidingItem = ref();
async function closePlanSlidingItem() {
	planSlidingItem.value.$el.closeOpened();
}
const icon           = defineModel("icon");
const color          = defineModel("color");
const name           = defineModel("name");
const remark         = defineModel("remark");
const priorityName   = defineModel("priorityName");
const repeatName     = defineModel("repeatName");
const priorityColor  = defineModel("priorityColor");
const repeatColor    = defineModel("repeatColor");
const handleClick    = defineModel("handleClick");
const handleDetail   = defineModel("handleDetail");
const handleDelete   = defineModel("handleDelete");
const handleComplete = defineModel("handleComplete");
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
