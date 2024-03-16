<template>
	<ion-page>
		<ion-header :translucent="true">
			<ion-toolbar>
				<ion-title>login</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content
			:fullscreen="true"
			class="ion-padding">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">login</ion-title>
				</ion-toolbar>
			</ion-header>

			<div id="container">
				<ion-list>
					<functional-input
						inputType="email"
						v-model="email"></functional-input>
					<functional-input
						inputType="password"
						v-model="password"></functional-input>
					<ion-button @click.stop="handleLogin">login</ion-button>
					<ion-button @click.stop="openModal"
						>verification code login</ion-button
					>
					<ion-modal ref="modal">
						<ion-header>
							<ion-toolbar>
								<ion-title> verification code login </ion-title>
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
								:avatar="avatar"
								:email="email"
								:handleVerify="handleVerify"></verify-module>
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
	IonButtons,
	IonButton,
	IonModal,
} from "@ionic/vue";
import FunctionalInput from "@/components/FunctionalInput.vue";
import { ref } from "vue";
import {
	verificationCodeFormat,
	emailFormat,
	passwordFormat,
} from "@/utils/useTextFormat";
import VerifyModule from "@/components/VerifyModule.vue";
import { useUserStore } from "@/store/userStore";
import { personCircleOutline } from "ionicons/icons";
import { login } from "@/api/auth/login";
import { verificationCodeRequest } from "@/api/auth/verificationCodeRequest";
import { verificationCodeVerify } from "@/api/auth/verificationCodeVerify";
import router from "@/router";
import { showToast } from "@/utils/useToastTool";
import { ConfigService } from "@/utils/ConfigService";
import { Preferences } from "@capacitor/preferences";

const userStore = useUserStore();
const config = ConfigService.getConfig();
const modal = ref();
const email = ref();
const password = ref();
const verificationCode = ref();
const avatar = ref(personCircleOutline);

async function openModal() {
	if (!emailFormat(email.value)) {
		return await showToast("format wrong", 2000, "bottom");
	}

	modal.value.$el.isOpen = true;
	modal.value.$el.canDismiss = false;

	const response = await verificationCodeRequest(email.value);
	return await showToast(response.data.message, 2000, "bottom");
}

async function closeModal() {
	modal.value.$el.canDismiss = true;
	modal.value.$el.isOpen = false;
}

async function handleLogin() {
	if (!emailFormat(email.value) || !passwordFormat(password.value)) {
		return await showToast("format wrong", 2000, "bottom");
	}

	const response = await login(email.value, password.value);
	await showToast(response.data.message, 2000, "bottom");
	if (response.status < 200 || response.status > 299) {
		return;
	}

	await userStore.setConfig({
		argId          : response.data.id as number,
		argEmail       : response.data.email as string,
		argPassword    : response.data.password as string,
		argAvatar      : response.data.argAvatar as string,
		argActivated   : response.data.activated as boolean,
		argAccessToken : response.data.accessToken as string,
		argRefreshToken: response.data.refreshToken as string,
		argIsLogin     : true,
	});
	await Preferences.set({
		key  : config.viteUserRefreshTokenPath,
		value: userStore.refreshToken,
	});
	
	router.push({ name: "PlanManagement" });
}

async function handleVerify() {
	if (!verificationCodeFormat(verificationCode.value)) {
		return await showToast("format wrong", 2000, "bottom");
	}

	let response;

	response = await verificationCodeVerify(
		email.value,
		verificationCode.value
	);
	await showToast(response.data.message, 2000, "bottom");
	if (response.status < 200 || response.status > 299) {
		return;
	}

	response = await login(email.value);
	await showToast(response.data.message, 2000, "bottom");
	if (response.status < 200 || response.status > 299) {
		return;
	}

	await userStore.setConfig({
		argId          : response.data.id as number,
		argEmail       : response.data.email as string,
		argPassword    : response.data.password as string,
		argAvatar      : response.data.argAvatar as string,
		argActivated   : response.data.activated as boolean,
		argAccessToken : response.data.accessToken as string,
		argRefreshToken: response.data.refreshToken as string,
		argIsLogin     : true,
	});
	await Preferences.set({
		key  : config.viteUserRefreshTokenPath,
		value: userStore.refreshToken,
	});
	await closeModal();

	router.push({ name: "PlanManagement" });
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
	width: 100%;
}

#container ion-input,
#container ion-button {
	margin-top: 1%;
}

#container ion-button {
	display: block;
}
</style>
