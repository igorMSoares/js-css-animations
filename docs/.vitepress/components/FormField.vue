<script setup>
  import { reactive, ref, toRefs } from 'vue';

  defineEmits(['changeField']);

  const props = defineProps({
    form: Function,
    initial: Object,
    className: Function,
    label: String,
    type: String,
    eventName: String,
  });
  const { label = '', type = 'text', initial } = props;
  const form = typeof props.form === 'function' ? props.form() : ref({});

  function toKebabCase(label) {
    return label.replaceAll(/([A-Z])/g, '-$1').toLowerCase();
  }
</script>

<template>
  <label
    :for="toKebabCase(label)"
    :class="
      label === 'dimensionsTransition'
        ? form.maintainSpace
          ? 'disabled'
          : ''
        : ''
    "
  >
    {{ label }}:
    <input
      v-model="form[label]"
      @change="$emit('changeField', form)"
      :type="type"
      :id="toKebabCase(label)"
      :name="toKebabCase(label)"
      :disabled="label === 'dimensionsTransition' ? form.maintainSpace : false"
    />
  </label>
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

  #transf-origin {
    width: 5rem;
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
</style>
