<script setup>
  import { ref } from 'vue';
  import { setDimensionsTransitions } from '../../../js-css-animations/transitions';
  import Container from './Container.vue';

  const props = defineProps({
    initial: Object,
  });

  const form = ref({
    duration: props.initial?.duration ?? '800ms',
    delay: props.initial?.delay ?? '0ms',
    staggerDelay: props.initial?.staggerDelay ?? '0ms',
    easing:
      props.initial?.timingFunction ??
      'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
    maintainSpace: props.initial?.keepSpace ?? false,
    dimensionsTransition: props.initial?.dimensionsTransition ?? true,
    complete: props.initial?.complete ?? undefined,
  });

  defineEmits(['resetAnimation']);
</script>

<template>
  <Container class="form--container">
    <div class="column">
      <div class="row">
        <label for="duration">
          duration:
          <input
            v-model="form.duration"
            @change="$emit('resetAnimation', form)"
            type="text"
            id="duration"
            name="duration"
          />
        </label>
        <label for="delay">
          delay:
          <input
            v-model="form.delay"
            @change="$emit('resetAnimation', form)"
            type="text"
            id="delay"
            name="delay"
          />
        </label>
        <label for="staggerDelay">
          staggerDelay:
          <input
            v-model="form.staggerDelay"
            @change="$emit('resetAnimation', form)"
            type="text"
            id="staggerDelay"
            name="staggerDelay"
          />
        </label>
        <label for="maintain-space">
          maintainSpace:
          <input
            v-model="form.maintainSpace"
            @change="$emit('resetAnimation', form)"
            type="checkbox"
            id="maintain-space"
            name="maintain-space"
          />
        </label>
      </div>
      <div class="row">
        <label for="easing">
          easing:
          <input
            v-model="form.easing"
            @change="$emit('resetAnimation', form)"
            type="text"
            id="easing"
            name="easing"
          />
        </label>
        <label
          for="dimensions-transition"
          :class="form.maintainSpace ? 'disabled' : ''"
        >
          dimensionsTransition:
          <input
            v-model.lazy="form.dimensionsTransition"
            @change="$emit('resetAnimation', form)"
            type="checkbox"
            id="dimensions-transition"
            name="dimensions-transition"
            :disabled="form.maintainSpace"
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
    width: 15rem;
  }

  input[type='checkbox'] {
    width: 1.5rem;
  }

  input[type='checkbox']:disabled {
    border-color: var(--docsearch-muted-color);
  }

  .disabled {
    color: var(--vp-c-divider);
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

  .form--container {
    margin: 0 auto;
  }
</style>
