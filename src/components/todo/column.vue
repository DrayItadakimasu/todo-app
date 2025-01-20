<template>
<div>
  <typo class="w-max mx-auto py-3 px-3 font-bold" size="h4">{{ title }}</typo>
  <div class="p-3">
    <slot></slot>
  </div>
</div>
</template>
<script setup lang="ts">
import Typo from "@/components/ui/typo/index.vue";

interface Props {
  title: string;
}

defineOptions({
  name: 'ToDoColumn'
});

defineProps<Props>();
</script>
<style scoped>

</style>