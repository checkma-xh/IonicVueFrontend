<template>
	<ion-select
		label="repeat"
		placeholder="repeat"
		:value="repeatValue">
		<ion-select-option
			v-for="(item, index) of repeats"
			:key="index"
			:value="item.name"
			>{{ item.name }}</ion-select-option
		>
	</ion-select>
</template>

<script setup lang="ts">
import { getRepeats } from "@/api/other/getRepeats";
import { useUserStore } from "@/store/userStore";
import { onMounted, ref } from "vue";

const userStore = useUserStore();
const repeats = ref();
const repeatValue = defineModel("repeatValue", {
	type: String,
	required: true,
});

onMounted(async () => {
	repeats.value = await getRepeats(userStore.accessToken);
});
</script>
