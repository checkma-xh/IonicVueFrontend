<template>
	<ion-card
		:color="cardColor"
		:button="true"
		@click="handleClick">
		<ion-card-header>
			<ion-label>
				<ion-icon
					alt="Silhouette of mountains"
					:icon="icon"
					:color="iconColor"
					class="large-icon">
				</ion-icon>
			</ion-label>
			<ion-card-title
				><strong>{{ title }}</strong></ion-card-title
			>
			<ion-card-subtitle>{{ subtitle }}</ion-card-subtitle>
		</ion-card-header>
		<ion-card-content>{{ content }}</ion-card-content>
	</ion-card>
</template>

<script setup lang="ts">
import { defineModel } from "vue";
import {
	IonCard,
	IonIcon,
	IonLabel,
	IonCardHeader,
	IonCardTitle,
	IonCardSubtitle,
	IonCardContent,
} from "@ionic/vue";

const handleClick = defineModel("handleClick");
const icon = defineModel("icon");
const iconColor = defineModel("iconColor");
const cardColor = defineModel("cardColor");
const title = defineModel("title");
const subtitle = defineModel("subtitle");
const content = defineModel("content");
</script>

<style scoped>
.large-icon {
	font-size: 300%;
}
</style>
