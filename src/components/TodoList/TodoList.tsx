import { useState } from "react";
import { observer } from "mobx-react-lite";
import todos from "../../store/todos";
import styles from "./TodoList.module.scss";
import TodoItem from "../TodoItem/TodoItem";
import AddButton from "../UI/AddButton/AddButton";
import NewTodoForm from "../NewTodoForm/NewTodoForm";

const TodoList = observer(() => {
  const [showNewTodoForm, setShowNewTodoForm] = useState(false);

  return (
    <div className={styles.todoList}>
      <span className={styles.todoList__completed}>
        {todos.completedTodosLength}/{todos.todos.length} завершено
      </span>
      {todos.todos.length > 0 - todos.completedTodosLength ? (
        todos.todos.map(
          (todo) =>
            !todo.completed && (
              <TodoItem
                key={todo.id}
                id={todo.id}
                completed={todo.completed}
                title={todo.title}
                description={todo.description}
                created={todo.created}
              />
            )
        )
      ) : (
        <h1 className={styles["todoList__empty-message"]}>
          На этот день задачи отсутствуют...
        </h1>
      )}

      {todos.completedTodosLength > 0 && (
        <h1 className={styles.todoList__title}>Завершенные задачи</h1>
      )}

      {todos.completedTodosLength > 0 &&
        todos.todos.map(
          (todo) =>
            todo.completed && (
              <TodoItem
                key={todo.id}
                id={todo.id}
                completed={todo.completed}
                title={todo.title}
                description={todo.description}
                created={todo.created}
              />
            )
        )}
      {!showNewTodoForm ? (
        <AddButton
          clickAddButtonHandler={(e) => {
            e.preventDefault();
            setShowNewTodoForm((current) => !current);
          }}
        />
      ) : (
        <NewTodoForm
          id={undefined}
          clickCancelButtonHandler={() =>
            setShowNewTodoForm((current) => !current)
          }
          setShowForm={undefined}
        />
      )}
    </div>
  );
});

export default TodoList;
