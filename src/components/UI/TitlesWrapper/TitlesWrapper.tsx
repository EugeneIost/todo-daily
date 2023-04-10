import React from "react";
import styles from "./TitlesWrapper.module.scss";

interface TitlesWrapperProps {
  children: React.ReactNode;
}

const TitlesWrapper = ({ children }: TitlesWrapperProps) => (
  <div className={styles.titlesWrapper}>{children}</div>
);

export default TitlesWrapper;
