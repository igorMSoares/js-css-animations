<script setup>
  import { ref } from 'vue';
  import Container from './Container.vue';
  import FormField from './FormField.vue';

  const props = defineProps({
    initial: Object,
    fieldsList: Array,
  });
  const { initial, fieldsList } = props;

  const form = ref({
    duration: initial?.duration ?? '800ms',
    delay: initial?.delay ?? '0ms',
    staggerDelay: initial?.staggerDelay ?? '0ms',
    blur: initial?.blur ?? '0.5px',
    angle: initial?.angle ?? '0deg',
    iteration: initial?.iteration ?? '1',
    direction: initial?.direction ?? 'normal',
    transfOrigin: initial?.transfOrigin ?? 'center',
    initialScale: initial?.initialScale ?? '1',
    finalScale: initial?.finalScale ?? '1',
    easing:
      initial?.timingFunction ?? 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
    maintainSpace: initial?.keepSpace ?? false,
    dimensionsTransition: initial?.dimensionsTransition ?? true,
    overflowHidden: initial?.overflowHidden ?? true,
    complete: initial?.complete ?? undefined,
    start: initial?.start ?? undefined,
  });
  const formRefFn = () => form;

  const firstRow = [
    { label: 'duration' },
    { label: 'delay' },
    { label: 'staggerDelay' },
    { label: 'blur' },
    { label: 'maintainSpace', type: 'checkbox' },
    { label: 'transfOrigin' },
  ];
  const secondRow = [
    { label: 'easing' },
    {
      label: 'dimensionsTransition',
      type: 'checkbox',
    },
    { label: 'overflowHidden', type: 'checkbox' },
    { label: 'iteration' },
    { label: 'direction' },
  ];
  const rowsList = [
    firstRow.filter(field => fieldsList?.indexOf(field.label) !== -1),
    secondRow.filter(field => fieldsList?.indexOf(field.label) !== -1),
  ];

  defineEmits(['resetAnimation']);
</script>

<template>
  <Container class="form--container">
    <div class="column">
      <div v-for="row in rowsList" class="row">
        <FormField
          v-for="field in row"
          :form="formRefFn"
          :label="field.label"
          :type="field.type"
          @change-field="opts => $emit('resetAnimation', opts)"
        />
      </div>
    </div>
  </Container>
</template>

<style>
  .column {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .row {
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .form--container {
    margin: 0 auto;
  }
</style>
