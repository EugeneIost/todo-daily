import React from "react";
import styles from "./MainSectionWrapper.module.scss";

interface MainSectionWrapperProps {
  children: React.ReactNode;
}

const MainSectionWrapper = ({ children }: MainSectionWrapperProps) => (
  <main className={styles.mainSectionWrapper}>{children}</main>
);

export default MainSectionWrapper;
