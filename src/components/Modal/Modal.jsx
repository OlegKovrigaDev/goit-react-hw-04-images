import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const Modal = ({ modalSrc, alt, onCloseModal }) => {
  const handleKeyDown = useCallback(
    e => {
      if (e.code === 'Escape') onCloseModal();
    },
    [onCloseModal]
  );

  const handleClose = useCallback(
    ({ target, currentTarget }) => {
      if (target === currentTarget) {
        onCloseModal();
      }
    },
    [onCloseModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal}>
        <img src={modalSrc} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  modalSrc: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;
