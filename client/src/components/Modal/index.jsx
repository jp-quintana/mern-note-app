import React from 'react';
import { createPortal } from 'react-dom';

import styles from './index.module.scss';

const Modal = ({
  local,
  show,
  close,
  backdropClassName,
  modalContainerClassName,
  modalClassName,
  children,
}) => {
  if (local) {
    return (
      <>
        {show && (
          <>
            {createPortal(
              <div onClick={close} className={styles.backdrop} />,
              document.getElementById('overlay')
            )}
            <div className={modalClassName}>{children}</div>
          </>
        )}
      </>
    );
  } else {
    return (
      <>
        {show && (
          <>
            {createPortal(
              <div
                className={`${styles.modal_container} ${modalContainerClassName}`}
              >
                <div
                  onClick={close}
                  className={`${styles.backdrop} ${backdropClassName}`}
                />
                <div className={modalClassName}>{children}</div>
              </div>,
              document.getElementById('overlay')
            )}
          </>
        )}
      </>
    );
  }
};

export default Modal;
