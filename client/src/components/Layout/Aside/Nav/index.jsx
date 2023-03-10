import { NavLink, Link } from 'react-router-dom';

import { FaAngleRight } from 'react-icons/fa';

import styles from './index.module.scss';

// TODO: Remove
const USER = {
  username: 'jpquintana',
  imageUrl: 'https://wallpaperaccess.com/full/1428034.jpg',
  favoriteNotes: [{ id: '1', name: 'TO DO', emoji: '\u{1F984}' }],
  notes: [
    { id: '2', name: 'Grocery list', emoji: '\u{1F5CB}' },
    { id: '3', name: 'Goals', emoji: '\u{1F5CB}' },
    { id: '4', name: 'Weight loss', emoji: '\u{1F5CB}' },
  ],
};

const Nav = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <div className={styles.list_header}>
            <div className={styles.icon_wrapper}>
              <FaAngleRight />
            </div>
            <p>Favorite Notes:</p>
          </div>
          {USER.favoriteNotes.map((note) => (
            <li key={note.id}>
              <NavLink to="/">
                <div className={styles.emoji}>{note.emoji}</div>
                {note.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className={styles.list}>
          <div className={styles.list_header}>
            <div className={styles.icon_wrapper}>
              <FaAngleRight />
            </div>
            <p>Notes:</p>
          </div>
          {USER.notes.map((note) => (
            <li key={note.id}>
              <NavLink to="/">
                <div className={styles.emoji}>{note.emoji}</div>
                {note.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
