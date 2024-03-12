<template>
	<ion-segment
		v-model="segmentValue"
		@ionChange="handleChange">
		<ion-segment-button
			v-for="(value, index) of values"
			:key="index"
			:value="value">
			<ion-label>{{ value }}</ion-label>
		</ion-segment-button>
	</ion-segment>
</template>

<script setup lang="ts">
import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/vue";
import { defineModel } from "vue";

const segmentValue = defineModel("segmentValue");
const values       = defineModel("values");
const handleChange = defineModel("handleChange");
</script>
