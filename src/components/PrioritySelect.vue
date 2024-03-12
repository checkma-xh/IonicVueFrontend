<template>
	<ion-select
		ref="select"
		label="priority"
		placeholder="priority"
		v-model:priorityValue="priorityValue"
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

function handleChange() {
	priorityValue.value = select.value.$el.value;
}

onMounted(async () => {
	priorities.value = await getPriorities(userStore.accessToken);
});
</script>
