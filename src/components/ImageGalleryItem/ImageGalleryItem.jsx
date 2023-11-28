import React, { useState, useCallback } from 'react';
import Modal from '../Modal/Modal';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  galleryItem: { webformatURL, largeImageURL, tags },
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setModalOpen(prevIsModalOpen => !prevIsModalOpen);
  }, []);

  return (
    <>
      <li className={styles['image-gallery-item']} onClick={toggleModal}>
        <img
          src={webformatURL}
          className={styles['image-gallery-item-image']}
          alt={tags}
        />
      </li>
      {isModalOpen && (
        <Modal modalSrc={largeImageURL} alt={tags} onCloseModal={toggleModal} />
      )}
    </>
  );
};

export default ImageGalleryItem;
