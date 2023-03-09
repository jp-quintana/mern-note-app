import { Outlet } from 'react-router-dom';

import Aside from './Aside';

import styles from './index.module.scss';

const Layout = () => {
  return (
    <div className={styles.container}>
      <Aside />
      <div className={styles.main}>
        <header></header>
        <main>
          <Outlet />
        </main>
        <footer></footer>
      </div>
    </div>
  );
};

export default Layout;
