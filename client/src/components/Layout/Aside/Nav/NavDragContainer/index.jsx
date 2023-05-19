import { useState, useRef } from 'react';

import { useNote } from 'hooks/useNote';

import NavElement from './NavElement';

import styles from './index.module.scss';

const NavDragContainer = ({
  notes,
  selectedNote,
  favoriteContainer = null,
}) => {
  const { sortNormalNotes, sortFavoriteNotes } = useNote();
  const dragId = useRef(null);
  const dragStartingIndex = useRef(null);

  const [currentDragIndex, setCurrentDragIndex] = useState(null);
  const [highlightIndex, setHighlightIndex] = useState(null);

  const handleDragStart = (e, index) => {
    const targetRect = e.currentTarget.getBoundingClientRect();
    const xOffset = e.clientX - targetRect.left;
    const yOffset = e.clientY - targetRect.top;

    e.dataTransfer.setDragImage(e.currentTarget, xOffset, yOffset);

    setCurrentDragIndex(index);
    dragStartingIndex.current = index;
    dragId.current = e.currentTarget.id;
  };

  const handleDrop = (e) => {
    if (dragStartingIndex !== currentDragIndex) {
      if (favoriteContainer) {
        sortFavoriteNotes(dragId.current, currentDragIndex);
      } else {
        sortNormalNotes(dragId.current, currentDragIndex);
      }
    }
  };

  const handleDragStop = (e) => {
    dragStartingIndex.current = null;
    dragId.current = null;
    setCurrentDragIndex(null);
    setHighlightIndex(null);
  };

  return (
    <div onDrop={(e) => handleDrop(e)} className={styles.container}>
      {notes.map((note, index) => (
        <li
          id={note.id}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragEnd={handleDragStop}
          className={
            selectedNote && selectedNote.id === note.id
              ? styles.isSelected
              : undefined
          }
          // style={{
          //   position:
          //     index === currentDragIndex &&
          //     currentDragIndex !== dragStartingIndex &&
          //     'relative',
          // }}
          style={{
            position: 'relative',
          }}
          key={note.id}
        >
          <div
            onDragEnter={() => {
              setCurrentDragIndex(index);
            }}
            onDragLeave={() => {
              setCurrentDragIndex(index);
            }}
            onDragOver={(e) => {
              e.preventDefault();
            }}
          >
            <NavElement
              id={note.id}
              to={`/notes/${note.id}`}
              emoji={note.emoji}
              title={note.title}
              isFavorite={favoriteContainer || note.isFavorite}
              ellipsisClassName={styles.ellipsis}
            />
          </div>
          {index === currentDragIndex &&
            currentDragIndex !== dragStartingIndex.current && (
              <div
                className={styles.highlight_wrapper}
                onDragEnter={() => {
                  setHighlightIndex(index);
                }}
                onDragLeave={() => {
                  setHighlightIndex(null);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                style={{
                  top: index < dragStartingIndex.current ? '-1.4rem' : 'auto',
                  bottom:
                    index > dragStartingIndex.current ? '-1.4rem' : 'auto',
                  opacity: highlightIndex === index ? 1 : 0,
                }}
              >
                <div className={styles.highlight} />
              </div>
            )}

          {/* <div className={styles.highlight} style={{ top: '-.4rem' }} /> */}
        </li>
      ))}
    </div>
  );
};

export default NavDragContainer;
