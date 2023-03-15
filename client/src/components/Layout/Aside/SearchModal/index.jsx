import React from 'react';

import styles from './index.module.scss';

const NOTES = [];

// TODO: Finish component

const SearchModal = () => {
  return (
    <div className={styles.container}>
      <div className={styles.search_box}>Search User's Notes</div>
      <div className={styles.list}>
        {NOTES.length === 0 && <p>No notes added yet.</p>}
      </div>
    </div>
  );
};

export default SearchModal;
