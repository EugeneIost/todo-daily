import logo from "../../../assets/logo.png";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="todo-logo" className={styles.header__logo} />
    </header>
  );
};

export default Header;
