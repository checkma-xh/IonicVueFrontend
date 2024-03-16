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

			<div id="container">
				<detail-card
					v-for="(value, index) of moduleMessages"
					:handleClick="value.handleClick"
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
import DetailCard from "@/components/DetailCard.vue";
import { useUserStore } from "@/store/userStore";
import { reactive, ref } from "vue";
import { showToast } from "@/utils/useToastTool";
import router from "@/router";
import {
	logInOutline,
	logOutOutline,
	personAddOutline,
	personRemoveOutline,
} from "ionicons/icons";
import { verificationCodeRequest } from "@/api/auth/verificationCodeRequest";
import { showActionSheet } from "@/utils/useActionSheetTool";
import { logout } from "@/api/auth/logout";
import { ConfigService } from "@/utils/ConfigService";
import { Preferences } from "@capacitor/preferences";
import { deleteSearchHistory } from "@/utils/useSearchHistory";
import { deletePhoto } from "@/utils/usePhotoGallery";

const userStore = useUserStore();
const config = ConfigService.getConfig();
const registerModule = reactive({
	handleClick: () => {
		router.push({ name: "Register" });
	},
	icon     : personAddOutline,
	cardColor: "light",
	iconColor: "primary",
	title    : "register",
	subtitle : "",
	content  : "",
});

const loginModule = reactive({
	handleClick: async () => {
		if (userStore.isLogin) {
			return await showToast("please logout", 2000, "bottom");
		}
		router.push({ name: "Login" });
	},
	icon     : logInOutline,
	cardColor: "light",
	iconColor: "primary",
	title    : "login",
	subtitle : "",
	content  : "",
});

const logoutModule = reactive({
	handleClick: async () => {
		if (!userStore.isLogin) {
			return await showToast("please login", 2000, "bottom");
		}
		const buttons = ref([
			{
				text: "confirm",
				role: "destructive",
				data: {
					action: "confirm",
				},
				handler: async () => {
					const response = await logout(userStore.accessToken);
					await showToast(response.data.message, 2000, "bottom");
					if (response.status < 200 || response.status > 299) {
						return;
					}

					await userStore.reset();
					await Preferences.remove({ key: config.viteUserRefreshTokenPath });
					await deletePhoto(config.viteUserAvatarPath);
					await deleteSearchHistory();

					router.push({name: "Login"});
				},
			},
			{
				text: "cancel",
				role: "cancel",
				data: {
					action: "cancel",
				},
			},
		]);
		return await showActionSheet("logout", buttons.value);
	},
	icon     : logOutOutline,
	cardColor: "light",
	iconColor: "primary",
	title    : "logout",
	subtitle : "",
	content  : "",
});

const deactivateModule = reactive({
	handleClick: async () => {
		if (!userStore.isLogin) {
			return await showToast("please login", 2000, "bottom");
		}
		router.push({ name: "Deactivate" });
		const response = await verificationCodeRequest(userStore.email);
		await showToast(response.data.message, 2000, "bottom");
	},
	icon     : personRemoveOutline,
	cardColor: "light",
	iconColor: "primary",
	title    : "deactivate",
	subtitle : "",
	content  : "",
});

const moduleMessages = ref([
	registerModule,
	loginModule,
	logoutModule,
	deactivateModule,
]);
</script>

<style scoped>
#container {
	display: flex;
	flex-wrap: wrap;
	text-align: center;
	justify-content: center;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	top: auto;
	width: 100%;
	padding-bottom: 5%;
}

.detail-card {
	flex: 0 0 calc(40%);
	box-sizing: border-box;
}
</style>
