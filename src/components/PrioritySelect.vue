<template>
	<ion-select
		label="priority"
		placeholder="priority"
		:value="priorityValue">
		<ion-select-option
			v-for="(item, index) of priorities"
			:key="index"
			:value="item.name">
			{{ item.name }}
		</ion-select-option>
	</ion-select>
</template>

<script setup lang="ts">
import { getPriorities } from "@/api/other/getPriorities";
import { useUserStore } from "@/store/userStore";
import { onMounted, ref } from "vue";

const userStore = useUserStore();
const priorities = ref();
const priorityValue = defineModel("priorityValue", {
	type: String,
	required: true,
});

onMounted(async () => {
	priorities.value = await getPriorities(userStore.accessToken);
});
</script>
