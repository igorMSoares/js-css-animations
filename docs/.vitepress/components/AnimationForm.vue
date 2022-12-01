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

  const allFields = [
    { label: 'duration' },
    { label: 'delay' },
    { label: 'staggerDelay' },
    { label: 'blur' },
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
          @change-field="opts => $emit('resetAnimation', opts)"
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
