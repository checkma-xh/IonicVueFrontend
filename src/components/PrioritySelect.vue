<template>
	<ion-select
		ref="select"
		label="priority"
		placeholder="priority"
		v-model="priorityValue"
		@ionChange="handleChange">
		<ion-select-option
			v-for="(item, index) of priorities"
			:key="index"
			:value="item.name">
			{{ item.name }}
		</ion-select-option>
	</ion-select>
</template>

<script setup lang="ts">
import { IonSelect, IonSelectOption } from "@ionic/vue";
import { getPriorities } from "@/api/other/getPriorities";
import { useUserStore } from "@/store/userStore";
import { onMounted, ref } from "vue";

const select = ref();
const userStore = useUserStore();
const priorities = ref();
const priorityValue = defineModel("priorityValue");
const handleChange = defineModel("handleChange");

onMounted(async () => {
	const response = await getPriorities(userStore.accessToken);
	if (response.status < 200 || response.status > 299) {
		return;
	}

	priorities.value = response.data.priorities;
});
</script>
