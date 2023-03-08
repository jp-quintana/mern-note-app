import { NavLink } from 'react-router-dom';

import styles from './index.module.scss';

const Nav = () => {
  return (
    <div className={styles.container}>
      <nav className={`${styles.nav} main-container`}>
        <h1 className={styles.logo}>Logo</h1>
        <div className={styles.links}>
          <NavLink>Home</NavLink>
          <NavLink>Login</NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
