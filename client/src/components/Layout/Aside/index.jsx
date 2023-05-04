import { useState } from 'react';
import { FaSearch, FaRegClock, FaCog, FaPlus } from 'react-icons/fa';

import { useNote } from 'hooks/useNote';
import { useAuthContext } from 'hooks/useAuthContext';

import Nav from './Nav';
import SearchModal from './SearchModal';

import Modal from 'components/Modal';

import styles from './index.module.scss';

// TODO: Remove
const USER = {
  username: 'jpquintana',
  imageUrl: 'https://wallpaperaccess.com/full/1428034.jpg',
};

const Aside = () => {
  const { createNote } = useNote();
  const { user } = useAuthContext();

  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <Modal
        show={showSearch}
        close={() => setShowSearch(false)}
        modalContainerClassName={styles.search_modal_container}
        modalClassName={styles.search_modal}
      >
        <SearchModal />
      </Modal>
      <aside className={styles.container}>
        <header className={styles.header}>
          <img src={USER.imageUrl} alt={user.name} />{' '}
          <p>{`${user.name}'s Note App`}</p>{' '}
        </header>
        <ul className={styles.controls}>
          <li onClick={() => setShowSearch(true)}>
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
        <footer onClick={createNote} className={styles.footer}>
          <div className={styles.icon_wrapper}>
            <FaPlus />
          </div>
          New note
        </footer>
      </aside>
    </>
  );
};

export default Aside;
