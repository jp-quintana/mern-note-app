import React from 'react';

import styles from './index.module.scss';

const SearchModal = () => {
  return (
    <div className={styles.container}>
      <div className={styles.search_box}>Search User's Notes</div>
      <div className={styles.list}></div>
    </div>
  );
};

export default SearchModal;
