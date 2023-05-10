import { useRef } from 'react';

import NavElement from './NavElement';

import styles from './index.module.scss';

const NavDragContainer = ({ notes, selectedNote }) => {
  const handleDragStart = (e) => {
    const targetRect = e.currentTarget.getBoundingClientRect();
    const xOffset = e.clientX - targetRect.left;
    const yOffset = e.clientY - targetRect.top;

    e.dataTransfer.setDragImage(e.currentTarget, xOffset, yOffset);
  };

  return (
    <div className={styles.container}>
      {notes.map((note, index) => (
        <li
          draggable
          onDragStart={handleDragStart}
          className={
            selectedNote && selectedNote.id === note.id
              ? styles.isSelected
              : undefined
          }
          key={note.id}
        >
          <NavElement
            id={note.id}
            to={`/notes/${note.id}`}
            emoji={note.emoji}
            title={note.title}
            isFavorite={note.isFavorite}
            ellipsisClassName={styles.ellipsis}
          />
        </li>
      ))}
    </div>
  );
};

export default NavDragContainer;
