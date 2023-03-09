import React from 'react';
import { FaSearch, FaRegClock, FaCog, FaPlus } from 'react-icons/fa';

import Nav from './Nav';

import styles from './index.module.scss';

// TODO: Remove
const USER = {
  username: 'jpquintana',
  imageUrl: 'https://i.ytimg.com/vi/UGED6cb63YM/maxresdefault.jpg',
};

const Aside = () => {
  return (
    <aside className={styles.container}>
      <header className={styles.header}>
        <img src={USER.imageUrl} alt={USER.username} />{' '}
        <p>{`${USER.username}'s Note App`}</p>{' '}
      </header>
      <ul className={styles.controls}>
        <li>
          <div className={styles.icon_wrapper}>
            <FaSearch />
          </div>
          <span>Search</span>
        </li>
        <li>
          <div className={styles.icon_wrapper}>
            <FaRegClock />
          </div>
          <span>Updates</span>
        </li>
        <li>
          <div className={styles.icon_wrapper}>
            <FaCog />
          </div>
          <span>Settings</span>
        </li>
      </ul>
      <Nav />
      <footer className={styles.footer}>
        {' '}
        <FaPlus />
        New note
      </footer>
    </aside>
  );
};

export default Aside;
