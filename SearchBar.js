import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery, onSearch }) => {
  // Ensure setSearchQuery is passed as a prop correctly

  return (
    <div className="search-bar">
      <form onSubmit={onSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}  // Correct usage of setSearchQuery
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
