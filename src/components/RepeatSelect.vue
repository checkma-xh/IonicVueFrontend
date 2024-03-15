<template>
	<ion-select
		ref="select"
		label="repeat"
		placeholder="repeat"
		v-model="repeatValue"
		@ionChange="handleChange">
		<ion-select-option
			v-for="(item, index) of repeats"
			:key="index"
			:value="item.name">
			{{ item.name }}
		</ion-select-option>
	</ion-select>
</template>

<script setup lang="ts">
import { IonSelect, IonSelectOption } from "@ionic/vue";
import { getRepeats } from "@/api/other/getRepeats";
import { useUserStore } from "@/store/userStore";
import { onMounted, ref } from "vue";

const select = ref();
const userStore = useUserStore();
const repeats = ref();
const repeatValue = defineModel("repeatValue");
const handleChange = defineModel("handleChange");

onMounted(async () => {
	const response = await getRepeats(userStore.accessToken);
	if (response.status < 200 || response.status > 299) {
		return;
	}

	repeats.value = response.data.repeats;
});
</script>
