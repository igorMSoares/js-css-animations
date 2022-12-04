<script setup>
  import Container from './Container.vue';
  import Button from './Button.vue';
  import Content from './Content.vue';
  import AnimationForm from './AnimationForm.vue';
  import CodeSnippet from './CodeSnippet.vue';
  import { onMounted, ref } from 'vue';

  const props = defineProps({
    animationApi: Function,
    animationFn: Function,
    animationName: String,
    title: String,
    btnList: Array,
    contentList: Array,
    animOpts: Object,
    fieldsList: Array,
    codeSnippet: Array,
  });

  const codeSnippetRef = ref(props.codeSnippet?.at(0));
  const codeSnippetKey = ref(`${props.animationName}-0`);

  onMounted(() => {
    const jsCssAnimations =
      typeof props.animationApi === 'function' ? props.animationApi() : {};
    if (typeof props.animationFn === 'function') props.animationFn();
    jsCssAnimations.init.fade({
      trigger: `.customize--anchor__${props.animationName}`,
      targetSelector: `.customize--form__${props.animationName}`,
    });
  });

  function titleId() {
    return props.title
      ?.toLowerCase()
      .replaceAll(/[\W_]/g, '-')
      .replace('---', '-');
  }

  function updateSnippet({ opts, fieldLabel, defaultValue }) {
    const reloadSnippet = () => {
      const keyId = +(codeSnippetKey.value.match(/(\d+)$/g)?.at(0) ?? '0') + 1;
      codeSnippetKey.value = codeSnippetKey.value.replace(/\d+$/, `${keyId}`);
    };

    if (opts[fieldLabel] !== '') {
      const newValue =
        ['duration', 'delay', 'staggerDelay'].includes(fieldLabel) &&
        opts[fieldLabel].match(/^(\d+|\d+\.\d+)$/)
          ? `${opts[fieldLabel]}ms`
          : opts[fieldLabel];

      if (defaultValue[fieldLabel] !== newValue) {
        const newField =
          `  ${fieldLabel}: ` +
          (typeof opts[fieldLabel] === 'boolean' ||
          opts[fieldLabel].match(/^(\d+|\d+\.\d+)$/)
            ? opts[fieldLabel]
            : `'${opts[fieldLabel]}'`) +
          ',\n';

        let newSnippet = '';
        let match = false;
        for (const str of codeSnippetRef.value.code.split(/\n/)) {
          if (str.match(fieldLabel)) {
            newSnippet += newField;
            match = true;
          } else {
            if (!match && str === '});') {
              newSnippet += newField;
            }
            newSnippet += `${str}\n`;
          }
        }
        codeSnippetRef.value.code = newSnippet;
        reloadSnippet();
      } else {
        codeSnippetRef.value.code = codeSnippetRef.value.code.replaceAll(
          new RegExp(`\n.+${fieldLabel}:.+\n`, 'g'),
          '\n'
        );
        reloadSnippet();
      }

      if (fieldLabel === 'maintainSpace') {
        if (opts[fieldLabel] === false) {
          updateSnippet({
            opts: { dimensionsTransition: false },
            fieldLabel: 'dimensionsTransition',
            defaultValue,
          });
        } else if (
          codeSnippetRef.value.code.match('dimensionsTransition: false')
        ) {
          updateSnippet({
            opts: { dimensionsTransition: true },
            fieldLabel: 'dimensionsTransition',
            defaultValue,
          });
        }
      }
    } else if (codeSnippetRef.value.code.match(fieldLabel)) {
      updateSnippet({
        opts: { [fieldLabel]: defaultValue[fieldLabel] },
        fieldLabel,
        defaultValue,
      });
    }
  }

  defineEmits(['resetAnimation']);
</script>

<template>
  <Container>
    <h3 :id="titleId()" class="title">{{ title }}</h3>
    <a
      href="#"
      class="customize--anchor"
      :class="`customize--anchor__${animationName}`"
      >Customize this animation</a
    >
    <div>
      <AnimationForm
        :class="`customize--form__${animationName}`"
        :initial="animOpts"
        :fields-list="$props.fieldsList"
        @resetAnimation="
          opts => {
            updateSnippet(opts);
            return $emit('resetAnimation', opts);
          }
        "
      />
    </div>
    <div class="buttons">
      <Button v-for="btn in btnList" v-bind="btn" />
    </div>

    <Content
      v-for="content in contentList"
      :title="content.title"
      :text="content.text"
      :class="content.class"
    />

    <section>
      <CodeSnippet
        v-if="codeSnippet"
        v-for="(snippet, i) in codeSnippet"
        :key="codeSnippetKey"
        :snippet-id="`code-snippet__${animationName}-${i}`"
        :code="codeSnippetRef.code"
        :highlight="snippet.highlight"
        :langs="snippet.langs"
        :lang="snippet.lang"
      />
      <slot />
    </section>
  </Container>
</template>

<style scoped>
  .buttons {
    padding: 1rem 0;
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .title {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  .customize--anchor {
    display: flex;
    justify-content: right;
  }
</style>
