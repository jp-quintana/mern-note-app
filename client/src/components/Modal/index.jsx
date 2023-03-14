import React from 'react';
import { createPortal } from 'react-dom';

import styles from './index.module.scss';

const Modal = ({ local, show, close, modalClassName, children }) => {
  const overlay = <div onClick={close} className={styles.overlay} />;
  if (local) {
    return (
      <>
        {show && (
          <>
            {createPortal(overlay, document.getElementById('overlay'))}
            <div className={modalClassName}>{children}</div>
          </>
        )}
      </>
    );
  }
};

export default Modal;
