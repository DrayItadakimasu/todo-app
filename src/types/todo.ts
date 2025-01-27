export type TodoItem  = {
    id: number;
    title: string;
    description: string;
    status: TodoStatus;
}
export type RawTodoItem = {
    id?: TodoItem['id'];
    title: TodoItem['title'];
    description: TodoItem['description'];
    status?: TodoItem['status']
}

export type TodoList = TodoItem[];
export type TodoStatus = 'completed' | 'notCompleted' | 'inWork';
export type TodoColumn = {
    title: string;
    items: TodoList
}
export type TodoBoard = Record<TodoStatus, TodoColumn>;


export type TodoDialogExpose = {
    setData: (item?: TodoItem) => void
}