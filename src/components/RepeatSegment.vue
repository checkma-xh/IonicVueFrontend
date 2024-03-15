<template>
	<ion-segment v-model="repeatSegmentValue">
		<ion-segment-button
			v-for="(value, index) of segments"
			:key="index"
			:value="value.name">
			<ion-label>{{ value.name }}</ion-label>
		</ion-segment-button>
	</ion-segment>
</template>

<script setup lang="ts">
import { getRepeats } from "@/api/other/getRepeats";
import { useUserStore } from "@/store/userStore";
import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/vue";
import { defineModel, onMounted, ref } from "vue";

const userStore = useUserStore();
const segments = ref();
const repeatSegmentValue = defineModel("repeatSegmentValue");

onMounted(async () => {
	const response = await getRepeats(userStore.accessToken);
	if (response.status < 200 || response.status > 299) {
		return;
	}

	segments.value = response.data.repeats;
});
</script>
