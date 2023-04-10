import React, { useState, useEffect } from "react";
import styles from "./NewTodoForm.module.scss";
import cn from "classnames";
import todos from "../../store/todos";
import { Todo } from "../../types/Todo";

interface NewTodoFormProps {
  id: Todo["id"] | undefined;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  clickCancelButtonHandler: React.MouseEventHandler<HTMLButtonElement>;
}

const NewTodoForm = ({
  id,
  clickCancelButtonHandler,
  setShowForm,
}: NewTodoFormProps) => {
  const [titleInput, setTitleInput] = useState("");
  const [descrInput, setDescrInput] = useState("");
  const [isInputError, setIsInputError] = useState(false);

  useEffect(() => {
    if (id !== undefined) {
      const currentTodo = todos.selectTodoById(id);
      if (currentTodo !== undefined) {
        setTitleInput(currentTodo?.title);
        if (currentTodo.description.length !== 0) {
          setDescrInput(currentTodo.description);
        }
      }
    }
  }, [id]);

  const changeTitleInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (titleInput.trim() !== "") {
      setIsInputError(false);
    }
    setTitleInput(e.target.value);
  };

  const changeDescrInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescrInput(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (titleInput.trim() === "") {
      setIsInputError(true);
    } else if (id !== undefined) {
      todos.editTodoById(id, titleInput, descrInput);
      if (typeof setShowForm !== "undefined") {
        setShowForm(false);
      }
    } else {
      const date = new Date();
      const newTodo: Todo = {
        id: "",
        created: date,
        completed: false,
        description: descrInput,
        title: titleInput,
      };
      todos.postNewTodo(newTodo);
    }

    setDescrInput("");
    setTitleInput("");
  };

  return (
    <form className={styles.newTodoForm} onSubmit={submitHandler}>
      {isInputError && (
        <h1 className={styles.newTodoForm__error}>
          Поле "Название" не должно быть пустым!
        </h1>
      )}
      <div className={styles["newTodoForm__inputs-container"]}>
        <input
          type="text"
          placeholder="Название задачи"
          className={cn(styles["newTodoForm__title-input"], {
            [styles["newTodoForm__title-input_error"]]: isInputError,
          })}
          value={titleInput}
          onChange={changeTitleInputHandler}
        />
        <input
          type="text"
          placeholder="Описание*"
          className={styles["newTodoForm__descr-input"]}
          value={descrInput}
          onChange={changeDescrInputHandler}
        />
      </div>
      <div className={styles.newTodoForm__buttons}>
        <button
          type="submit"
          className={cn(styles.newTodoForm__button, styles.newTodoForm__add)}
        >
          Добавить
        </button>
        <button
          type="button"
          className={cn(styles.newTodoForm__button, styles.newTodoForm__cancel)}
          onClick={clickCancelButtonHandler}
        >
          Отмена
        </button>
      </div>
    </form>
  );
};

export default NewTodoForm;
