<template>
  <article class="container">
    <slot />
  </article>
</template>

<style scoped>
  .container {
    border: 1px solid var(--vp-c-brand);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1.5rem auto 3rem auto;
    min-width: 350px;
  }
</style>
