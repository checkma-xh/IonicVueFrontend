<template>
	<ion-select
		ref="select"
		label="group"
		placeholder="group"
		v-model="groupValue"
		@ionChange="handleChange">
		<ion-select-option
			v-for="(item, index) of groups"
			:key="index"
			:value="item.name"
			>{{ item.name }}</ion-select-option
		>
	</ion-select>
</template>

<script setup lang="ts">
import { IonSelect, IonSelectOption } from "@ionic/vue";
import { onMounted, ref } from "vue";
import { getGroups } from "@/api/planManagement/getGroups";
import { useUserStore } from "@/store/userStore";

const select = ref();
const userStore = useUserStore();
const groups = ref();
const groupValue = defineModel("groupValue");
const handleChange = defineModel("handleChange");

onMounted(async () => {
	const response = await getGroups(userStore.accessToken, userStore.id, false);
	if (response.status < 200 || response.status > 299) {
		return;
	}

	groups.value = response.data.groups;
});
</script>
