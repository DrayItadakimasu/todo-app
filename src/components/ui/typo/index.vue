<template>
<component :is="tag" :class="['text', size]">
  <slot />
</component>
</template>

<script lang="ts" setup>

interface Props {
  size?: 'p' | 'sm' | 'h4' | 'xs';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'a';
}


defineOptions({
  name: 'Text'
});

withDefaults(defineProps<Props>(), {
  size: 'p',
  tag: 'p'
})
</script>

<style scoped>
.text {
  @apply text-black dark:text-white;
  &.p {
    @apply leading-7 [&:not(:first-child)]:mt-6;
  }
  &.sm {
    @apply text-sm font-medium leading-none;
  }
  &.h4 {
    @apply scroll-m-20 text-xl font-semibold tracking-tight;
  }
  &.xs {
    @apply text-xs;
  }
}
</style>