<template>
  <card class="todo-item" :class="{ 'selection-mode': selectionMode, selected }">
    <card-header class="p-0 flex items-center justify-between flex-row">
      <typo size="p" class="font-bold line-clamp-1" tag="p">{{ item.title }}</typo>
      <dropdown-menu>
        <dropdown-menu-trigger>
          <Button variant="ghost" size="icon">
            <EllipsisHorizontalIcon />
          </Button>
        </dropdown-menu-trigger>
        <dropdown-menu-content>
          <dropdown-menu-item @click.stop="emitEvent('edit')">Редактировать</dropdown-menu-item>
          <dropdown-menu-item @click.stop="emitEvent('remove')">Удалить</dropdown-menu-item>
        </dropdown-menu-content>
      </dropdown-menu>
    </card-header>
    <typo size="xs" class="line-clamp-3">
      {{ item.description }}
    </typo>
  </card>

</template>
<script setup lang="ts">
import type {TodoItem} from "@/types/todo.ts";
import { EllipsisHorizontalIcon } from "@heroicons/vue/24/solid";
import Typo from "@/components/ui/typo/index.vue";
import {Card, CardHeader} from "@/components/ui/card";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";


interface Props {
  item: TodoItem;
  selectionMode?: boolean;
  selected?: boolean;
}
interface Emits {
  (e: 'edit', item: TodoItem): unknown;
  (e: 'remove', item: TodoItem): unknown;
}

defineOptions({
  name: 'TodoItem'
});

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

function emitEvent(eventName: 'edit' | 'remove'): void {
  emit(eventName, {...props.item});
}

</script>
<style scoped>
.todo-item {
  @apply p-3;

  &:hover {
    @apply bg-secondary cursor-pointer;
  }

  &.selection-mode {
    @apply border-foreground;
  }

  &.selection-mode.selected {
    @apply border-primary;
  }

}
</style>