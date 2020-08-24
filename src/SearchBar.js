import React, { useState } from 'react';

function SearchBar() {
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('');

    const getSearch = e => {
        e.preventDefault();
        setQuery(search);
        setSearch('');
    }

    return(
        <form onSubmit={getSearch} className='search-form'>
            <input className='search-bar' type="text"/>
            <button className='search-button' type='submit'>Поиск</button>
        </form>
    );
}

export default SearchBar;