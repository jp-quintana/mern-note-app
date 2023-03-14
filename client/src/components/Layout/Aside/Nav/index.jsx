import { useState } from 'react';

import { NavLink } from 'react-router-dom';

import { FaAngleRight } from 'react-icons/fa';

import styles from './index.module.scss';

// TODO: Remove
const USER = {
  username: 'jpquintana',
  imageUrl: 'https://wallpaperaccess.com/full/1428034.jpg',
  favoriteNotes: [{ id: '1', title: 'TO DO', emoji: '🐑' }],
  notes: [
    { id: '2', title: 'Grocery list', emoji: '' },
    { id: '3', title: 'Goals', emoji: '' },
    { id: '4', title: 'Weight loss', emoji: '' },
  ],
};

const Nav = () => {
  const [showFavorites, setShowFavorites] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        {USER.favoriteNotes.length > 0 && (
          <ul className={styles.list}>
            <div
              onClick={() => setShowFavorites((prevState) => !prevState)}
              className={styles.list_header}
            >
              <div
                className={`${styles.icon_wrapper} ${
                  showFavorites ? styles.icon_open : ''
                }`}
              >
                <FaAngleRight />
              </div>
              <p>Favorite Notes:</p>
            </div>
            {showFavorites &&
              USER.favoriteNotes.map((note) => (
                <li key={note.id}>
                  <NavLink to={`/notes/${note.id}`}>
                    <div className={styles.emoji}>
                      {note.emoji || `\u{1F5CB}`}
                    </div>
                    {note.title}
                  </NavLink>
                </li>
              ))}
          </ul>
        )}
        <ul className={styles.list}>
          <div
            onClick={() => setShowNotes((prevState) => !prevState)}
            className={styles.list_header}
          >
            <div
              className={`${styles.icon_wrapper} ${
                showNotes ? styles.icon_open : ''
              }`}
            >
              <FaAngleRight />
            </div>
            <p>Notes:</p>
          </div>
          {showNotes &&
            USER.notes.map((note) => (
              <li key={note.id}>
                <NavLink to={`/notes/${note.id}`}>
                  <div className={styles.emoji}>
                    {note.emoji || `\u{1F5CB}`}
                  </div>
                  {note.title}
                </NavLink>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
