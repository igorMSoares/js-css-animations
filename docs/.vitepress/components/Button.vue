<script setup>
  defineProps({
    targetSelector: String,
    text: Array,
  });
</script>

<template>
  <button
    :target-selector="targetSelector"
    type="button"
    title="Click to animate"
  >
    {{ text?.at(0) }}
  </button>
</template>

<style scoped>
  button {
    font-weight: 500;
    border: 2px solid var(--vp-c-divider);
    padding: 0.25em 1em;
    border-radius: 0.5rem;
    background-color: var(--vp-c-bg-soft);
  }

  button:hover {
    border-color: var(--vp-c-brand);
  }

  button:active,
  button:focus {
    border-color: var(--vp-c-brand);
    color: var(--vp-c-brand);
  }
</style>
