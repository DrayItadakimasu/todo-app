<template>
<card>
  <card-header class="flex items-center flex-row justify-between flex-wrap p-3">
    <card-title class="text-sm">
      {{ title }}
    </card-title>
    <div class="flex gap-3 flex-wrap sm:flex-nowrap">
      <Button variant="secondary" v-if="selectedTodos.length" @click="removeSelectedTodos">Удалить все выбранные</Button>
      <Button :variant="selectionMode ? 'default' :'outline'" @click="toggleSelectionMode">
        <ListBulletIcon />
      </Button>
      <Button variant="outline" @click="emit('add')">
        <PlusIcon />
        Добавить задачу
      </Button>
      <Input placeholder="Поиск" v-model="searchQuery" />
    </div>
  </card-header>
  <separator />
  <card-content class="p-0">
    <resizable-panel-group direction="horizontal">
      <template v-for="(column, columnKey) in todos" :key="column.title">
        <resizable-panel>
          <to-do-column :title="column.title">
            <draggable v-model="column.items" class="flex flex-col gap-3 min-h-[200px]" :key="generateColumnKey(column.items)">
              <template #item="{ item }">
                <todo-task-item
                  v-show="isTodoSatisfiesSearchQuery(item)"
                  :selection-mode="selectionMode"
                  :selected="isTodoSelected(item)"
                  :key="item.id"
                  :item="item"
                  @edit="emit('edit', {...item, status: columnKey})"
                  @remove="emit('remove', {...item, status: columnKey})"
                  @click="selectTodo({...item, status: columnKey})"
                />
              </template>
            </draggable>
          </to-do-column>
        </resizable-panel>
        <resizable-handle />
      </template>
    </resizable-panel-group>
  </card-content>
</card>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import type {TodoBoard, TodoItem} from "@/types/todo.ts";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import ToDoColumn from "@/components/todo/column.vue";
import {PlusIcon, ListBulletIcon } from "@heroicons/vue/24/solid";
import Draggable from "vue3-draggable";
import TodoTaskItem from "@/components/todo/item.vue";
import {Input} from "@/components/ui/input";

interface Props {
  title: string;
}
interface Emits {
  (e: 'add'): unknown;
  (e: 'remove', item: TodoItem): unknown;
  (e: 'edit', item: TodoItem): unknown;
  (e: 'remove-bunch', value: TodoItem[]): unknown;
}

defineOptions({
  name: 'ToDoBoard'
})

defineProps<Props>();
const todos = defineModel<TodoBoard>('modelValue', { required: true });


const searchQuery = ref('');

const selectionMode = ref(false);
const selectedTodos = ref<TodoItem[]>([]);

const emit = defineEmits<Emits>();

function toggleSelectionMode(): void {
  selectionMode.value  = !selectionMode.value;

  if(!selectionMode.value) {
    selectedTodos.value = [];
  }
}
function selectTodo(todo: TodoItem): void {
  if(!selectionMode.value) return;
  if(isTodoSelected(todo)) {
    selectedTodos.value = selectedTodos.value.filter((item) => item.id !== todo.id);
  } else {
    selectedTodos.value.push(todo);
  }
}
function isTodoSelected(todo: TodoItem): boolean {
  if(!selectionMode.value) return false;
  return !!selectedTodos.value.find(item => item.id === todo.id);
}
function removeSelectedTodos(): void  {
  emit('remove-bunch', selectedTodos.value);
  toggleSelectionMode();
}
function generateColumnKey(items: TodoItem[]): string {
  return JSON.stringify({ items, count: items.length })
}
function isTodoSatisfiesSearchQuery(item: TodoItem): boolean {
  return item.title.includes(searchQuery.value);
}
</script>
<style scoped>

</style>