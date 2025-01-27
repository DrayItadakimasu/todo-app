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
import type {RawTodoItem, TodoBoard, TodoDialogExpose, TodoItem, TodoStatus} from "@/types/todo.ts";
import {watch, ref, onMounted} from "vue";
import ToDoDialog from "@/components/todo/dialog.vue";
import type {Maybe} from "@/types";

const CACHE_KEY = 'TODOS';
const todos = ref<TodoBoard>({
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
  const key: TodoStatus = item.status;
  todos.value[key].items = todos.value[key].items.filter(todo => todo.id !== item.id);
}
function handleSaveTodo(item: RawTodoItem): void {
  if(item.id && item.status) {
    todos.value[item.status].items = todos.value[item.status].items.map(todo => todo.id === item.id ? item as TodoItem : todo);
  } else {
    const newTodo: TodoItem = {
      title: item.title,
      description: item.description,
      status: 'notCompleted',
      id: Math.floor(Math.random() * 1000)
    };
    todos.value.notCompleted.items.push(newTodo);
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
function removeTodoFromDialog(item: Partial<TodoItem>): void {
  removeTodo(item as TodoItem);
  showTodoDialog.value = false;
}

watch(todos, saveTodos, { deep: true });
onMounted(loadTodos)
</script>
<style scoped>

</style>