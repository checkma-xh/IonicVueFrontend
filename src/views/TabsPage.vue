<template>
	<ion-page>
		<ion-tabs>
			<ion-router-outlet></ion-router-outlet>
			<ion-tab-bar slot="bottom">
				<ion-tab-button
					tab="PlansManagement"
					href="/plans-management">
					<ion-icon
						aria-hidden="true"
						:src="listOutline"></ion-icon>
					<ion-label>plansManagement</ion-label>
				</ion-tab-button>

				<ion-tab-button
					tab="Auth"
					href="/auth">
					<ion-icon
						aria-hidden="true"
						:src="personOutline"></ion-icon>
					<ion-label>auth</ion-label>
				</ion-tab-button>

				<ion-tab-button
					tab="UserInfo"
					href="/user-info">
					<ion-icon
						aria-hidden="true"
						:src="cloudOutline"></ion-icon>
					<ion-label>userInfo</ion-label>
				</ion-tab-button>
			</ion-tab-bar>
		</ion-tabs>
	</ion-page>
</template>

<script setup lang="ts">
import {
	IonPage,
	IonTabs,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonLabel,
	IonIcon,
} from "@ionic/vue";
import { listOutline, personOutline, cloudOutline } from "ionicons/icons";
</script>
