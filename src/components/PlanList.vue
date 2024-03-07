<template>
	<ion-list :inset="true">
		<plan-item
			v-for="(value, index) of plans"
			:key="index"
			:icon="value.icon"
			:color="value.color"
			:name="value.name"
			:remark="value.remark"
			:priorityName="value.priorityName"
			@click="value.handleClick">
		</plan-item>
	</ion-list>
</template>

<script setup lang="ts">
import { defineModel } from "vue";
import { IonList } from "@ionic/vue";
import PlanItem from "./PlanItem.vue";

const plans = defineModel("plans");
</script>