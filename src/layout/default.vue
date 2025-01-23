<template>
  <div class="bg-background min-h-screen p-4">
    <div class="mb-3 flex items-center justify-end">
      <theme-toggle-btn/>
    </div>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
  import ThemeToggleBtn from "@/components/themeToggleBtn.vue";

  defineOptions({
    name: 'DefaultLayout',
  });
</script>
<style scoped>

</style>