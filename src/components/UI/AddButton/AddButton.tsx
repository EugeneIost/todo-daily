import React from "react";
import styles from "./AddButton.module.scss";
import plusIcon from "../../../assets/icons/plus-icon.png";

interface AddButtonProps {
  clickAddButtonHandler: React.MouseEventHandler<HTMLButtonElement>;
}

const AddButton = ({ clickAddButtonHandler }: AddButtonProps) => (
  <button className={styles.addButton} onClick={clickAddButtonHandler}>
    <img src={plusIcon} alt="add-icon" className={styles.addButton__icon} />
    <span className={styles.addButton__text}>Добавить задачу</span>
  </button>
);

export default AddButton;
