<template>
	<ion-select
		label="groups"
		placeholder="groups"
		:value="groupsValue">
		<ion-select-option
			v-for="(item, index) of groups"
			:key="index"
			:value="item.name"
			>{{ item.name }}</ion-select-option
		>
	</ion-select>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getGroups } from "@/api/plansManagement/getGroups";
import { useUserStore } from "@/store/userStore";

const groups = ref();
const groupsValue = defineModel("groupsValue", {
	type: String,
	required: true,
});

onMounted(async () => {
	const userStore = useUserStore();
	const currentUser = userStore.currentUser;
	groups.value = await getGroups(currentUser.id, userStore.accessToken);
});
</script>
