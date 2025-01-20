<template>
  <div>
    <to-do-board title="TODO BOARD"
       v-model="todos"
       @add="addTodo"
       @edit="editTodo"
       @remove="removeTodo"
       @update:model-value="saveTodos"
       @remove-bunch="removeBunch"
    />
    <to-do-dialog ref="todoDialogRef" v-model:open="showTodoDialog" @save="handleSaveTodo" @remove="removeTodoFromDialog"/>
  </div>
</template>
<script setup lang="ts">
import ToDoBoard from "@/components/todo/board.vue";
import type {TodoDialogExpose, TodoItem} from "@/types/todo.ts";
import {watch, ref, onMounted} from "vue";
import ToDoDialog from "@/components/todo/dialog.vue";
import type {Maybe} from "@/types";

const CACHE_KEY = 'TODOS';
const todos = ref({
  notCompleted: {
    title: 'Не завершенные',
    items: []
  },
  inWork: {
    title: 'В работе',
    items: []
  },
  completed: {
    title: 'Завершенные',
    items: []
  },
})

const todoDialogRef = ref<Maybe<TodoDialogExpose>>(null);
const showTodoDialog = ref(false);

function editTodo(item: TodoItem): void {
  todoDialogRef.value?.setData(item);
  showTodoDialog.value = true;
}
function addTodo(): void {
  todoDialogRef.value?.setData();
  showTodoDialog.value = true;
}
function removeTodo(item: TodoItem): void {
  todos.value[item.status].items = todos.value[item.status].items.filter(todo => todo.id !== item.id);
}
function handleSaveTodo(item: Partial<TodoItem>): void {
  if(item.id && item.status) {
    todos.value[item.status].items = todos.value[item.status].items.map(todo => todo.id === item.id ? item : todo);
  } else {
    todos.value.notCompleted.items.push({
      ...item,
      status: 'notCompleted',
      id: Math.floor(Math.random() * 1000)
    })
  }
  showTodoDialog.value = false;
}
function saveTodos(): void {
  localStorage.setItem(CACHE_KEY, JSON.stringify(todos.value));
}
function loadTodos(): void {
  const todosCached = localStorage.getItem(CACHE_KEY);

  if(todosCached) {
    todos.value = JSON.parse(todosCached);
  }
}
function removeBunch(items: TodoItem[]): void {
  items.forEach(item => {
    removeTodo(item);
  })
}
function removeTodoFromDialog(item: TodoItem): void {
  removeTodo(item);
  showTodoDialog.value = false;
}

watch(todos, saveTodos, { deep: true });
onMounted(loadTodos)
</script>
<style scoped>

</style>