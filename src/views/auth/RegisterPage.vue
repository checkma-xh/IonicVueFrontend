<template>
	<ion-page>
		<ion-header :translucent="true">
			<ion-toolbar>
				<ion-title>register</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content
			:fullscreen="true"
			class="ion-padding">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">register</ion-title>
				</ion-toolbar>
			</ion-header>

			<div id="container">
				<ion-list>
					<ion-chip>
						<ion-avatar>
							<img
								alt="silhouette of a person's head"
								:src="avatarWebPath"
								@click="setAvatar" />
						</ion-avatar>
						<ion-label>{{ email }}</ion-label>
					</ion-chip>
					<functional-input
						inputType="email"
						v-model="email"></functional-input>
					<functional-input
						inputType="password"
						v-model="password"></functional-input>
					<functional-input
						inputType="password"
						v-model="confirmPassword"></functional-input>
					<ion-button @click="openModal"> register </ion-button>

					<ion-modal ref="modal">
						<ion-header>
							<ion-toolbar>
								<ion-title> register </ion-title>
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
								:avatar="avatarWebPath"
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
	IonChip,
	IonAvatar,
	IonButtons,
	IonButton,
	IonModal,
} from "@ionic/vue";
import FunctionalInput from "@/components/FunctionalInput.vue";
import { takePhoto, savePhoto, loadPhoto } from "@/utils/usePhotoGallery";
import { ref } from "vue";
import {
	emailFormat,
	passwordFormat,
	verificationCodeFormat,
} from "@/utils/useTextFormat";
import { useUserStore } from "@/store/userStore";
import { personCircleOutline } from "ionicons/icons";
import { ConfigService } from "@/utils/ConfigService";
import { register } from "@/api/auth/register";
import router from "@/router";
import VerifyModule from "@/components/VerifyModule.vue";
import { verificationCodeRequest } from "@/api/auth/verificationCodeRequest";
import { verificationCodeVerify } from "@/api/auth/verificationCodeVerify";
import { showToast } from "@/utils/useToastTool";

const modal = ref();
const verificationCode = ref();
const config = ConfigService.getConfig();
const userStore = useUserStore();
const avatarWebPath = ref(personCircleOutline);
const email = ref();
const password = ref();
const confirmPassword = ref();

async function setAvatar() {
	const avatar = await takePhoto();
	if (!avatar) {
		return await showToast("photo retrieval failed", 2000, "bottom");
	}

	avatarWebPath.value = avatar.webPath!;
	await savePhoto(avatar, config.viteUserAvatarPath);
	const avatarBase64 = await loadPhoto(config.viteUserAvatarPath);

	if (!avatarBase64) {
		return await showToast("photo retrieval failed", 2000, "bottom");
	}
	userStore.setConfig({
		argAvatar: `data:image/jpeg;base64,${avatarBase64.data}`,
	});
}

async function openModal() {
	if (
		!emailFormat(email.value) ||
		!passwordFormat(password.value) ||
		password.value !== confirmPassword.value
	) {
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

async function handleVerify() {
	if (!verificationCodeFormat(verificationCode.value)) {
		return await showToast("format wrong", 2000, "bottom");
	}

	let response = await verificationCodeVerify(
		email.value,
		verificationCode.value
	);
	await showToast(response.data.message, 2000, "bottom");
	if (response.status < 200 || response.status > 299) {
		return;
	}

	response = await register(email.value, password.value, userStore.avatar);
	await showToast(response.data.message, 2000, "bottom");
	if (response.status < 200 || response.status > 299) {
		await userStore.reset();
		return;
	}

	await closeModal();
	router.push({ name: "Login" });
}
</script>

<style scoped>
#container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 0 1%;
}

#container ion-list {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

#container ion-input,
#container ion-button,
#container ion-chip {
	margin-top: 1%;
}

#container ion-button {
	width: 100%;
}

#container ion-chip:last-child {
	margin-bottom: 0%;
}
</style>
