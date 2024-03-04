<template>
    <ion-select label="groups" placeholder="groups" :value="groupsValue">
        <ion-select-option v-for="(item, index) of groupsOptions" :key="index" :value="item.name">{{ item.name
            }}</ion-select-option>
    </ion-select>
</template>

<script setup lang="ts">
import { ref } from "vue";

const groupsOptions = ref([{ name: "A" }, { name: "B" }, { name: "C" }]);

const groupsValue = defineModel("groupsValue", {
    type: String,
    required: true,
});
</script>
