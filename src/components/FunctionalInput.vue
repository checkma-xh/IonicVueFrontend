<template>
    <ion-input ref="inputRef" :type="inputType" :label="label" label-placement="floating" :helper-text="helperText"
        fill="outline" :required="true" @ionInput="validateInput" @ionBlur="markTouched"
        :error-text="errorText"></ion-input>
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
    const inputValue = inputRef.value.$el.value;
    const inputType = inputRef.value.$el.type;

    inputRef.value.$el.classList.remove("ion-valid", "ion-invalid");

    if (inputValue === "") return;

    let formatResult = false;
    switch (inputType) {
        case "email":
            formatResult = emailFormat(inputValue);
            break;
        case "password":
            formatResult = passwordFormat(inputValue);
            break;
        case "text":
            formatResult = codeFormat(inputValue);
            break;
        default:
            break;
    }

    inputRef.value.$el.classList.toggle("ion-valid", formatResult);
    inputRef.value.$el.classList.toggle("ion-invalid", !formatResult);
}

// 取消聚焦, 修改样式
function markTouched() {
    inputRef.value.$el.classList.add("ion-touched");
}

function setConfig(
    labelValue: string,
    helperTextValue: string,
    errorTextValue: string
) {
    label.value = labelValue;
    helperText.value = helperTextValue;
    errorText.value = errorTextValue;
}

function setInputConfig(type: string) {
    switch (type) {
        case "email":
            setConfig("email", "input email", "error format");
            break;
        case "password":
            setConfig("password", "input password", "error format");
            break;
        case "text":
            setConfig("text", "input text", "error text");
            break;
        default:
            break;
    }
}

// 初始化
onMounted(() => {
    setInputConfig(inputRef.value.$el.type);
});
</script>

<style scoped></style>
