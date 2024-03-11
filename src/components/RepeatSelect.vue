<template>
	<ion-select
		ref="select"
		label="repeat"
		placeholder="repeat"
		v-model:repeatValue="repeatValue"
		:value="repeatValue"
		@ionChange="handleChange">
		<ion-select-option
			v-for="(item, index) of repeats"
			:key="index"
			:value="item.name"
			>{{ item.name }}</ion-select-option
		>
	</ion-select>
</template>

<script setup lang="ts">
import { IonSelect, IonSelectOption } from "@ionic/vue";
import { getRepeats } from "@/api/other/getRepeats";
import { useUserStore } from "@/store/userStore";
import { onMounted, ref } from "vue";

const userStore = useUserStore();
const repeats = ref();
const select = ref();
const repeatValue = defineModel("repeatValue");

async function handleChange() {
	repeatValue.value = select.value.$el.value;
}

onMounted(async () => {
	repeats.value = await getRepeats(userStore.accessToken);
});
</script>
@/utils/userStore