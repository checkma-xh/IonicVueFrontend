<template>
	<ion-header>
		<ion-toolbar>
			<ion-grid>
				<ion-row>
					<ion-col size="3.5">
						<strong>start date</strong>
						<br />
						<ion-label>{{ startDate }}</ion-label>
					</ion-col>
					<ion-col size="3.5">
						<strong>end date</strong>
						<br />
						<ion-label>{{ endDate }}</ion-label>
					</ion-col>
					<ion-col size="4">
						<strong
							><repeat-select
								v-model:repeatValue="
									repeatValue
								"></repeat-select
						></strong>
					</ion-col>
				</ion-row>
			</ion-grid>
		</ion-toolbar>
	</ion-header>

	<ion-content>
		<ion-datetime
			presentation="date"
			:multiple="true"
			@ionChange="handleDateChange"
			:highlighted-dates="highlightedDates"
			ref="datetime">
		</ion-datetime>
	</ion-content>
</template>

<script setup lang="ts">
import {
	IonContent,
	IonDatetime,
	IonLabel,
	IonHeader,
	IonToolbar,
	IonGrid,
	IonRow,
	IonCol,
} from "@ionic/vue";
import RepeatSelect from "@/components/RepeatSelect.vue";
import { onMounted, onUnmounted, ref, watchEffect } from "vue";

const datetime = ref();
const startDate = defineModel("startDate");
const endDate = defineModel("endDate");
const repeatValue = defineModel("repeatValue");
const highlightedDates = ref();

async function getEverydays(startDate: Date, endDate: Date): Promise<Date[]> {
	const startMillis = startDate.getTime();
	const endMillis = endDate.getTime();
	const dates = [];

	for (
		let currentMillis = startMillis;
		currentMillis <= endMillis;
		currentMillis += 86400000
	) {
		dates.push(new Date(currentMillis));
	}
	return dates;
}

async function getWorkdays(startDate: Date, endDate: Date): Promise<Date[]> {
	const workdays: Date[] = [];
	const currentDate = new Date(startDate);

	while (currentDate <= endDate) {
		const dayOfWeek = currentDate.getDay();
		if (dayOfWeek !== 6 && dayOfWeek !== 0) {
			workdays.push(new Date(currentDate));
		}
		currentDate.setDate(currentDate.getDate() + 1);
	}
	return workdays;
}

async function getWeekdays(startDate: Date, endDate: Date): Promise<Date[]> {
	const weekdays: Date[] = [];
	const currentDate = new Date(startDate);

	while (currentDate <= endDate) {
		const dayOfWeek = currentDate.getDay();
		if (dayOfWeek == 6 || dayOfWeek == 0) {
			weekdays.push(new Date(currentDate));
		}
		currentDate.setDate(currentDate.getDate() + 1);
	}
	return weekdays;
}

async function setDates() {
	let dates = [];
	let sortedDates;
	if (datetime.value.$el.value) {
		datetime.value.$el.value = datetime.value.$el.value.slice(-2);
		dates = datetime.value.$el.value;
	}

	switch (dates.length) {
		case 0:
			startDate.value = null;
			endDate.value = null;
			break;
		case 1:
			startDate.value = dates[0];
			endDate.value = dates[0];
			break;
		case 2:
			sortedDates = dates
				.map((dateString: string) => new Date(dateString))
				.sort((a: any, b: any) => a - b);

			startDate.value = sortedDates[0].toISOString().substring(0, 10);
			endDate.value = sortedDates[1].toISOString().substring(0, 10);
			break;
		default:
			break;
	}
}

async function changeHighLightDates(
	repeat: string,
	dates: any,
	startDate: Date,
	endDate: Date
) {
	let tempDates: any[] = [];
	switch (repeat) {
		case "everyday":
			tempDates = await getEverydays(startDate, endDate);
			break;
		case "workday":
			tempDates = await getWorkdays(startDate, endDate);
			break;
		case "weekday":
			tempDates = await getWeekdays(startDate, endDate);
			break;
		default:
			tempDates = [];
			break;
	}
	dates.value = [];
	tempDates.forEach((item) => {
		const highLightDate = {
			date: item.toISOString().substring(0, 10),
			textColor: "",
			backgroundColor: "#e0ffff",
		};
		dates.value.push(highLightDate);
	});
}

async function handleDateChange() {
	await setDates();
}

watchEffect(async () => {
	await changeHighLightDates(
		repeatValue.value as string,
		highlightedDates,
		new Date(startDate.value as string),
		new Date(endDate.value as string)
	);
});

onMounted(() => {
	highlightedDates.value = [];
	startDate.value = "";
	endDate.value = "";
	repeatValue.value = "everyday";
});

onUnmounted(() => {
	highlightedDates.value = [];
	startDate.value = "";
	endDate.value = "";
	repeatValue.value = "";
});
</script>

<style scoped>
ion-col {
	align-items: center;
	text-align: center;
}

ion-datetime {
	display: block;
	margin-top: 2%;
	margin-left: auto;
	margin-right: auto;
	border-radius: 16px;
	box-shadow: rgba(0, 0, 0, 0.3) 0px 10px 15px -3px;
}
</style>
