<script setup>
  import Container from './Container.vue';
  import Button from './Button.vue';
  import Content from './Content.vue';
  import AnimationForm from './AnimationForm.vue';

  defineEmits(['resetAnimation']);
</script>

<script>
  export default {
    props: {
      animationApi: Function,
      animationFn: Function,
      animationName: String,
      title: String,
      btnList: Array,
      contentList: Array,
      animOpts: Object,
      fieldsList: Array,
    },
    mounted() {
      const jsCssAnimations = this.animationApi();
      this.animationFn();
      jsCssAnimations.init.fade({
        trigger: `.customize--anchor__${this.animationName}`,
        targetSelector: `.customize--form__${this.animationName}`,
      });
    },
    methods: {
      titleId() {
        return this.title
          .toLowerCase()
          .replaceAll(/[\W_]/g, '-')
          .replace('---', '-');
      },
    },
  };
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
        @resetAnimation="opts => $emit('resetAnimation', opts)"
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
