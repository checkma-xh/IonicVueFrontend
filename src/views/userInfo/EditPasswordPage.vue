<template>
	<ion-page>
		<ion-header :translucent="true">
			<ion-toolbar>
				<ion-title>editPassword</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content
			:fullscreen="true"
			class="ion-padding">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">editPassword</ion-title>
				</ion-toolbar>
			</ion-header>

			<div
				id="container"
				v-if="!verify">
				<ion-list>
					<ion-chip>
						<ion-avatar>
							<img
								alt="Silhouette of a person's head"
								:src="currentUser.avatarUrl" />
						</ion-avatar>
						<ion-label>{{ currentUser.email }}</ion-label>
					</ion-chip>
					<functional-input
						inputType="password"
						v-model="password"></functional-input>
					<functional-input
						inputType="password"
						v-model="confirmPassword"></functional-input>
					<ion-button
						@click="editPassword"
						id="edit-password-alert">
						editPassword
					</ion-button>
					<ion-alert
						trigger="edit-password-alert"
						:header="alertHeader"
						:sub-header="alertSubHeader"
						:message="alertMessage"
						:buttons="alertButtons"></ion-alert>
				</ion-list>
			</div>

			<div
				id="container"
				v-else>
				<ion-list>
					<verify-module
						v-model:verificationCode="verificationCode"
						:avatarUrl="currentUser.avatarUrl"
						:email="targetEmail"
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
	IonChip,
	IonAvatar,
	IonLabel,
	IonButton,
	IonAlert,
} from "@ionic/vue";
import { onMounted, ref } from "vue";
import { useUserStore } from "@/store/userStore";
import { verificationCodeFormat, passwordFormat } from "@/utils/useTextFormat";
import VerifyModule from "@/components/VerifyModule.vue";
import FunctionalInput from "@/components/FunctionalInput.vue";
import router from "@/router";

let alertButtons = [
	{
		text: "confirm",
		role: "confirm",
		handler: () => {
			return;
		},
	},
];

const userStore = useUserStore();
const currentUser = userStore.currentUser;
const verify = ref();
const verificationCode = ref();
const password = ref();
const confirmPassword = ref();
const targetEmail = ref("checkma_xh@outlook.com");
const alertHeader = ref("wrong format");
const alertSubHeader = ref("wrong format");
const alertMessage = ref("wrong format");

async function editPassword() {
	if (
		!passwordFormat(password.value) ||
		password.value != confirmPassword.value
	) {
		alertSubHeader.value = "wrong format";
		alertHeader.value = "wrong format";
		alertMessage.value = "wrong format";
		alertButtons = [
			{
				text: "confirm",
				role: "confirm",
				handler: () => {
					return;
				},
			},
		];
		return;
	}
	alertSubHeader.value = "Please pay attention to the verification code";
	alertHeader.value = "Please pay attention to the verification code";
	alertMessage.value = "Please pay attention to the verification code";
	alertButtons = [
		{
			text: "confirm",
			role: "confirm",
			handler: () => {
				verify.value = true;
			},
		},
	];
}

async function handleVerify() {
	if (!verificationCodeFormat(verificationCode.value)) {
		alert("wrong format");
		return;
	}
	alert("success");
	router.push({ name: "PlanManagement" });
}

onMounted(() => {
	verify.value = false;
});
</script>

<style scoped>
#container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: auto 1%;
	/* 合并 margin-top 和 margin-left/right */
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
	/* 最后一个 chip 不需要底部边距 */
}
</style>
