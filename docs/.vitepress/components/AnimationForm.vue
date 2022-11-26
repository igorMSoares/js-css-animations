<script setup>
  import { ref } from 'vue';
  import Container from './Container.vue';

  const form = ref({
    duration: '800ms',
    delay: '0s',
    staggerDelay: '0s',
    easing: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
    maintainSpace: false,
    dimensionsTransition: true,
  });

  defineEmits(['changeDuration', 'changeDelay', 'changeStaggerDelay']);
</script>

<template>
  <Container>
    <div class="column">
      <div class="row">
        <label for="duration">
          duration:
          <input
            v-model="form.duration"
            @change="$emit('changeDuration', form.duration)"
            type="text"
            id="duration"
            name="duration"
          />
        </label>
        <label for="delay">
          delay:
          <input
            v-model="form.delay"
            @change="$emit('changeDelay', form.delay)"
            type="text"
            id="delay"
            name="delay"
          />
        </label>
        <label for="staggerDelay">
          staggerDelay:
          <input
            v-model="form.staggerDelay"
            @change="$emit('changeStaggerDelay', form.staggerDelay)"
            type="text"
            id="staggerDelay"
            name="staggerDelay"
          />
        </label>
        <label for="easing">
          easing:
          <input v-model="form.easing" type="text" id="easing" name="easing" />
        </label>
      </div>
      <div class="row">
        <label for="maintain-space">
          maintainSpace:
          <input
            v-model="form.maintainSpace"
            type="checkbox"
            id="maintain-space"
            name="maintain-space"
          />
        </label>
        <label for="dimensions-transition">
          dimensionsTransition:
          <input
            v-model="form.dimensionsTransition"
            type="checkbox"
            id="dimensions-transition"
            name="dimensions-transition"
          />
        </label>
      </div>
    </div>
  </Container>
</template>

<style scoped>
  input {
    border: 1px solid var(--vp-badge-info-border);
    margin: 0;
    width: 3rem;
  }

  #easing {
    width: 10rem;
  }

  input[type='checkbox'] {
    width: 1.5rem;
  }

  .column {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .row {
    display: flex;
    align-items: flex-end;
    gap: 1rem;
  }
</style>
