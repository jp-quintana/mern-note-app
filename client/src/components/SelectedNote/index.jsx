import { useState } from 'react';

import styles from './index.module.scss';

const SelectedNote = ({ id, initialTitle, initialEmoji, initialContent }) => {
  const [userInput, setUserInput] = useState({
    title: initialTitle || '',
    emoji: initialEmoji || '',
    content: initialContent || '',
  });
  return (
    <form className={styles.form}>
      <input
        value={userInput.title}
        onChange={(e) =>
          setUserInput((prevState) => ({ ...prevState, title: e.target.value }))
        }
        placeholder="Untitled"
        className={styles.title}
      />
      <textarea
        name="content"
        className={styles.content}
        placeholder="Enter notes"
      />
    </form>
  );
};

export default SelectedNote;
