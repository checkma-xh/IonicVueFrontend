<template>
	<ion-segment v-model="repeatSegmentValue">
		<ion-segment-button value="everyday">
			<ion-label>everyday</ion-label>
		</ion-segment-button>
		<ion-segment-button value="workday">
			<ion-label>workday</ion-label>
		</ion-segment-button>
		<ion-segment-button value="weekday">
			<ion-label>weekday</ion-label>
		</ion-segment-button>
	</ion-segment>
</template>

<script setup lang="ts">
import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/vue";
import { defineModel } from "vue";

const repeatSegmentValue = defineModel("repeatSegmentValue");
</script>
