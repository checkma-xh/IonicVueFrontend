<template>
  <ion-input
    ref="inputRef"
    :type="inputType"
    :label="label"
    label-placement="floating"
    :helper-text="helperText"
    fill="outline"
    :required="true"
    @ionInput="validateInput"
    @ionBlur="markTouched"
    :error-text="errorText"
  ></ion-input>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { IonInput } from "@ionic/vue";
import { emailFormat, passwordFormat, codeFormat } from "@/utils/useTextFormat";

const inputRef = ref();
const label = ref();
const helperText = ref();
const errorText = ref();
const inputType = defineModel("inputType", {
  type: String,
  required: true,
});

// 输入时验证格式, 修改样式
function validateInput() {
  inputRef.value.$el.classList.remove("ion-valid");
  inputRef.value.$el.classList.remove("ion-invalid");

  if (inputRef.value.$el.value == "") {
    return;
  }

  let formatResult = false;
  switch (inputRef.value.$el.type) {
    case "email":
      formatResult = emailFormat(inputRef.value.$el.value);
      break;
    case "password":
      formatResult = passwordFormat(inputRef.value.$el.value);
      break;
    case "text":
      formatResult = codeFormat(inputRef.value.$el.value);
      break;
    default:
      break;
  }
  if (formatResult) {
    inputRef.value.$el.classList.add("ion-valid");
  } else {
    inputRef.value.$el.classList.add("ion-invalid");
  }
}

// 取消聚焦, 修改样式
function markTouched() {
  inputRef.value.$el.classList.add("ion-touched");
}

// 初始化
onMounted(() => {
  switch (inputRef.value.$el.type) {
    case "email":
      inputRef.value.$el.type = "email";
      label.value = "email";
      helperText.value = "input email";
      errorText.value = "error format";
      break;
    case "password":
      inputRef.value.$el.type = "password";
      label.value = "password";
      helperText.value = "input password";
      errorText.value = "error format";
      break;
    case "text":
      inputRef.value.$el.type = "text";
      label.value = "text";
      helperText.value = "input text";
      errorText.value = "error text";
      break;
    default:
      break;
  }
});
</script>

<style scoped></style>
