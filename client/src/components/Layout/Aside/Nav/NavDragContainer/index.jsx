import { useState, useRef } from 'react';

import NavElement from './NavElement';

import styles from './index.module.scss';

const NavDragContainer = ({ notes, selectedNote }) => {
  const dragStartingIndex = useRef(null);
  // const currentDragIndex = useRef(null);
  // const [dragStartingIndex, setDragStartingIndex] = useState(null);
  const [currentDragIndex, setCurrentDragIndex] = useState(null);
  const [highlightIndex, setHighlightIndex] = useState(null);

  const handleDragStart = (e, index) => {
    const targetRect = e.currentTarget.getBoundingClientRect();
    const xOffset = e.clientX - targetRect.left;
    const yOffset = e.clientY - targetRect.top;

    e.dataTransfer.setDragImage(e.currentTarget, xOffset, yOffset);

    setCurrentDragIndex(index);
    dragStartingIndex.current = index;
  };
  const handleDragStop = (e) => {
    dragStartingIndex.current = null;
    setCurrentDragIndex(null);
    setHighlightIndex(null);
  };

  console.log(dragStartingIndex, currentDragIndex, highlightIndex);

  return (
    <div className={styles.container}>
      {notes.map((note, index) => (
        <li
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
              isFavorite={note.isFavorite}
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
