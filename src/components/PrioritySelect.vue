<template>
    <ion-select label="priority" placeholder="priority" :value="priorityValue">
        <ion-select-option v-for="(item, index) of priorityOptions" :key="index" :value="item.name">
            {{ item.name }}
        </ion-select-option>
    </ion-select>
</template>

<script setup lang="ts">
import { priorityOptions } from "@/assets/data/plansManagement/priorityOptions";

const priorityValue = defineModel("priorityValue", {
    type: String,
    required: true,
});
</script>
