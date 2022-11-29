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
      animationFn: Function,
      title: String,
      btnList: Array,
      contentList: Array,
      animOpts: Object,
      fieldsList: Array,
    },
    mounted() {
      this.animationFn();
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
    <a href="#">Customize the animation</a>
    <AnimationForm
      :initial="animOpts"
      :fields-list="$props.fieldsList"
      @resetAnimation="opts => $emit('resetAnimation', opts)"
    />
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
    margin-bottom: 1.5rem;
  }
</style>
