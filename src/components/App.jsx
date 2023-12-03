import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import Searchbar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';

import { fetchGalleryItems } from '../services/api';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryPage, setGalleryPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isButtonShow, setIsButtonShow] = useState(false);
  const [error, setError] = useState(true);

  useEffect(() => {
    fetchGalleryItems(
      searchQuery,
      galleryPage,
      handleFetchSuccess,
      handleFetchError
    );
  }, [searchQuery, galleryPage]);

  const handleFetchSuccess = data => {
    const hits = data.totalHits;

    if (!hits) {
      setLoading(false);
      setError(true);
      return;
    }

    const newData = data.hits.map(
      ({ id, tags, webformatURL, largeImageURL }) => ({
        id,
        tags,
        webformatURL,
        largeImageURL,
      })
    );

    const currentData = [...galleryItems, ...newData];

    setGalleryItems(prevGalleryItems => [...prevGalleryItems, ...newData]);

    if (currentData.length >= hits) {
      setLoading(false);
      setIsButtonShow(false);
      setError(false);
    } else {
      setLoading(false);
      setIsButtonShow(true);
      setError(false);
    }
  };

  const handleFetchError = () => {
    setLoading(false);
    setError(true);
  };

  const handleFormSubmit = query => {
    setSearchQuery(query);
    setGalleryItems([]);
    setGalleryPage(1);
    setIsButtonShow(false);
  };

  const onLoadMore = () => {
    setGalleryPage(prevPage => prevPage + 1);
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      {error && <h2>Please, enter a search word!</h2>}
      {!error && <ImageGallery galleryItems={galleryItems} />}
      {loading && <Loader />}
      {isButtonShow && <Button onClick={onLoadMore} />}
    </div>
  );
};
