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

			<div id="container">
				<ion-list>
					<verify-module
						v-model:verificationCode="verificationCode"
						:avatarUrl="currentUser.avatarUrl"
						:email="currentUser.email"
						:handleVerify="handleVerify"></verify-module>
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
} from "@ionic/vue";
import { ref } from "vue";
import { useUserStore } from "@/store/userStore";
import VerifyModule from "@/components/VerifyModule.vue";
import router from "@/router";
import { verificationCodeFormat } from "@/utils/useTextFormat";

const userStore = useUserStore();
const currentUser = userStore.currentUser;
const verificationCode = ref();

async function handleVerify() {
	if (!verificationCodeFormat(verificationCode.value)) {
		alert("wrong format");
		return;
	}
	alert("confirm deactivate");
	await router.push({ name: "Login" });
	userStore.islogin = false;
}
</script>

<style scoped>
#container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: auto 1%;
	/* 将 margin-top 和 margin-left 合并 */
	width: 98%;
	/* 使用百分比宽度，以避免内容溢出 */
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
@/utils/userStore