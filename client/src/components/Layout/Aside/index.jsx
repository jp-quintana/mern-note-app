import { useState } from 'react';
import { FaSearch, FaRegClock, FaCog, FaPlus } from 'react-icons/fa';

import { useNote } from 'hooks/useNote';
import { useAuthContext } from 'hooks/useAuthContext';

import Nav from './Nav';
import SearchModal from './SearchModal';
import ProfileMenu from './ProfileMenu';

import Modal from 'components/Modal';

import styles from './index.module.scss';

// TODO: Add user profile logic
const USER = {
  imageUrl:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8e9K9hRmNl8KnuD4p6GuprKObXs3DpLlQcbcx5fSQIFQjiL7rwL3TRsiAyZScoVOKoaE',
};

const Aside = () => {
  const { createNote, isLoading } = useNote();
  const { user } = useAuthContext();

  const [showSearch, setShowSearch] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [profileMenuPosition, setProfileMenuPosition] = useState(null);

  const handleOpenProfileMenu = (e) => {
    e.preventDefault();
    const headerRect = e.currentTarget.getBoundingClientRect();
    const imgRect = e.currentTarget
      .querySelector('img')
      .getBoundingClientRect();
    const modalTop = headerRect.bottom;
    const modalLeft = imgRect.left;
    setProfileMenuPosition({ top: modalTop, left: modalLeft });
    setShowProfileMenu(true);
  };

  return (
    <>
      <Modal
        show={showProfileMenu}
        close={() => setShowProfileMenu(false)}
        modalPosition={profileMenuPosition}
        modalContainerClassName={styles.profile_menu_container}
        modalClassName={styles.profile_menu}
      >
        <ProfileMenu close={() => setShowProfileMenu(false)} />
      </Modal>
      <Modal
        show={showSearch}
        close={() => setShowSearch(false)}
        modalContainerClassName={styles.search_modal_container}
        modalClassName={styles.search_modal}
      >
        <SearchModal />
      </Modal>
      <aside className={styles.container}>
        <header onClick={handleOpenProfileMenu} className={styles.header}>
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
        <footer
          onClick={!isLoading ? createNote : undefined}
          className={styles.footer}
        >
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
