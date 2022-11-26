<script setup>
  defineProps({
    title: String,
    text: String,
    class: String,
  });
</script>

<template>
  <section>
    <div class="wrapper" :class="class">
      <h3 v-if="title !== ''" class="title">{{ title }}</h3>
      <p>{{ text }}</p>
    </div>
  </section>
</template>

<style scoped>
  .wrapper {
    text-align: center;
  }
</style>
