import { observer } from "mobx-react-lite";
import { useState } from "react";
import styles from "./TodoItem.module.scss";
import { Todo } from "../../types/Todo";
import todos from "../../store/todos";
import editIcon from "../../assets/icons/edit-icon.png";
import moreIcon from "../../assets/icons/more-icon.png";
import DeleteButton from "../UI/DeleteButton/DeleteButton";
import cn from "classnames";
import NewTodoForm from "../NewTodoForm/NewTodoForm";

interface TodoItemProps extends Todo {}

const TodoItem = observer(
  ({ id, title, completed, description }: TodoItemProps) => {
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    return (
      <>
        <div
          className={cn(styles.todoItem, {
            [styles["todoItem_display-none"]]: showEditForm,
          })}
        >
          <div className={styles["todoItem__checkbox-container"]}>
            <input
              type="checkbox"
              id={`checkbox+${id}`}
              checked={completed}
              className={styles.todoItem__checkbox}
              onChange={() => todos.todoToggle(id)}
            />
            <label htmlFor={`checkbox+${id}`}></label>
          </div>
          <div className={styles["todoItem__main-container"]}>
            <div className={styles["todoItem__text-container"]}>
              <h2 className={styles["todoItem__title"]}>{title}</h2>
              <p className={styles["todoItem__descr"]}>{description}</p>
            </div>

            <div className={styles["todoItem__options"]}>
              <img
                src={editIcon}
                alt="edit-icon"
                className={styles["todoItem__option-icon"]}
                onClick={() => {
                  setShowEditForm((current) => !current);
                }}
              />
              <img
                src={moreIcon}
                alt="more-icon"
                className={styles["todoItem__option-icon"]}
                onClick={() => {
                  setShowDeleteButton((current) => !current);
                }}
              />
            </div>
            {showDeleteButton && (
              <DeleteButton
                clickDeleteButtonHandler={(e) => {
                  e.preventDefault();
                  todos.removeTodo(id);
                }}
              />
            )}
          </div>
        </div>
        {showEditForm && (
          <NewTodoForm
            id={id}
            clickCancelButtonHandler={(e) => {
              e.preventDefault();
              setShowEditForm((current) => !current);
            }}
            setShowForm={setShowEditForm}
          />
        )}
      </>
    );
  }
);

export default TodoItem;
