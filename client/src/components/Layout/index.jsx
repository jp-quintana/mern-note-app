import { usePageClass } from 'hooks/usePageClass';

import Aside from './Aside';
import Main from './Main';

import styles from './index.module.scss';

const Layout = () => {
  usePageClass('app-page');

  return (
    <div className={styles.container}>
      <Aside />
      <Main />
    </div>
  );
};

export default Layout;
