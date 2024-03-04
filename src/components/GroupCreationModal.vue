<template>
    <ion-content class="ion-padding">
        <!-- 输入框 -->
        <ion-input placeholder="title" ref="titleRef" :autofocus="true" :counter="true" :maxlength="64"
            v-model="title"></ion-input>
        <ion-textarea placeholder="remark" :auto-grow="true" :counter="true" :maxlength="64" v-model="remark">
        </ion-textarea>
        <ion-button @click="addGroups">confirm</ion-button>
    </ion-content>
</template>

<script setup lang="ts">
import { IonContent, IonInput, IonTextarea, IonButton } from "@ionic/vue";
import { ref } from "vue";
const title = ref();
const remark = ref();

async function addGroups() {
    alert(title.value + "-" + remark.value);
}
</script>

<style scoped>
ion-input,
ion-textarea {
    margin-top: 1%;
    margin-left: 1%;
    width: 99%;
}

ion-button {
    margin-top: 2%;
    width: 100%;
}
</style>
