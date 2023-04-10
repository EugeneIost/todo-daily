import { makeAutoObservable } from "mobx";
import { Todo } from "../types/Todo";
import api from "../api";

class Todos {
  todos: Todo[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get completedTodosLength() {
    return this.todos.filter((todo) => todo.completed === true).length;
  }

  async removeTodo(id: Todo["id"]) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    await api.delete(`todos/${id}.json`);
  }

  async todoToggle(id: Todo["id"]) {
    const toggableTodoIndex = this.todos.findIndex((todo) => todo.id === id);
    if (typeof toggableTodoIndex === "number") {
      let toggableTodo = this.todos[toggableTodoIndex];
      toggableTodo = {
        ...toggableTodo,
        completed: !toggableTodo.completed,
      };
      this.todos[toggableTodoIndex] = toggableTodo;

      await api.patch(`todos/${toggableTodo.id}.json`, {
        completed: toggableTodo.completed,
      });
    }
  }

  selectTodoById(id: Todo["id"]) {
    return this.todos.find((todo) => todo.id === id);
  }

  async editTodoById(
    id: Todo["id"],
    title: Todo["title"],
    description: Todo["description"]
  ) {
    const foundTodoIndex = this.todos.findIndex((todo) => todo.id === id);

    if (typeof foundTodoIndex === "number") {
      this.todos[foundTodoIndex] = {
        ...this.todos[foundTodoIndex],
        title,
        description,
      };

      await api.patch(`todos/${id}.json`, {
        title,
        description,
      });
    }
  }

  async fetchTodos(abortController: AbortController) {
    if (this.todos.length !== 0) return;
    const response = await api.get("todos.json", {
      signal: abortController.signal,
    });
    const data = response.data;
    for (const key in data) {
      this.todos.push({
        id: key,
        completed: data[key].completed,
        created: data[key].created,
        description: data[key].description,
        title: data[key].title,
      });
    }
  }

  async postNewTodo(newTodo: Todo) {
    const response = await api.post(
      "todos.json",
      {
        title: newTodo.title,
        description: newTodo.description,
        completed: newTodo.completed,
        created: newTodo.created,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const newId: string = response.data.name;
    this.todos.push({ ...newTodo, id: newId });
  }
}

const todos = new Todos();

export default todos;
