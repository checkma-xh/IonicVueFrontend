<template>
	<ion-list :inset="true">
		<group-item
			v-for="(value, index) of groups"
			:key="index"
			:color="value.color"
			:icon="value.icon"
			:name="value.name"
			:completedCount="value.completedCount"
			:unfinishedCount="value.unfinishedCount"
			:total="value.total"
			:handleClick="value.handleClick"
			:handleDetail="value.handleDetail"
			:handleDelete="value.handleDelete"
			:selectPlan="value.selectPlan">
		</group-item>
	</ion-list>
</template>

<script setup lang="ts">
import { defineModel } from "vue";
import { IonList } from "@ionic/vue";
import GroupItem from "./GroupItem.vue";

const groups = defineModel("groups");
</script>
