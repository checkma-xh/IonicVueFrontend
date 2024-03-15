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
						<strong>
							<repeat-select v-model:repeatValue="repeatValue">
							</repeat-select>
						</strong>
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
import { ref, watchEffect } from "vue";
import { getDateByRepeatName } from "@/utils/useDateTool";

const datetime = ref();
const startDate = defineModel("startDate");
const endDate = defineModel("endDate");
const repeatValue = defineModel("repeatValue");
const highlightedDates = ref();

function handleDateChange() {
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

function changeHighLightDates(
	repeat: string,
	dates: any,
	startDate: Date,
	endDate: Date
) {
	const tempDates: Date[] = getDateByRepeatName(startDate, endDate, repeat);
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

watchEffect(() => {
	changeHighLightDates(
		repeatValue.value as string,
		highlightedDates,
		new Date(startDate.value as string),
		new Date(endDate.value as string)
	);
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
