import { Outlet } from 'react-router-dom';

import {
  FaRegCommentAlt,
  FaRegClock,
  FaRegStar,
  FaStar,
  FaEllipsisH,
} from 'react-icons/fa';

import styles from './index.module.scss';

// TODO: Remove
const NOTE = {
  id: '1',
  name: 'TO DO',
  emoji: '\u{1F984}',
};

const Main = () => {
  return (
    <div className={styles.container}>
      <header>
        <div className={styles.name_wrapper}>
          <div className={styles.emoji}>{NOTE.emoji}</div>
          {NOTE.name}
        </div>
        <div className={styles.controls_wrapper}>
          <p className={styles.last_edit}>Edited 2d ago</p>
          <p className={styles.share}>Share</p>
          <FaRegCommentAlt size={'1.6rem'} />
          <FaRegClock size={'1.6rem'} />
          <FaRegStar size={'1.6rem'} />
          <FaEllipsisH size={'1.6rem'} />
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};

export default Main;
