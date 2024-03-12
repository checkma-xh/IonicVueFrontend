<template>
	<ion-select
		:label="label"
		:placeholder="placeholder"
		:value="selectValue"
		@ionChange="handleChange">
		<ion-select-option
			v-for="(value, index) of selectOptions"
			:key="index"
			:value="value"
			>{{ value }}
		</ion-select-option>
	</ion-select>
</template>

<script setup lang="ts">
import { IonSelect, IonSelectOption } from "@ionic/vue";

const label = defineModel("label");
const placeholder = defineModel("placeholder");
const selectValue = defineModel("selectValue");
const handleChange = defineModel("handleChange");
const selectOptions = defineModel("selectOptions");
</script>
