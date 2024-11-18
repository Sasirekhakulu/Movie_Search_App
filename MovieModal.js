import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery, onSearch }) => {
  return (
    <form onSubmit={onSearch}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for movies..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
