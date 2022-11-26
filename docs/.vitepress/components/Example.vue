<script setup>
  import Container from './Container.vue';
  import Button from './Button.vue';
  import Content from './Content.vue';
</script>

<script>
  export default {
    props: {
      animationFn: Function,
      btnList: Array,
      contentList: Array,
    },
    mounted() {
      this.animationFn();
    },
  };
</script>

<template>
  <Container>
    <div class="buttons">
      <Button v-for="btn in btnList" v-bind="btn" />
      <!-- <Button :text="'Slide Up'" class="slide-up" target-selector=".p1" />
      <Button :text="'Slide Down'" class="slide-down" target-selector=".p1" />
      <Button :text="'Slide Left'" class="slide-left" target-selector=".p1" />
      <Button :text="'Slide Right'" class="slide-right" target-selector=".p1" /> -->
    </div>
    <Content
      v-for="content in contentList"
      :title="content.title"
      :class="content.class"
    >
      {{ content.text }}
    </Content>
  </Container>
</template>

<style scoped>
  .buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }
</style>
