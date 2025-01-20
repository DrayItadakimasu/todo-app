import type {TodoItem, TodoList} from "@/types/todo.ts";
import { ref, onMounted } from 'vue';

type UseTodosProps = {
    cacheKey?: string;
}

export function useTodos(props: UseTodosProps) {

    const items = ref<TodoList>([]);


    const addTodo = (todoItem: TodoItem) => {
        items.push(todoItem);
    };
    const updateTodo = (todoItem: TodoItem, todoId: TodoItem['id']) => {
        items.value = items.value.map(item => item.id === todoId ? todoItem : item);
    }
    const removeTodo = (todoId: TodoItem['id']) => {
        items.value = items.value.filter(item => item.id !== todoId);
    }
    const saveTodos = () => {
        if(!props.cacheKey) return;

        localStorage.setItem(props.cacheKey, JSON.stringify(items));
    }
    const getTodos = () => {
        if(!props.cacheKey) return;

        const storageItems = localStorage.getItem(props.cacheKey);

        if(!storageItems) return;

        items.value = JSON.parse(storageItems);
    }


    onMounted(() => {
        for(let i = 0; i < 20; i++) {
            items.value.push({
                id: i,
                title: 'title' + i + 1,
                description: 'description' + i + 1,
                ordering: i
            })
        }
    })

    return {
        items,
        addTodo,
        updateTodo,
        removeTodo,
        saveTodos,
        getTodos
    }
}