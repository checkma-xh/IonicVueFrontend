<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>deactivate</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">deactivate</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <ion-chip>
          <ion-avatar>
            <img
              alt="Silhouette of a person's head"
              :src="avatarPhoto?.webviewPath"
            />
          </ion-avatar>
          <ion-label>{{ currentUser.email }}</ion-label>
        </ion-chip>
        <ion-list>
          <ion-input
            type="email"
            label="Email"
            label-placement="floating"
            v-model="currentUser.email"
            fill="solid"
            readonly
          ></ion-input>

          <ion-input
            ref="passwordRef"
            type="password"
            label="New password"
            label-placement="floating"
            helper-text="Input your new password"
            :counter="true"
            :maxlength="64"
            :minlength="8"
            v-model="password"
            fill="solid"
            :required="true"
            error-text="Password can only contain numbers, letters, and special symbols"
          ></ion-input>

          <ion-input
            ref="confirmPasswordRef"
            type="password"
            label="Confirm password"
            label-placement="floating"
            helper-text="Confirm password"
            :counter="true"
            :maxlength="64"
            :minlength="8"
            v-model="confirmPassword"
            fill="solid"
            :required="true"
            error-text="Password can only contain numbers, letters, and special symbols"
          ></ion-input>

          <ion-input
            ref="verificationCodeRef"
            type="text"
            label="Verification code"
            label-placement="floating"
            helper-text="Confirm verification code"
            v-model="verificationCode"
            fill="solid"
            :required="true"
            :counter="true"
            :maxlength="4"
            :minlength="4"
            error-text="Verification code is incorrect"
          ></ion-input>

          <ion-button @click="editPassword" id="edit-password-alert">
            editPassword
          </ion-button>
        </ion-list>
        <ion-alert
          trigger="edit-password-alert"
          :header="alertHeaderRef"
          :sub-header="alertSubHeaderRef"
          :message="alertMessageRef"
          :buttons="alertButtons"
        ></ion-alert>
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
  IonInput,
  IonList,
  IonChip,
  IonAvatar,
  IonButton,
} from "@ionic/vue";
import { ref } from "vue";
import { avatarPhoto } from "@/utils/usePhotoGallery";
import { useUserStore } from "@/store/userStore";
import router from "@/router";

let alertButtons = [
  {
    text: "Confirm",
    role: "confirm",
    handler: () => {
      return;
    },
  },
];

const store = useUserStore();
const currentUser = store.currentUser;
const alertHeaderRef = ref();
const alertSubHeaderRef = ref();
const alertMessageRef = ref();

const password = ref("Wlj+=9351524");
const confirmPassword = ref("Wlj+=9351524");
const verificationCode = ref("2222");

const passwordRef = ref();
const confirmPasswordRef = ref();
const verificationCodeRef = ref();

function validatePassword() {
  return (
    /[a-zA-Z0-9`~!@#$%^&*()_\-+={}[\]\\|:;"',<>.?]{8,64}/.test(
      password.value
    ) &&
    /\d+/.test(password.value) &&
    /[a-zA-Z]+/.test(password.value)
  );
}

function validateConfirmPassword() {
  return password.value === confirmPassword.value;
}

function validateVerificationCode() {
  return verificationCode.value === "2222";
}

async function editPassword() {
  alertButtons = [
    {
      text: "Confirm",
      role: "confirm",
      handler: () => {
        return;
      },
    },
  ];
  if (!validatePassword()) {
    alertSubHeaderRef.value = "New password format is incorrect";
    alertHeaderRef.value = "New password format is incorrect";
    alertSubHeaderRef.value = "New password format is incorrect";
    return;
  } else if (!validateConfirmPassword()) {
    alertSubHeaderRef.value = "Passwords are inconsistent";
    alertHeaderRef.value = "Passwords are inconsistent";
    alertSubHeaderRef.value = "Passwords are inconsistent";
    return;
  } else if (!validateVerificationCode()) {
    alertSubHeaderRef.value = "Verification code error";
    alertHeaderRef.value = "Verification code error";
    alertSubHeaderRef.value = "Verification code error";
    return;
  }
  alertSubHeaderRef.value = "Edit success";
  alertHeaderRef.value = "Edit success";
  alertSubHeaderRef.value = "Edit success";
  alertButtons = [
    {
      text: "Confirm",
      role: "confirm",
      handler: () => {
        router.push({ name: "Login" });
      },
    },
  ];
}
</script>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1%;
}
#container ion-list {
  width: 300px;
}
#container ion-input {
  margin-top: 6%;
}
#container ion-button {
  margin-top: 6%;
  width: 100%;
}
</style>