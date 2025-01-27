<template>
<Button variant="secondary" @click="setTheme(theme === 'dark' ? 'light' : 'dark')">
  <moon-icon v-if="theme === 'dark'"/>
  <sun-icon  v-if="theme === 'light'"/>
</Button>
</template>
<script setup lang="ts">
import {Button} from "@/components/ui/button";
import {MoonIcon, SunIcon} from "@heroicons/vue/24/solid";
import {useTheme} from "@/composables/useTheme";


const { theme, setTheme } = useTheme();
</script>
<style scoped>

</style>