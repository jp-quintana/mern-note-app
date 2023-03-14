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
  title: 'TO DO',
  emoji: '🐑',
};

const Main = () => {
  return (
    <div className={styles.container}>
      <header>
        <div className={styles.title_wrapper}>
          <div className={styles.emoji}>{NOTE.emoji || `\u{1F5CB}`}</div>
          {NOTE.title}
        </div>
        <div className={styles.controls_wrapper}>
          <p className={styles.last_edit}>Edited 2d ago</p>
          <p className={styles.share}>Share</p>
          <div className={styles.icon_wrapper}>
            <FaRegCommentAlt />
          </div>
          <div className={styles.icon_wrapper}>
            <FaRegClock />
          </div>
          <div className={styles.icon_wrapper}>
            <FaRegStar />
          </div>
          <div className={styles.icon_wrapper}>
            <FaEllipsisH />
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Main;
