<template>
    <ion-select label="repeat" placeholder="repeat" :value="repeatValue">
        <ion-select-option v-for="(item, index) of repeatOptions" :key="index" :value="item.name">{{ item.name
            }}</ion-select-option>
    </ion-select>
</template>

<script setup lang="ts">
import { repeatOptions } from "@/assets/data/plansManagement/repeatOptions";

const repeatValue = defineModel("repeatValue", {
    type: String,
    required: true,
});
</script>
