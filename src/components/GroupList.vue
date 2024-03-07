<template>
	<ion-list :inset="true">
		<group-item
			v-for="(value, index) of groups"
			:key="index"
			:color="value.color"
			:icon="value.icon"
			:label="value.label"
			:completedCount="value.completedCount"
			:total="value.total"
			@click="value.handleClick">
		</group-item>
	</ion-list>
</template>

<script setup lang="ts">
import { defineModel } from "vue";
import { IonList } from "@ionic/vue";
import GroupItem from "./GroupItem.vue";

const groups = defineModel("groups");
</script>
