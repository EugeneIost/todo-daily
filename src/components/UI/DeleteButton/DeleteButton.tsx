import React from "react";
import styles from "./DeleteButton.module.scss";
import trashFillIcon from "../../../assets/icons/trash-fill-icon.png";

interface DeleteButtonProps {
  clickDeleteButtonHandler: React.MouseEventHandler<HTMLButtonElement>;
}

const DeleteButton = ({ clickDeleteButtonHandler }: DeleteButtonProps) => (
  <button className={styles.deleteButton} onClick={clickDeleteButtonHandler}>
    <img
      src={trashFillIcon}
      alt="delete-icon"
      className={styles.deleteButton__icon}
    />
    <span className={styles.deleteButton__text}>Удалить</span>
  </button>
);

export default DeleteButton;
