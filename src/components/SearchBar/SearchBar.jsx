import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import { IoSearch } from 'react-icons/io5';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      onSubmit(trimmedQuery);
      setQuery('');
    }
  };
  return (
    <header className={styles.searchbar}>
      <form className={styles['search-form']} onSubmit={handleSubmit}>
        <button type="submit" className={styles['search-form-button']}>
          <IoSearch />
        </button>
        <input
          className={styles['search-form-input']}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

export default SearchBar;
