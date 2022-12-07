<script setup>
  import { ref } from 'vue';
  import Container from './Container.vue';
  import FormField from './FormField.vue';

  const props = defineProps({
    initial: Object,
    fieldsList: Array,
  });
  const { initial, fieldsList } = props;

  const defaultValue = {
    duration: '800ms',
    delay: '0ms',
    staggerDelay: '0ms',
    blur: '0.5px',
    angle: '0deg',
    iteration: '1',
    direction: 'normal',
    transfOrigin: 'center',
    initialScale: '1',
    finalScale: '1',
    easing: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
    maintainSpace: false,
    dimensionsTransition: true,
    overflowHidden: true,
    complete: undefined,
    start: undefined,
  };

  const form = ref({
    duration: initial?.duration ?? defaultValue.duration,
    delay: initial?.delay ?? defaultValue.delay,
    staggerDelay: initial?.staggerDelay ?? defaultValue.staggerDelay,
    blur: initial?.blur ?? defaultValue.blur,
    angle: initial?.angle ?? defaultValue.angle,
    iteration: initial?.iteration ?? defaultValue.iteration,
    direction: initial?.direction ?? defaultValue.direction,
    transfOrigin: initial?.transfOrigin ?? defaultValue.transfOrigin,
    initialScale: initial?.initialScale ?? defaultValue.initialScale,
    finalScale: initial?.finalScale ?? defaultValue.finalScale,
    easing: initial?.easing ?? defaultValue.easing,
    maintainSpace: initial?.maintainSpace ?? defaultValue.maintainSpace,
    dimensionsTransition:
      initial?.dimensionsTransition ?? initial?.maintainSpace
        ? false
        : defaultValue.dimensionsTransition,
    overflowHidden: initial?.overflowHidden ?? defaultValue.overflowHidden,
    start: initial?.start ?? defaultValue.start,
    complete: initial?.complete ?? defaultValue.complete,
  });
  const formRefFn = () => form;

  const allFields = [
    { label: 'duration' },
    { label: 'delay' },
    { label: 'staggerDelay' },
    { label: 'blur' },
    { label: 'angle' },
    { label: 'easing' },
    { label: 'maintainSpace', type: 'checkbox' },
    {
      label: 'dimensionsTransition',
      type: 'checkbox',
    },
    {
      label: 'transfOrigin',
      tagName: 'select',
      selectOptions: [
        { text: 'center', selected: true },
        { text: 'top' },
        { text: 'bottom', selected: true },
      ],
    },
    { label: 'overflowHidden', type: 'checkbox' },
    {
      label: 'iteration',
      tagName: 'select',
      selectOptions: [
        { text: '1', selected: true },
        { text: '2' },
        { text: '3' },
        { text: '4' },
        { text: '5' },
        { text: 'infinite' },
      ],
    },
    {
      label: 'direction',
      tagName: 'select',
      selectOptions: [
        { text: 'normal', selected: true },
        { text: 'reverse' },
        { text: 'alternate' },
        { text: 'alternate-reverse' },
      ],
    },
  ];

  const customFields = allFields.filter(
    field => fieldsList?.indexOf(field.label) !== -1
  );

  function setClassName(field) {
    return field.label === 'dimensionsTransition'
      ? form => (form.maintainSpace ? 'disabled' : '')
      : undefined;
  }

  function setDisabled(field) {
    return field.label === 'dimensionsTransition'
      ? form => form.maintainSpace ?? false
      : undefined;
  }
  defineEmits(['resetAnimation']);
</script>

<template>
  <Container class="form--container js-anim--collapsed">
    <div class="column">
      <div class="row">
        <FormField
          v-for="field in customFields"
          :form="formRefFn"
          :label="field.label"
          :type="field.type"
          :tag-name="field.tagName"
          :select-options="field.selectOptions ?? []"
          :class-name="setClassName(field)"
          :disabled="setDisabled(field)"
          @change-field="
            opts => $emit('resetAnimation', { ...opts, defaultValue })
          "
        />
      </div>
    </div>
  </Container>
</template>

<style scoped>
  .column {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .row {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .form--container {
    margin: 0 auto;
  }
</style>
