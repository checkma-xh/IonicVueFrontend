<template>
	<ion-page>
		<ion-header :translucent="true">
			<ion-toolbar>
				<ion-title>auth</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content
			:fullscreen="true"
			class="ion-padding">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">auth</ion-title>
				</ion-toolbar>
			</ion-header>

			<div
				id="container"
				class="functional-modules-container">
				<functional-module
					v-for="(value, index) of moduleMessages"
					:handle-click="value.handleClick"
					:key="index"
					:icon="value.icon"
					:color="value.color"
					:title="value.title"
					:subtitle="value.subtitle"
					:content="value.content"
					class="functional-module">
				</functional-module>
			</div>
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/vue";
import { moduleMessages } from "@/assets/data/auth/moduleMessages";
import FunctionalModule from "@/components/FunctionalModule.vue";
</script>

<style scoped>
#container {
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	top: auto;
	width: 100%;
	text-align: center;
	padding-bottom: 5%;
}

.functional-modules-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}

.functional-module {
	width: 50%;
}
</style>
