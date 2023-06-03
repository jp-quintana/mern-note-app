import { useCallback, useState, useEffect, useRef } from 'react';

import { useNote } from 'hooks/useNote';

import Editor from '../Editor';
import Modal from '../Modal';
import EmojiPicker from '../EmojiPicker';

import styles from './index.module.scss';

const EditElementMenu = ({ id, isSelected, title, emoji, closeMenu }) => {
  const { editSelectedNote, updateEditingValue, saveEditingValue } = useNote();

  const isFirstRender = useRef(true);
  const titleRef = useRef(null);
  const elementRef = useRef(null);

  const [showPicker, setShowPicker] = useState(false);
  const [pickerPosition, setPickerPosition] = useState(false);

  const handleKeyDown = (e, name) => {
    if (name === 'title') {
      if (e.key === 'Enter' || e.key === 'Escape') {
        closeMenu();
      }
    }
  };

  const handleOpenPicker = (e) => {
    e.preventDefault();
    const emojiRect = e.target.getBoundingClientRect();
    const elementRect = elementRef.current.getBoundingClientRect();
    const distanceFromBottom = window.innerHeight - emojiRect.bottom;
    const modalHeight = 435;

    let pickerPosition;

    if (distanceFromBottom < modalHeight) {
      const topPosition = window.innerHeight - modalHeight - 10;
      pickerPosition = { top: topPosition, left: emojiRect.right + 5 };
    } else {
      pickerPosition = { top: emojiRect.bottom + 5, left: elementRect.left };
    }
    setPickerPosition(pickerPosition);
    setShowPicker(true);
  };

  const handleFormChange = useCallback((e) => {
    if (isSelected) {
      editSelectedNote(e.target.name, e.target.value);
    } else {
      updateEditingValue(e.target.name, e.target.value);
    }
  });

  const handleEmojiSelect = (e) => {
    if (isSelected) {
      editSelectedNote('emoji', e.native);
    } else {
      updateEditingValue('emoji', e.native);
    }
    setShowPicker(false);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      titleRef.current.focus();
      titleRef.current.setSelectionRange(
        titleRef.current.value.length,
        titleRef.current.value.length
      );
    } else {
      if (!isSelected) {
        const timer = setTimeout(() => {
          saveEditingValue({ id, title, emoji });
        }, 200);

        return () => clearTimeout(timer);
      }
    }
  }, [title, emoji]);

  return (
    <>
      <Modal
        show={showPicker}
        close={() => setShowPicker(false)}
        modalPosition={pickerPosition}
        modalContainerClassName={styles.picker_container}
        modalClassName={styles.picker}
      >
        <EmojiPicker onEmojiSelect={handleEmojiSelect} theme="dark" />
      </Modal>
      <div ref={elementRef} className={styles.container}>
        <div onClick={handleOpenPicker} className={styles.emoji}>
          {emoji}
        </div>
        <div className={styles.input_wrapper}>
          <Editor
            isTitle
            name="title"
            value={title}
            onKeyDown={handleKeyDown}
            rows={1}
            className={styles.input}
            type="text"
            onInput={handleFormChange}
            ref={titleRef}
          />
        </div>
      </div>
    </>
  );
};

export default EditElementMenu;
