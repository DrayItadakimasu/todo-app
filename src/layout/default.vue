<template>
  <div class="bg-background min-h-screen dark p-4">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
  defineOptions({
    name: 'DefaultLayout',
  });
</script>
<style scoped>

</style>