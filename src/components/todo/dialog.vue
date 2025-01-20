<template>
  <dialog-root>
    <dialog>
      <dialog-content>
        <dialog-header>
          <dialog-title>{{ todo.id ? 'Редактировать задачу' : 'Добавить задачу' }}</dialog-title>
          <dialog-description />
        </dialog-header>
        <div class="flex flex-col gap-3">
          <div>
            <Label for="title">Заголовок</Label>
            <Input id="title" v-model="todo.title" />
          </div>
          <div>
            <Label for="description">Описание</Label>
            <Textarea id="description" v-model="todo.description" rows="12" />
          </div>
        </div>
        <dialog-footer>
          <Button @click="emit('remove', todo)" v-if="todo.id" variant="secondary">Удалить</Button>
          <Button @click="save">{{ todo.id ? 'Сохранить' : 'Добавить' }}</Button>
        </dialog-footer>
      </dialog-content>
    </dialog>
  </dialog-root>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import type {TodoDialogExpose, TodoItem} from "@/types/todo.ts";
import {DialogRoot} from "radix-vue";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";


interface Emits {
  (e: 'save', item: Partial<TodoItem>): unknown;
  (e: 'remove', item: Partial<TodoItem>): unknown;
}

defineOptions({
  name: 'ToDoDialog'
});


const todo = ref(todoPrototype());

const emit = defineEmits<Emits>();

function setData(data?: TodoItem): void {
  if(data) {
    todo.value = data;
  } else {
    todo.value = todoPrototype();
  }
}
function todoPrototype(): Partial<TodoItem> {
  return {
    title: '',
    description: '',
    priority: 0,
  }
}
function save(): void {
 emit('save', todo.value);
}

defineExpose<TodoDialogExpose>({
  setData
});
</script>
<style scoped>

</style>