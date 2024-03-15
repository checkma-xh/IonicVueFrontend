<template>
	<ion-list :inset="true">
		<plan-item
			v-for="(value, index) of plans"
			:key="index"
			:icon="value.icon"
			:color="value.color"
			:name="value.name"
			:startDate="value.startDate"
			:endDate="value.endDate"
			:remark="value.remark"
			:priorityName="value.priorityName"
			:repeatName="value.repeatName"
			:priorityColor="value.priorityColor"
			:repeatColor="value.repeatColor"
			:handleClick="value.handleClick"
			:handleDetail="value.handleDetail"
			:handleDelete="value.handleDelete"
			:handleComplete="value.handleComplete">
		</plan-item>
	</ion-list>
</template>

<script setup lang="ts">
import { defineModel } from "vue";
import { IonList } from "@ionic/vue";
import PlanItem from "./PlanItem.vue";

const plans = defineModel("plans");
</script>