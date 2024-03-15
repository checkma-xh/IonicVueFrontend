<template>
	<ion-list>
		<ion-chip>
			<ion-avatar>
				<img
					alt="silhouette of a person's head"
					:src="avatarUrl" />
			</ion-avatar>
			<ion-label>{{ email }}</ion-label>
		</ion-chip>
		<functional-input
			inputType="text"
			v-model="verificationCode"></functional-input>
		<ion-button @click="handleVerify()">confirm</ion-button>
	</ion-list>
</template>

<script setup lang="ts">
import { IonList, IonAvatar, IonLabel, IonChip, IonButton } from "@ionic/vue";
import FunctionalInput from "@/components/FunctionalInput.vue";

const avatarUrl = defineModel("avatarUrl", {
	type: String,
	required: true,
});
const email = defineModel("email", {
	type: String,
	required: true,
});
const verificationCode = defineModel("verificationCode", {
	type: String,
	required: true,
});
const handleVerify = defineModel("handleVerify", {
	type: Function,
	required: true,
});
</script>

<style scoped>
ion-list {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: auto;
}

ion-input {
	margin-top: 1%;
	width: 92%;
}

ion-button {
	margin-top: 2%;
	width: 92%;
}
</style>
