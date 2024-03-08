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

			<div
				id="container"
				v-if="!verify">
				<ion-list>
					<functional-input
						inputType="email"
						v-model="email"></functional-input>
					<functional-input
						inputType="password"
						v-model="password"></functional-input>
					<ion-button
						@click.stop="login"
						id="login-alert"
						>login</ion-button
					>
					<ion-button @click.stop="verificationCodeLogin">verification code login</ion-button>
					<ion-alert
						trigger="login-alert"
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
						:avatarUrl="avatarUrl"
						:email="email"
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
	IonButton,
	IonAlert,
} from "@ionic/vue";
import FunctionalInput from "@/components/FunctionalInput.vue";
import { onMounted, ref } from "vue";
import router from "@/router";
import { verificationCodeFormat, emailFormat, passwordFormat } from "@/utils/useTextFormat";
import VerifyModule from "@/components/VerifyModule.vue";
import { useUserStore } from "@/store/userStore";
import { personCircleOutline } from "ionicons/icons";

const userStore = useUserStore();
const alertHeader = ref("wrong format");
const alertSubHeader = ref("wrong format");
const alertMessage = ref("wrong format");
const email = ref();
const password = ref();
const verificationCode = ref();
const verify = ref();
const avatarUrl = ref(personCircleOutline);

let alertButtons = [
	{
		text: "confirm",
		role: "confirm",
		handler: () => {
			return;
		},
	},
];

async function login() {
	if (!emailFormat(email.value) || !passwordFormat(password.value)) {
		setAlert("wrong format");
		return;
	}

	alertSubHeader.value = "success";
	alertHeader.value = "success";
	alertMessage.value = "success";
	alertButtons = [
		{
			text: "confirm",
			role: "confirm",
			handler: () => {
				router.push({ name: "PlanManagement" });
			},
		},
	];

	userStore.islogin = true;
}

function setAlert(message: string) {
	alertSubHeader.value = message;
	alertHeader.value = message;
	alertMessage.value = message;
	alertButtons = [
		{
			text: "confirm",
			role: "confirm",
			handler: () => {
				return;
			},
		},
	];
}

async function verificationCodeLogin() {
	if (!emailFormat(email.value)) {
		alert("wrong format");
		return;
	}
	verify.value = true;
	userStore.islogin = true;
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
	/* 合并 margin-top 和 margin-left */
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
