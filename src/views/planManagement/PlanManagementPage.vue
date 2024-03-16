<template>
	<ion-page>
		<ion-header :translucent="true">
			<ion-toolbar>
				<ion-title>plan management</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content
			:fullscreen="true"
			class="ion-padding">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">plan management</ion-title>
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
	modalController,
} from "@ionic/vue";
import DetailCard from "@/components/DetailCard.vue";
import { reactive, ref } from "vue";
import SearchModal from "@/components/SearchModal.vue";
import { addCircle, calendarOutline, searchOutline } from "ionicons/icons";
import router from "@/router";
import { useUserStore } from "@/store/userStore";


const userStore = useUserStore();
const searchModule = reactive({
	handleClick: async () => {
      const modal = await modalController.create({
        component: SearchModal,
      });
      modal.present();
    },  
    icon     : searchOutline,
    cardColor: "primary",
    iconColor: "light",
    title    : "search",
    subtitle : "search your plans",
    content  : "",
})

const planModule = reactive({
	handleClick: async () => {
      await router.push({ name: "PlanList", params: { id: userStore.id }, query: { completed: 1} });
    },
    icon     : calendarOutline,
    cardColor: "danger",
    iconColor: "light",
    title    : "plans",
    subtitle : "your plans",
    content  : "",
})

const createModule = reactive({
    handleClick: async () => {
      await router.push({ name: "CreatePlan", params: { id: userStore.id } });
    },
    icon     : addCircle,
    cardColor: "success",
    iconColor: "light",
    title    : "create",
    subtitle : "create plan",
    content  : "",
})

const moduleMessages = ref([
  searchModule,
  planModule,
  createModule,
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
