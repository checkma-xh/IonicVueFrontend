<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>register</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">register</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <ion-list>
          <ion-chip>
            <ion-avatar>
              <img
                alt="Silhouette of a person's head"
                :src="avatarWebPath"
                @click="takeAvatar"
              />
            </ion-avatar>
            <ion-label>{{ email }}</ion-label>
          </ion-chip>
          <functional-input
            inputType="email"
            v-model="email"
          ></functional-input>
          <functional-input
            inputType="password"
            v-model="password"
          ></functional-input>
          <functional-input
            inputType="password"
            v-model="confirmPassword"
          ></functional-input>
          <ion-button @click="register" id="register-alert">
            register
          </ion-button>
          <ion-alert
            trigger="register-alert"
            :header="alertHeader"
            :sub-header="alertSubHeader"
            :message="alertMessage"
            :buttons="alertButtons"
          ></ion-alert>
        </ion-list>
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
  IonList,
  IonChip,
  IonAvatar,
  IonAlert,
} from "@ionic/vue";
import FunctionalInput from "@/components/FunctionalInput.vue";
import {
  takePhoto,
  savePhoto,
  AVATAR_FILENAME,
  loadPhoto,
} from "@/utils/usePhotoGallery";
import { ref } from "vue";
import { emailFormat, passwordFormat } from "@/utils/useTextFormat";
import router from "@/router";
import { useUserStore } from "@/store/userStore";
import { personCircleOutline } from "ionicons/icons";

const userStore = useUserStore();
const currentUser = userStore.currentUser;
const avatarWebPath = ref(personCircleOutline);
const avatar = ref();
const email = ref("checkma_xh@outlook.com");
const password = ref("Wlj+=9351524");
const confirmPassword = ref("Wlj+=9351524");
const alertHeader = ref("wrong format");
const alertSubHeader = ref("wrong format");
const alertMessage = ref("wrong format");

let alertButtons = [
  {
    text: "confirm",
    role: "confirm",
    handler: () => {
      return;
    },
  },
];

async function takeAvatar() {
  avatar.value = await takePhoto();
  if (avatar.value) {
    avatarWebPath.value = avatar.value.webPath!;
  }
}

async function register() {
  if (
    !emailFormat(email.value) ||
    !passwordFormat(password.value) ||
    password.value != confirmPassword.value
  ) {
    alertSubHeader.value = "wrong format";
    alertHeader.value = "wrong format";
    alertMessage.value = "wrong format";
    alertButtons = [
      {
        text: "confirm",
        role: "confirm",
        handler: () => {
          return;
        },
      },
    ];
    return;
  }
  alertSubHeader.value = "success";
  alertHeader.value = "success";
  alertMessage.value = "success";
  alertButtons = [
    {
      text: "confirm",
      role: "confirm",
      handler: () => {
        router.push({ name: "Login" });
      },
    },
  ];
  await savePhoto(avatar.value, AVATAR_FILENAME);
  avatar.value = await loadPhoto(AVATAR_FILENAME);
  if (avatar.value) {
    currentUser.avatarUrl = `data:image/jpeg;base64,${avatar.value.data}`;
  }
}
</script>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 1%;
  margin-right: 1%;
}

#container ion-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#container ion-input {
  margin-top: 1%;
}

#container ion-button {
  margin-top: 1%;
  width: 100%;
}

#container ion-chip {
  margin-top: 1%;
  margin-bottom: 0%;
}
</style>
