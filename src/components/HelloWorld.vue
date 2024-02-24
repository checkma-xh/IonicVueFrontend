<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  },
  author: String,
  array: {
    type: Array,
    default() {
      return ['ysl - 13411100392', 'mjs - 13411112269', 'mxh - 19534887968']
    }
  }
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
    </h3>
    <ul>
      <li v-for="(val, index) of array" :key="index" v-text="val"></li>
    </ul>
    <p>{{ author }}</p>
    <footer>
    <slot name="footer">default</slot>
  </footer>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
