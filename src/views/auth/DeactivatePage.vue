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
				:avatarUrl="currentUser.avatarUrl"
				:email="currentUser.email"
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
	actionSheetController,
} from "@ionic/vue";
import { reactive, ref } from "vue";
import { useUserStore } from "@/store/userStore";
import VerifyModule from "@/components/VerifyModule.vue";
import { verificationCodeFormat } from "@/utils/useTextFormat";
import { showToast } from "@/utils/useToastTool";
import { deactivate } from "@/api/auth/deactivate";
import { verificationCodeVerify } from "@/api/auth/verificationCodeVerify";
import { logout } from "@/api/auth/logout";
import router from "@/router";

const userStore = useUserStore();
const currentUser = userStore.currentUser;
const verificationCode = ref();

const actionSheetOptions = reactive({
	header: "deactivate",
	buttons: [
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
	],
});

async function showActionSheet(options: any) {
	const actionSheet = await actionSheetController.create(options);
	actionSheet.present();
}

async function handleDeactivate() {
	const response = await deactivate(currentUser.email);
	await showToast(response.data.message, 2000, "bottom");
	if (response.status > 199 && response.status < 300) {
		const logoutResponse = await logout(userStore.accessToken);
		await showToast(logoutResponse.data.message, 2000, "bottom");
		router.push({ name: "Login" });
		userStore.reset();
	}
}

async function handleVerify() {
	if (!verificationCodeFormat(verificationCode.value)) {
		return await showToast("format wrong", 2000, "bottom");
	}
	const response = await verificationCodeVerify(
		currentUser.email,
		verificationCode.value
	);
	await showToast(response.data.message, 2000, "bottom");
	if (response.status > 199 && response.status < 300) {
		await showActionSheet(actionSheetOptions);
	}
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
