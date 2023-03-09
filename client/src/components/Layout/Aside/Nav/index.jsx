import { NavLink, Link } from 'react-router-dom';

import styles from './index.module.scss';

const Nav = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <h1 className={styles.logo}>
          <Link to="/">Note</Link>
        </h1>
        <div className={styles.links}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
