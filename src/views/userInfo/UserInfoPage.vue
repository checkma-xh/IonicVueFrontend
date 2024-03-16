<template>
	<ion-page>
		<ion-header :translucent="true">
			<ion-toolbar>
				<ion-title>user info</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content
			:fullscreen="true"
			class="ion-padding">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">user info</ion-title>
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
	IonTitle,
	IonContent,
} from "@ionic/vue";
import DetailCard from "@/components/DetailCard.vue";
import { ConfigService } from "@/utils/ConfigService";
import { useUserStore } from "@/store/userStore";
import router from "@/router";
import { eyeOutline, mailOutline, personCircleOutline } from "ionicons/icons";
import { deletePhoto, loadPhoto, savePhoto, takePhoto } from "@/utils/usePhotoGallery";
import { showToast } from "@/utils/useToastTool";
import { editAvatar } from "@/api/userInfo/editAvatar";
import { reactive, ref } from "vue";

const config = ConfigService.getConfig();
const userStore = useUserStore();

const editEmailModule = reactive({
	handleClick: async () => {
		router.push({ name: "EditEmail" });
	},
	icon     : mailOutline,
	cardColor: "light",
	iconColor: "primary",
	title    : "edit email",
	subtitle : "",
	content  : "",
});

const editPasswordModule = reactive({
	handleClick: () => {
		router.push({ name: "EditPassword" });
	},
	icon     : eyeOutline,
	cardColor: "light",
	iconColor: "primary",
	title    : "edit password",
	subtitle : "",
	content  : "",
});

const editAvatarModule = reactive({
	handleClick: async () => {
		const avatar = await takePhoto();
		if (!avatar) {
			return await showToast("photo retrieval failed", 2000, "bottom");
		}

		await savePhoto(avatar, config.viteUserAvatarPath);
		const avatarBase64 = await loadPhoto(config.viteUserAvatarPath);
		if (!avatarBase64){
			return await showToast("photo retrieval failed", 2000, "bottom");
		}

		const newAvatar = `data:image/jpeg;base64,${avatarBase64.data}`;
		const response = await editAvatar(
			userStore.accessToken,
			userStore.id,
			newAvatar
		);
		await showToast(response.data.message, 2000, "bottom");
		if (response.status < 200 || response.status > 299) {
			await deletePhoto(config.viteUserAvatarPath);
			return;
		}

		userStore.setConfig({argAvatar: newAvatar});
	},
	icon     : personCircleOutline,
	cardColor: "light",
	iconColor: "primary",
	title    : "edit avatar",
	subtitle : "",
	content  : "",
});

const moduleMessages = ref([
	editEmailModule,
	editPasswordModule,
	editAvatarModule,
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
