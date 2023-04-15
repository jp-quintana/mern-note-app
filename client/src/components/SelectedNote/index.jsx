import { useState } from 'react';
import { FaSmile, FaImage } from 'react-icons/fa';
import TextareaAutosize from 'react-textarea-autosize';

import Editor from './Editor';

import Modal from 'components/Modal';
import EmojiPicker from 'components/EmojiPicker';

import styles from './index.module.scss';

const SelectedNote = ({ id, initialTitle, initialEmoji, initialContent }) => {
  const [userInput, setUserInput] = useState({
    title: initialTitle || '',
    emoji: initialEmoji || '',
    content: initialContent || '',
  });

  const { title, emoji, content } = userInput;

  const [showPicker, setShowPicker] = useState(false);

  const handleEmojiSelect = (e) => {
    setUserInput((prevState) => ({ ...prevState, emoji: e.native }));
    setShowPicker(false);
  };

  const handleFormChange = (e) => {
    setUserInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.note}>
        <div className={styles.header}>
          <div
            onClick={() => setShowPicker(true)}
            className={styles.emoji_wrapper}
          >
            <div className={styles.emoji}>{emoji}</div>
          </div>
          <div className={styles.header_content}>
            <Modal
              local
              show={showPicker}
              close={() => setShowPicker(false)}
              modalClassName={styles.picker}
            >
              <EmojiPicker onEmojiSelect={handleEmojiSelect} />
            </Modal>
            <ul className={styles.controls}>
              {!emoji && (
                <li onClick={() => setShowPicker(true)}>
                  <FaSmile /> Add Emoji
                </li>
              )}
              <li>
                <FaImage /> Add Cover
              </li>
            </ul>
            {/* <TextareaAutosize
              onInput={(e) =>
                setUserInput((prevState) => ({
                  ...prevState,
                  title: e.target.value,
                }))
              }
              placeholder="Untitled"
              className={styles.title}
            /> */}
            <Editor
              name="title"
              placeholder="Untitled"
              onInput={handleFormChange}
              className={styles.title}
            />
          </div>
        </div>
        <div className={styles.body}>
          {/* <TextareaAutosize
            onInput={(e) =>
              setUserInput((prevState) => ({
                ...prevState,
                content: e.target.value,
              }))
            }
            placeholder="Add note"
            className={styles.content}
          /> */}
          <Editor
            name="content"
            placeholder="Add note"
            onInput={handleFormChange}
            className={styles.content}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectedNote;
