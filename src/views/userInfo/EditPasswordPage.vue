<template>
	<ion-page>
		<ion-header :translucent="true">
			<ion-toolbar>
				<ion-title>handleVerify</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content
			:fullscreen="true"
			class="ion-padding">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">handleVerify</ion-title>
				</ion-toolbar>
			</ion-header>

			<div id="container">
				<ion-list>
					<ion-chip>
						<ion-avatar>
							<img
								alt="silhouette of a person's head"
								:src="userStore.avatar" />
						</ion-avatar>
						<ion-label>{{ userStore.email }}</ion-label>
					</ion-chip>
					<functional-input
						inputType="password"
						v-model="password"></functional-input>
					<functional-input
						inputType="password"
						v-model="confirmPassword"></functional-input>
					<ion-button @click="openModal"> edit password </ion-button>
					<ion-modal ref="modal">
						<ion-header>
							<ion-toolbar>
								<ion-title> edit password </ion-title>
								<ion-buttons slot="end">
									<ion-button @click="closeModal">
										cancel
									</ion-button>
								</ion-buttons>
							</ion-toolbar>
						</ion-header>
						<ion-content>
							<verify-module
								v-model:verificationCode="verificationCode"
								:avatar="userStore.avatar"
								:email="userStore.email"
								:handleVerify="handleVerify">
							</verify-module>
						</ion-content>
					</ion-modal>
				</ion-list>
			</div>
		</ion-content>
	</ion-page>
</template>

<script setup lang="ts">
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonList,
	IonChip,
	IonAvatar,
	IonLabel,
	IonButton,
	IonModal,
} from "@ionic/vue";
import { ref } from "vue";
import { useUserStore } from "@/store/userStore";
import { verificationCodeFormat, passwordFormat } from "@/utils/useTextFormat";
import VerifyModule from "@/components/VerifyModule.vue";
import FunctionalInput from "@/components/FunctionalInput.vue";
import { showToast } from "@/utils/useToastTool";
import { verificationCodeRequest } from "@/api/auth/verificationCodeRequest";
import { verificationCodeVerify } from "@/api/auth/verificationCodeVerify";
import { editPassword } from "@/api/userInfo/editPassword";
import router from "@/router";

const modal = ref();
const userStore = useUserStore();
const verificationCode = ref();
const password = ref();
const confirmPassword = ref();

async function openModal() {
	if (
		!passwordFormat(password.value) ||
		password.value !== confirmPassword.value
	) {
		return await showToast("format wrong", 2000, "bottom");
	}

	modal.value.$el.isOpen = true;
	modal.value.$el.canDismiss = false;

	const response = await verificationCodeRequest(userStore.email);
	return await showToast(response.data.message, 2000, "bottom");
}

async function closeModal() {
	modal.value.$el.canDismiss = true;
	modal.value.$el.isOpen = false;
}

async function handleVerify() {
	if (!verificationCodeFormat(verificationCode.value)) {
		return await showToast("format wrong", 2000, "bottom");
	}
	const response = await verificationCodeVerify(
		userStore.email,
		verificationCode.value
	);
	await showToast(response.data.message, 2000, "bottom");
	if (response.status < 200 || response.status > 299) {
		return;
	}

	const editPasswordResponse = await editPassword(
		userStore.id,
		userStore.email,
		password.value
	);
	await showToast(editPasswordResponse.data.message, 2000, "bottom");
	if (
		editPasswordResponse.status < 200 ||
		editPasswordResponse.status > 299
	) {
		return;
	}

	userStore.setConfig({ argPassword: password.value });
	await closeModal();
	router.push({ name: "Auth" });
}
</script>

<style scoped>
#container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: auto 1%;
}

#container ion-list {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
}

#container ion-input,
#container ion-button,
#container ion-chip {
	margin-top: 1%;
}

#container ion-button {
	display: block;
	width: 100%;
}

#container ion-chip:last-child {
	margin-bottom: 0%;
}
</style>
