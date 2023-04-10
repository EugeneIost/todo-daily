import React from "react";
import styles from "./Title.module.scss";

interface TitleProps {
  children: React.ReactNode;
}

const Title = ({ children }: TitleProps) => (
  <h1 className={styles.title}>{children}</h1>
);

export default Title;
