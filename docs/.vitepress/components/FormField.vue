<script setup>
  import { ref } from 'vue';

  defineEmits(['changeField']);

  const props = defineProps({
    form: Function,
    className: Function,
    label: String,
    type: String,
    eventName: String,
    tagName: String,
    selectOptions: Array,
    disabled: Function,
  });
  const {
    label = '',
    type = 'text',
    tagName = 'input',
    selectOptions = [],
    className = () => '',
    disabled = () => false,
  } = props;
  const form = typeof props.form === 'function' ? props.form() : ref({});

  function toKebabCase(label) {
    return label.replaceAll(/([A-Z])/g, '-$1').toLowerCase();
  }
</script>

<template>
  <label :for="toKebabCase(label)" :class="className(form)">
    {{ label }}:
    <input
      v-if="tagName === 'input'"
      v-model="form[label]"
      @change="$emit('changeField', form)"
      :type="type"
      :id="toKebabCase(label)"
      :name="toKebabCase(label)"
      :disabled="disabled(form)"
    />
    <select
      v-if="tagName === 'select'"
      v-model="form[label]"
      @change="$emit('changeField', form)"
      :id="toKebabCase(label)"
      :name="toKebabCase(label)"
    >
      <option
        v-for="option in selectOptions"
        :selected="option.selected ?? false"
      >
        {{ option.text }}
      </option>
    </select>
  </label>
</template>

<style scoped>
  input {
    margin: 0;
    width: 4rem;
  }

  #easing {
    width: 15.5rem;
  }

  #transf-origin {
    width: 5rem;
  }

  input[type='checkbox'] {
    inset-inline: 2px solid var(--vp-c-green-darker);
    width: 1.5rem;
  }

  input[type='checkbox']:disabled {
    border-color: var(--docsearch-hit-color);
  }

  .disabled {
    color: var(--vp-c-divider);
  }

  select,
  input {
    appearance: listbox;
    -webkit-appearance: listbox;
    text-align: center;
    border: 1px solid var(--vp-c-gray-dark-1);
    border-radius: 4px;
    padding: 0.2em 0.6em;
    margin-top: 10px;
    background-color: var(--vp-c-bg);
    transition: background-color 0.5s;
    touch-action: manipulation;
  }

  input:focus,
  select:focus,
  input:hover,
  select:hover {
    border: 1px solid var(--vp-c-green-lighter);
  }

  select option {
    text-align: left;
  }
</style>
