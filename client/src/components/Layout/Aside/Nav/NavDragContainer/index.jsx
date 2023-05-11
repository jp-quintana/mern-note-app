import { useRef } from 'react';

import NavElement from './NavElement';

import styles from './index.module.scss';

const NavDragContainer = ({ notes, selectedNote }) => {
  const handleDragStart = (e, index) => {
    const targetRect = e.currentTarget.getBoundingClientRect();
    const xOffset = e.clientX - targetRect.left;
    const yOffset = e.clientY - targetRect.top;

    e.dataTransfer.setDragImage(e.currentTarget, xOffset, yOffset);

    console.log(index);
  };

  return (
    <div className={styles.container}>
      {notes.map((note, index) => (
        <li
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          className={
            selectedNote && selectedNote.id === note.id
              ? styles.isSelected
              : undefined
          }
          key={note.id}
        >
          <div
            onDragEnter={(e) => {
              console.log('enter', index);
            }}
            onDragLeave={(e) => {
              console.log('leaving', index);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              console.log('hey');
            }}
          >
            <NavElement
              id={note.id}
              to={`/notes/${note.id}`}
              emoji={note.emoji}
              title={note.title}
              isFavorite={note.isFavorite}
              ellipsisClassName={styles.ellipsis}
            />
          </div>
          <div></div>
        </li>
      ))}
    </div>
  );
};

export default NavDragContainer;
