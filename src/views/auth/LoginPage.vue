<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>login</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">login</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <ion-list>
          <ion-input
            ref="emailRef"
            type="email"
            label="Email"
            label-placement="floating"
            helper-text="Enter a valid email"
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
            error-text="Password can only contain numbers, letters, and special symbols"
          ></ion-input>

          <ion-button @click="login" id="login-alert"> login </ion-button>
        </ion-list>
        <ion-alert
          trigger="login-alert"
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
import router from "@/router";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonList,
  IonButton,
} from "@ionic/vue";
import { ref } from "vue";

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
const email = ref("checkma_xh@outlook.com");
const password = ref("Wlj+=9351524");
const emailRef = ref();
const passwordRef = ref();

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

async function login() {
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
  }
  alertSubHeaderRef.value = "Login success";
  alertHeaderRef.value = "Login success";
  alertSubHeaderRef.value = "Login success";
  alertButtons = [
    {
      text: "Confirm",
      role: "confirm",
      handler: () => {
        router.push({ name: "PlansManagement" });
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
