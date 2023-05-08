import React from 'react';
import { createPortal } from 'react-dom';

import styles from './index.module.scss';

const Modal = ({
  local,
  show,
  close,
  modalPosition,
  backdropClassName,
  modalContainerClassName,
  modalClassName,
  children,
}) => {
  const handleBackdropPropagation = (e) => {
    e.stopPropagation();
    close();
  };

  const handleModalPropagation = (e) => {
    e.stopPropagation();
  };

  // TODO: Check local propagation if needed
  if (local) {
    return (
      <>
        {show && (
          <>
            {createPortal(
              <div
                onClick={handleBackdropPropagation}
                onMouseUp={handleBackdropPropagation}
                className={styles.backdrop}
              />,
              document.getElementById('overlay')
            )}
            <div
              onClick={handleModalPropagation}
              onMouseUp={handleModalPropagation}
              className={modalClassName}
            >
              {children}
            </div>
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
                onClick={handleModalPropagation}
                onMouseUp={handleModalPropagation}
                className={`${styles.modal_container} ${modalContainerClassName}`}
                style={
                  modalPosition && {
                    ...modalPosition,
                  }
                }
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
