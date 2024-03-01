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
            ref="targetEmailRef"
            type="email"
            label="Target email"
            label-placement="floating"
            helper-text="Enter a valid email"
            v-model="targetEmail"
            fill="solid"
            :required="true"
            @ionInput="validateEmail"
            @ionBlur="markTouched"
            error-text="Invalid email"
          ></ion-input>

          <ion-input
            ref="passwordRef"
            type="password"
            label="Password"
            label-placement="floating"
            helper-text="Input your password"
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

          <ion-button @click="editEmail" id="edit-email-alert">
            editEmail
          </ion-button>
        </ion-list>
        <ion-alert
          trigger="edit-email-alert"
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

const targetEmail = ref("checkmaxh@gmail.com");
const password = ref("Wlj+=9351524");
const confirmPassword = ref("Wlj+=9351524");
const verificationCode = ref("2222");

const targetEmailRef = ref();
const passwordRef = ref();
const confirmPasswordRef = ref();
const verificationCodeRef = ref();

function validateEmail() {
  targetEmailRef.value.$el.classList.remove("ion-valid");
  targetEmailRef.value.$el.classList.remove("ion-invalid");

  if (
    /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
      targetEmail.value
    )
  ) {
    targetEmailRef.value.$el.classList.add("ion-valid");
    return true;
  } else {
    targetEmailRef.value.$el.classList.add("ion-invalid");
    return false;
  }
}

function markTouched() {
  targetEmailRef.value.$el.classList.add("ion-touched");
}

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

async function editEmail() {
  alertButtons = [
    {
      text: "Confirm",
      role: "confirm",
      handler: () => {
        return;
      },
    },
  ];
  if (!validateEmail()) {
    alertSubHeaderRef.value = "Target email format is incorrect";
    alertHeaderRef.value = "Target email format is incorrect";
    alertSubHeaderRef.value = "Target email format is incorrect";
    return;
  } else if (!validatePassword()) {
    alertSubHeaderRef.value = "Password format is incorrect";
    alertHeaderRef.value = "Password format is incorrect";
    alertSubHeaderRef.value = "Password format is incorrect";
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