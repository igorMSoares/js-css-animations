<script setup>
  defineProps({
    title: String,
    class: String,
  });
</script>

<template>
  <section class="wrapper">
    <h3 class="title">{{ title }}</h3>

    <p :class="class">
      <slot />
    </p>
  </section>
</template>

<style scoped>
  .wrapper {
    border: 1px solid var(--vp-c-brand);
    border-radius: 0.5rem;
    margin-top: 1rem;
    text-align: center;
    padding: 1rem;
  }

  .title {
    margin-top: 0;
  }
</style>
