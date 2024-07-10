import { Link, NavLink } from 'react-router-dom';
import styles from './MainNavigation.module.css';

function MainNavigation() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <NavLink to='/' className={({isActive})=>isActive ? styles.active : styles.link}>Home</NavLink>
          </li>
          <li className={styles.li}>
            <NavLink to='/add-new-book' className={({isActive})=>isActive ? styles.active : styles.link}>Add new book</NavLink>

          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
