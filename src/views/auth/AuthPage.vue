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
				class="detail-cards-container">
				<detail-card
					v-for="(value, index) of moduleMessages"
					:handle-click="value.handleClick"
					:key="index"
					:icon="value.icon"
					:iconColor="value.iconColor"
					:cardColor="value.cardColor"
					:title="value.title"
					:subtitle="value.subtitle"
					:content="value.content"
					class="detail-card">
				</detail-card>
			</div>
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonContent,
	IonTitle,
} from "@ionic/vue";
import { moduleMessages } from "@/assets/data/auth/moduleMessages";
import DetailCard from "@/components/DetailCard.vue";
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

.detail-cards-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}

.detail-card {
	width: 50%;
}
</style>
