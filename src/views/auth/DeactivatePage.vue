<template>
	<ion-page>
		<ion-header :translucent="true">
			<ion-toolbar>
				<ion-title>deactivate</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content
			:fullscreen="true"
			class="ion-padding">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">deactivate</ion-title>
				</ion-toolbar>
			</ion-header>
			<verify-module
				v-model:verificationCode="verificationCode"
				:avatar="userStore.avatar"
				:email="userStore.email"
				:handleVerify="handleVerify"></verify-module>
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
} from "@ionic/vue";
import { ref } from "vue";
import { useUserStore } from "@/store/userStore";
import VerifyModule from "@/components/VerifyModule.vue";
import { verificationCodeFormat } from "@/utils/useTextFormat";
import { showToast } from "@/utils/useToastTool";
import { deactivate } from "@/api/auth/deactivate";
import { verificationCodeVerify } from "@/api/auth/verificationCodeVerify";
import router from "@/router";
import { showActionSheet } from "@/utils/useActionSheetTool";
import { ConfigService } from "@/utils/ConfigService";
import { Preferences } from "@capacitor/preferences";
import { deleteSearchHistory } from "@/utils/useSearchHistory";
import { deletePhoto } from "@/utils/usePhotoGallery";

const userStore = useUserStore();
const config = ConfigService.getConfig();
const verificationCode = ref();

async function handleDeactivate() {
	const response = await deactivate(userStore.email);
	await showToast(response.data.message, 2000, "bottom");
	if (response.status < 200 || response.status > 299) {
		return;
	}

	await userStore.reset();
	await Preferences.remove({ key: config.viteUserRefreshTokenPath });
	await deletePhoto(config.viteUserAvatarPath);
	await deleteSearchHistory();

	router.push({ name: "Login" });
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

	const buttons = [
		{
			text: "confirm",
			role: "destructive",
			data: {
				action: "confirm",
			},
			handler: handleDeactivate,
		},
		{
			text: "cancel",
			role: "cancel",
			data: {
				action: "cancel",
			},
		},
	];
	await showActionSheet("deactivate", buttons);
}
</script>

<style scoped>
#container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

#container ion-button {
	display: block;
}
</style>
