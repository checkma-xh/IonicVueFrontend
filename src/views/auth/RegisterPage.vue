<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>register</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">register</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <ion-chip>
          <ion-avatar>
            <img
              alt="Silhouette of a person's head"
              :src="photo.webPath"
              @click="takePhoto"
            />
          </ion-avatar>
          <ion-label>{{ email }}</ion-label>
        </ion-chip>
        <ion-list>
          <ion-input
            ref="emailRef"
            type="email"
            label="Email"
            label-placement="floating"
            helper-text="Enter a valid email"
            :counter="true"
            :maxlength="64"
            :minlength="4"
            v-model="email"
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
            :ionBlur="validatePassword"
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
            error-text="Passwords are inconsistent"
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
          <ion-button @click="register" id="register-alert">
            register
          </ion-button>
        </ion-list>
        <ion-alert
          trigger="register-alert"
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
  IonAlert,
} from "@ionic/vue";
import { ref } from "vue";
import router from "@/router";
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";

let alertButtons = [
  {
    text: "Confirm",
    role: "confirm",
    handler: () => {
      return;
    },
  },
];

const alertHeaderRef = ref();
const alertSubHeaderRef = ref();
const alertMessageRef = ref();
const email = ref("checkmaxh@gmail.com");
const password = ref("Wlj+=9351524");
const confirmPassword = ref("Wlj+=9351524");
const verificationCode = ref("2222");
const emailRef = ref();
const passwordRef = ref();
const confirmPasswordRef = ref();
const verificationCodeRef = ref();

// 初始化照片
const photo = ref<Photo>({
  webPath: "https://ionicframework.com/docs/img/demos/avatar.svg",
  format: "",
  saved: false,
});

// 选择照片
async function takePhoto() {
  photo.value = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera,
    quality: 100,
  });
}

function validateEmail() {
  emailRef.value.$el.classList.remove("ion-valid");
  emailRef.value.$el.classList.remove("ion-invalid");

  if (
    /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
      email.value
    )
  ) {
    emailRef.value.$el.classList.add("ion-valid");
    return true;
  } else {
    emailRef.value.$el.classList.add("ion-invalid");
    return false;
  }
}

function markTouched() {
  emailRef.value.$el.classList.add("ion-touched");
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

async function register() {
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
    alertSubHeaderRef.value = "Email format is incorrect";
    alertHeaderRef.value = "Email format is incorrect";
    alertSubHeaderRef.value = "Email format is incorrect";
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
  alertSubHeaderRef.value = "Registration success";
  alertHeaderRef.value = "Registration success";
  alertSubHeaderRef.value = "Registration success";
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
