import Aside from './Aside';
import Main from './Main';

import styles from './index.module.scss';

const Layout = () => {
  return (
    <div className={styles.container}>
      <Aside />
      <Main />
    </div>
  );
};

export default Layout;
