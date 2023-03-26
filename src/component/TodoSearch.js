import React, { useState } from 'react';
import styled from 'styled-components';



const Search = styled.input`
    outline: none;
    border: none;

`;
const SearchBar = styled.div`

display: flex;
`;


const TodoSearch = () => {
    const [searchContent, setSearchContent] = useState('');

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setSearchContent(e.target.value);
        }
    }

    return (
        <>
            <SearchBar onKeyPress={handleKeyPress}>
                <Search
                    type="textarea"
                    value={searchContent}
                    onInput={(e) => setSearchContent(e.target.value)}
                    placeholder='검색'
                /></SearchBar>
                
        </>
    );
};
export default TodoSearch;

